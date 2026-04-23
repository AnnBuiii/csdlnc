const mongoose = require('mongoose');
const { query, withTransaction } = require('../config/postgres');
const { setCache, getCache, invalidateCache, incrJobView } = require('../config/redis');
const { writeTransaction } = require('../config/neo4j');
const { execute } = require('../config/cassandra');
const { parsePagination } = require('../utils/pagination');
const JobPosting = require('../models/job.model');
const crypto = require('crypto');

class JobService {
  // ── NV03: Tạo tin tuyển dụng ─────────────────────────────────
  async createJob(companyId, data) {
    const {
      title, level, jobType, workMode, location,
      salaryMin, salaryMax, currency = 'VND',
      description, requirements, benefits,
      applicationProcess, tags, deadline,
    } = data;

    // Lưu vào PostgreSQL (id, trạng thái, liên kết)
    const pgRes = await query(
      `INSERT INTO job_postings
         (company_id, title, level, job_type, work_mode, location,
          salary_min, salary_max, currency, status, deadline)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'draft',$10)
       RETURNING id, created_at`,
      [companyId, title, level, jobType, workMode, location,
       salaryMin, salaryMax, currency, deadline]
    );
    const pgJob = pgRes.rows[0];

    // Lấy thông tin công ty để nhúng vào MongoDB
    const compRes = await query(
      'SELECT name, industry, size, logo_url FROM companies WHERE id = $1',
      [companyId]
    );
    const company = compRes.rows[0];

    // Lưu document đầy đủ vào MongoDB (NV03)
    const mongoJob = await JobPosting.create({
      jobId:    pgJob.id,
      companyId,
      companyInfo: {
        name:     company.name,
        logoUrl:  company.logo_url,
        industry: company.industry,
        size:     company.size,
      },
      title, level,
      jobType:   [jobType],
      workMode,
      location:  typeof location === 'string' ? { city: location } : location,
      salary: {
        min:      salaryMin,
        max:      salaryMax,
        currency,
        isPublic: true,
      },
      description,
      requirements: requirements || {},
      benefits:     benefits     || [],
      applicationProcess: applicationProcess || [],
      tags:     tags || [],
      deadline,
    });

    // Tạo node Job trong Neo4j (NV06)
    this._syncJobToNeo4j(pgJob.id, { title, level, location, salaryMin, salaryMax, requirements }).catch(() => {});

    await invalidateCache('cache:jobs:search:*');

    return { id: pgJob.id, mongoId: mongoJob._id, createdAt: pgJob.created_at };
  }

  // ── NV03: Cập nhật trạng thái tin ────────────────────────────
  async updateJobStatus(jobId, companyId, status) {
    const allowed = ['draft', 'active', 'closed'];
    if (!allowed.includes(status)) {
      const err = new Error(`Trạng thái không hợp lệ. Chỉ chấp nhận: ${allowed.join(', ')}`);
      err.statusCode = 400; throw err;
    }

    const res = await query(
      `UPDATE job_postings SET status = $1, updated_at = NOW()
       WHERE id = $2 AND company_id = $3
       RETURNING id, status`,
      [status, jobId, companyId]
    );
    if (!res.rows.length) {
      const err = new Error('Tin không tồn tại hoặc bạn không có quyền.'); err.statusCode = 404; throw err;
    }

    await JobPosting.updateOne({ jobId }, { status });
    await invalidateCache(`cache:jobs:search:*`);

    // Cập nhật Neo4j
    await writeTransaction((tx) =>
      tx.run('MATCH (j:Job {id:$id}) SET j.status = $status', { id: jobId, status })
    ).catch(() => {});

    return res.rows[0];
  }

