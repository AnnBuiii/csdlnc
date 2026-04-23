const CandidateProfile = require('../models/candidateProfile.model');
const { query, withTransaction } = require('../config/postgres');
const { parsePagination } = require('../utils/pagination');
const { writeTransaction } = require('../config/neo4j');
const crypto = require('crypto');

class CandidateService {
  // ── NV02: Lấy hồ sơ ứng viên ──────────────────────────────────
  async getProfile(candidateId) {
    const profile = await CandidateProfile.findOne({ candidateId }).lean();
    if (!profile) {
      const err = new Error('Hồ sơ không tồn tại.');
      err.statusCode = 404; throw err;
    }
    return profile;
  }

  // ── NV02: Tạo / cập nhật hồ sơ ứng viên ─────────────────────
  async upsertProfile(candidateId, userId, data) {
    const {
      fullName, email, phone, location, avatarUrl,
      summary, skills, experience, education,
      certifications, languages, portfolio,
      expectedSalary, jobTypes, preferredLocations, industries,
      resumeUrl, isPublic,
    } = data;

    const update = {
      personalInfo: { fullName, email, phone, location, avatarUrl },
      summary,
      skills:         skills         || [],
      experience:     experience     || [],
      education:      education      || [],
      certifications: certifications  || [],
      languages:      languages       || [],
      portfolio:      portfolio      || [],
      preferences: {
        expectedSalary:      expectedSalary       || {},
        jobTypes:            jobTypes             || [],
        preferredLocations:  preferredLocations   || [],
        industries:          industries           || [],
      },
      resumeUrl,
      isPublic: isPublic !== undefined ? isPublic : true,
    };

    let profile = await CandidateProfile.findOneAndUpdate(
      { candidateId },
      { $set: update },
      { new: true, upsert: true, lean: true }
    );

    // Cập nhật Neo4j node (skills graph)
    this._syncProfileToNeo4j(candidateId, { fullName, skills, location }).catch(() => {});

    return profile;
  }

  // ── NV02: Thêm kinh nghiệm ───────────────────────────────────
  async addExperience(candidateId, data) {
    const { company, role, startDate, endDate, isCurrent, description, achievements } = data;
    const profile = await CandidateProfile.findOneAndUpdate(
      { candidateId },
      {
        $push: {
          experience: { company, role, startDate, endDate, isCurrent: !!isCurrent, description, achievements: achievements || [] },
        },
      },
      { new: true, lean: true }
    );
    if (!profile) { const err = new Error('Hồ sơ không tồn tại.'); err.statusCode = 404; throw err; }
    return profile;
  }

  // ── NV02: Thêm kỹ năng ────────────────────────────────────────
  async addSkill(candidateId, data) {
    const { name, level, yearsOfExp } = data;
    const profile = await CandidateProfile.findOneAndUpdate(
      { candidateId },
      { $push: { skills: { name, level, yearsOfExp: yearsOfExp || 0 } } },
      { new: true, lean: true }
    );
    if (!profile) { const err = new Error('Hồ sơ không tồn tại.'); err.statusCode = 404; throw err; }
    return profile;
  }

  // ── NV04: Tìm kiếm ứng viên (HR/Admin) ──────────────────────
  async searchCandidates(filters, paginationQuery) {
    const { page, limit, offset } = parsePagination(paginationQuery);

    const mongoFilter = { isPublic: true };
    if (filters.q)        mongoFilter.$text = { $search: filters.q };
    if (filters.city)     mongoFilter['personalInfo.location'] = new RegExp(filters.city, 'i');
    if (filters.skill)    mongoFilter['skills.name'] = new RegExp(filters.skill, 'i');
    if (filters.level)    mongoFilter['skills.level'] = filters.level;
    if (filters.industry) mongoFilter['preferences.industries'] = new RegExp(filters.industry, 'i');

    const projectOpts = filters.q ? { score: { $meta: 'textScore' } } : {};
    const sortOpts    = filters.q ? { score: { $meta: 'textScore' } } : { updatedAt: -1 };

    const [candidates, total] = await Promise.all([
      CandidateProfile.find(mongoFilter, projectOpts).sort(sortOpts).skip(offset).limit(limit).lean(),
      CandidateProfile.countDocuments(mongoFilter),
    ]);

    return {
      data: candidates,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  // ── Private: sync profile vào Neo4j ─────────────────────────
  async _syncProfileToNeo4j(candidateId, { fullName, skills, location }) {
    await writeTransaction(async (tx) => {
      await tx.run(
        `MERGE (c:Candidate {id: $id})
         SET c.name = $name, c.location = $location`,
        { id: candidateId, name: fullName || '', location: location || '' }
      );
      for (const skill of (skills || [])) {
        await tx.run(
          `MERGE (s:Skill {name: $name})
           WITH s
           MATCH (c:Candidate {id: $cid})
           MERGE (c)-[:KNOWS {level: $level}]->(s)`,
          { name: skill.name, cid: candidateId, level: skill.level || '' }
        );
      }
    });
  }
}

module.exports = new CandidateService();