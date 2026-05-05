const { query, withTransaction } = require("../config/postgres");
const { runCypher, writeTransaction } = require("../config/neo4j");
const { execute } = require("../config/cassandra");
const { parsePagination } = require("../utils/pagination");

class ApplicationService {
  // ── NV05: Nộp đơn ứng tuyển ───────────────────────────────────
  async apply(candidateId, jobId, { coverLetter }) {
    return withTransaction(async (client) => {
      console.log(jobId);
      // Kiểm tra job tồn tại và đang active
      const jobRes = await client.query(
        `SELECT id, company_id, title FROM job_postings
         WHERE id = $1 AND status = 'active'`,
        [jobId],
      );
      if (!jobRes.rows.length) {
        const err = new Error("Tin tuyển dụng không tồn tại hoặc đã đóng.");
        err.statusCode = 404;
        throw err;
      }

      // Kiểm tra chưa nộp rồi
      const dupRes = await client.query(
        `SELECT id FROM applications
         WHERE candidate_id = $1 AND job_id = $2 AND status != 'withdrawn'`,
        [candidateId, jobId],
      );
      if (dupRes.rows.length > 0) {
        const err = new Error("Bạn đã nộp đơn cho tin này rồi.");
        err.statusCode = 409;
        throw err;
      }

      // Tạo đơn
      const res = await client.query(
        `INSERT INTO applications (candidate_id, job_id, company_id, cover_letter)
         VALUES ($1, $2, $3, $4)
         RETURNING id, status, applied_at`,
        [candidateId, jobId, jobRes.rows[0].company_id, coverLetter || null],
      );
      const app = res.rows[0];

      // Cập nhật application_count trên job_postings
      await client.query(
        `UPDATE job_postings SET application_count = application_count + 1 WHERE id = $1`,
        [jobId],
      );

      // Ghi log Cassandra
      this._logApplication(candidateId, jobId, "submitted").catch(() => {});

      // Tạo relationship trong Neo4j (NV06)
      this._linkCandidateJob(candidateId, jobId).catch(() => {});

      return {
        id: app.id,
        jobTitle: jobRes.rows[0].title,
        status: app.status,
        appliedAt: app.applied_at,
      };
    });
  }

  // ── NV05: Đơn của ứng viên ─────────────────────────────────────
  async getCandidateApplications(candidateId, paginationQuery) {
    const { page, limit, offset } = parsePagination(paginationQuery);

    const params = [candidateId, limit, offset];
    let paramIndex = params.length + 1;

    let statusCondition = "";
    if (paginationQuery.status !== undefined) {
      statusCondition = `AND a.status = $${paramIndex}`;
      params.push(paginationQuery.status);
      paramIndex++;
    }

    const res = await query(
      `SELECT a.id, a.job_id, a.status, a.applied_at,
              j.title AS job_title, j.location, j.status AS job_status,
              c.name AS company_name, c.logo_url
       FROM applications a
       JOIN job_postings j ON j.id = a.job_id
       JOIN companies c ON c.id = a.company_id
       WHERE a.candidate_id = $1
       ${statusCondition}
       ORDER BY a.applied_at DESC
       LIMIT $2 OFFSET $3`,
      params,
    );

    // Optional: keep total consistent with filter
    const totalParams = [candidateId];
    let totalQuery = `SELECT COUNT(*) FROM applications WHERE candidate_id = $1`;

    if (paginationQuery.status !== undefined) {
      totalQuery += ` AND status = $2`;
      totalParams.push(paginationQuery.status);
    }

    const total = await query(totalQuery, totalParams);

    return {
      data: res.rows,
      meta: {
        total: parseInt(total.rows[0].count),
        page,
        limit,
        totalPages: Math.ceil(total.rows[0].count / limit),
      },
    };
  }

  // ── NV05: Đơn của một tin (HR) ─────────────────────────────────
  async getApplicationsByJob(jobId, companyId, filters, paginationQuery) {
    const { page, limit, offset } = parsePagination(paginationQuery);
    const params = [jobId, companyId, limit, offset];
    let where = "a.job_id = $1 AND a.company_id = $2";
    if (filters.status) {
      where += " AND a.status = $5";
      params.push(filters.status);
    }

    const res = await query(
      `SELECT a.id, a.candidate_id, a.status, a.applied_at,
              ca.full_name, ca.phone, ca.location,
              cp.summary, cp.skills
       FROM applications a
       JOIN candidates ca ON ca.id = a.candidate_id
       LEFT JOIN candidate_profiles cp ON cp.candidate_id = a.candidate_id
       WHERE ${where}
       ORDER BY a.applied_at DESC
       LIMIT $3 OFFSET $4`,
      params,
    );
    const total = await query(
      `SELECT COUNT(*) FROM applications a WHERE ${where}`,
      params.slice(0, params.length - 2),
    );
    return {
      data: res.rows,
      meta: {
        total: parseInt(total.rows[0].count),
        page,
        limit,
        totalPages: Math.ceil(total.rows[0].count / limit),
      },
    };
  }

  // ── NV05: Thống kê pipeline ────────────────────────────────────
  async getPipelineStats(jobId, companyId) {
    const res = await query(
      `SELECT status, COUNT(*) AS count
       FROM applications
       WHERE job_id = $1 AND company_id = $2
       GROUP BY status`,
      [jobId, companyId],
    );
    return res.rows;
  }

  // ── NV05: Cập nhật trạng thái đơn ─────────────────────────────
  async updateStatus(applicationId, companyId, status) {
    const res = await query(
      `UPDATE applications
       SET status = $1, updated_at = NOW()
       WHERE id = $2 AND company_id = $3
       RETURNING id, status`,
      [status, applicationId, companyId],
    );
    if (!res.rows.length) {
      const err = new Error("Đơn không tồn tại hoặc bạn không có quyền.");
      err.statusCode = 404;
      throw err;
    }
    return res.rows[0];
  }

  // ── Private helpers ────────────────────────────────────────────
  async _logApplication(candidateId, jobId, eventType) {
    const now = new Date();
    await execute(
      `INSERT INTO user_activity_log
         (user_id, event_date, event_time, event_id, event_type, entity_id, entity_type)
       VALUES (?, ?, ?, uuid(), ?, ?, ?)`,
      [
        candidateId,
        now.toISOString().split("T")[0],
        now,
        eventType,
        jobId,
        "job",
      ],
    );
  }

  async _linkCandidateJob(candidateId, jobId) {
    await runCypher(
      `MATCH (c:Candidate {id: $cid}), (j:Job {id: $jid})
       MERGE (c)-[:APPLIED_TO {date: date()}]->(j)`,
      { cid: candidateId, jid: jobId },
    );
  }
}

module.exports = new ApplicationService();