  // ── NV04: Tìm kiếm và lọc công việc ─────────────────────────
  async searchJobs(filters, paginationQuery) {
    const { page, limit, offset } = parsePagination(paginationQuery);

    // Tạo cache key từ hash của filters + pagination
    const cacheKey = `cache:jobs:search:${crypto
      .createHash('md5')
      .update(JSON.stringify({ ...filters, page, limit }))
      .digest('hex')}`;

    const cached = await getCache(cacheKey);
    if (cached) return { ...cached, fromCache: true };

    // Full-text search + filter trên MongoDB (NV04)
    const mongoFilter = { status: 'active' };

    if (filters.q) {
      mongoFilter.$text = { $search: filters.q };
    }
    if (filters.city)       mongoFilter['location.city'] = new RegExp(filters.city, 'i');
    if (filters.level)      mongoFilter.level = filters.level;
    if (filters.workMode)   mongoFilter.workMode = filters.workMode;
    if (filters.jobType)    mongoFilter.jobType = { $in: [filters.jobType] };
    if (filters.salaryMin)  mongoFilter['salary.max'] = { $gte: parseInt(filters.salaryMin) };
    if (filters.salaryMax)  mongoFilter['salary.min'] = { $lte: parseInt(filters.salaryMax) };
    if (filters.industry)   mongoFilter['companyInfo.industry'] = new RegExp(filters.industry, 'i');
    if (filters.skills) {
      const skills = Array.isArray(filters.skills) ? filters.skills : [filters.skills];
      mongoFilter['requirements.skills.name'] = { $in: skills };
    }

    const sortOpts = filters.q ? { score: { $meta: 'textScore' } } : { createdAt: -1 };
    const projectOpts = filters.q ? { score: { $meta: 'textScore' } } : {};

    const [jobs, total] = await Promise.all([
      JobPosting.find(mongoFilter, projectOpts)
        .sort(sortOpts)
        .skip(offset)
        .limit(limit)
        .lean(),
      JobPosting.countDocuments(mongoFilter),
    ]);

    const result = {
      data: jobs,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };

    await setCache(cacheKey, result, 60);
    return result;
  }

  // ── NV03: Lấy chi tiết tin tuyển dụng ───────────────────────
  async getJobDetail(jobId, userId) {
    const cacheKey = `cache:job:${jobId}`;
    const cached = await getCache(cacheKey);

    const job = cached || await JobPosting.findOne({ jobId }).lean();
    if (!job) {
      const err = new Error('Tin tuyển dụng không tồn tại.'); err.statusCode = 404; throw err;
    }

    if (!cached) await setCache(cacheKey, job, 120);

    // Ghi lượt xem (Redis counter + Cassandra event log)
    await incrJobView(jobId);
    if (userId) {
      this._logActivity(userId, 'view_job', jobId, 'job').catch(() => {});
    }

    return job;
  }

  // ── NV03: Danh sách tin của công ty ─────────────────────────
  async getCompanyJobs(companyId, paginationQuery) {
    const { page, limit, offset } = parsePagination(paginationQuery);
    const res = await query(
      `SELECT id, title, level, job_type, location, status, deadline,
              view_count, created_at
       FROM job_postings
       WHERE company_id = $1
       ORDER BY created_at DESC
       LIMIT $2 OFFSET $3`,
      [companyId, limit, offset]
    );
    const total = await query(
      'SELECT COUNT(*) FROM job_postings WHERE company_id = $1',
      [companyId]
    );
    return {
      data: res.rows,
      meta: { total: parseInt(total.rows[0].count), page, limit },
    };
  }

  // ── Private: sync Job node vào Neo4j ─────────────────────────
  async _syncJobToNeo4j(jobId, { title, level, location, salaryMin, salaryMax, requirements }) {
    const skills = requirements?.skills || [];
    await writeTransaction(async (tx) => {
      await tx.run(
        `MERGE (j:Job {id: $id})
         SET j.title = $title, j.level = $level,
             j.location = $location, j.salaryMin = $salaryMin,
             j.salaryMax = $salaryMax, j.status = 'active'`,
        { id: jobId, title, level: level || '', location: location || '', salaryMin: salaryMin || 0, salaryMax: salaryMax || 0 }
      );
      for (const skill of skills) {
        await tx.run(
          `MERGE (s:Skill {name: $name})
           WITH s
           MATCH (j:Job {id: $jobId})
           MERGE (j)-[:REQUIRES {isRequired: $req}]->(s)`,
          { name: skill.name, jobId, req: skill.isRequired || false }
        );
      }
    });
  }

  // ── Private: ghi event log vào Cassandra ─────────────────────
  async _logActivity(userId, eventType, entityId, entityType) {
    const now  = new Date();
    const date = now.toISOString().split('T')[0];
    await execute(
      `INSERT INTO user_activity_log
         (user_id, event_date, event_time, event_id, event_type, entity_id, entity_type)
       VALUES (?, ?, ?, uuid(), ?, ?, ?)`,
      [userId, date, now, eventType, entityId, entityType]
    );
  }
}

module.exports = new JobService();
