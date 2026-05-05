const neo4j = require('neo4j-driver');
const { runCypher, writeTransaction } = require('../config/neo4j');
const { getCache, setCache } = require('../config/redis');
const JobPosting = require('../models/job.model');
const CandidateProfile = require('../models/candidateProfile.model');
const crypto = require('crypto');

class RecommendService {
  // ── NV06: Gợi ý việc làm cho ứng viên ────────────────────────
  async recommendJobsForCandidate(candidateId, limit = 10) {
    const cacheKey = `cache:rec:jobs:${candidateId}`;
    const cached = await getCache(cacheKey);
    if (cached) return { data: cached, fromCache: true };

    const normalizedLimit = Number.isInteger(limit) && limit >= 0 ? neo4j.int(limit) : neo4j.int(10);
    const scores = await runCypher(
      `MATCH (c:Candidate {id: $cid})-[:HAS_SKILL]->(s:Skill)
       MATCH (j:Job {status: 'active'})-[:REQUIRES]->(s)
       WITH j, count(s) AS matchedSkills, j.salaryMax AS salaryMax
       WHERE salaryMax IS NOT NULL
       RETURN j.id AS jobId, j.title AS title, j.location AS location,
              matchedSkills, salaryMax
       ORDER BY matchedSkills DESC, salaryMax DESC
       LIMIT $limit`,
      { cid: candidateId, limit: normalizedLimit }
    );

    if (!scores.length) return { data: [], fromCache: false };

    const jobIds = scores.map(r => r.get('jobId'));
    const jobs = await JobPosting.find({ jobId: { $in: jobIds } }).lean();
    // Preserve ranking order
    const jobMap = Object.fromEntries(jobs.map(j => [j.jobId, j]));
    const ranked = jobIds.map(id => jobMap[id]).filter(Boolean);

    await setCache(cacheKey, ranked, 300);
    return { data: ranked, fromCache: false };
  }

  // ── NV06: Gợi ý ứng viên cho HR ──────────────────────────────
  async recommendCandidatesForJob(jobId, limit = 10) {
    const cacheKey = `cache:rec:candidates:${jobId}`;
    const cached = await getCache(cacheKey);
    if (cached) return { data: cached, fromCache: true };

    const normalizedLimit = Number.isInteger(limit) && limit >= 0 ? neo4j.int(limit) : neo4j.int(10);
    const scores = await runCypher(
      `MATCH (j:Job {id: $jid})-[:REQUIRES]->(s:Skill)
       MATCH (c:Candidate)-[:HAS_SKILL]->(s)
       WITH c, count(s) AS matchedSkills, c.location AS location
       RETURN c.id AS candidateId, c.name AS name, location,
              matchedSkills
       ORDER BY matchedSkills DESC
       LIMIT $limit`,
      { jid: jobId, limit: normalizedLimit }
    );

    if (!scores.length) return { data: [], fromCache: false };

    const candIds = scores.map(r => r.get('candidateId'));
    const candidates = await CandidateProfile.find({ candidateId: { $in: candIds } }).lean();
    const candMap = Object.fromEntries(candidates.map(c => [c.candidateId, c]));
    const ranked = candIds.map(id => candMap[id]).filter(Boolean);

    await setCache(cacheKey, ranked, 300);
    return { data: ranked, fromCache: false };
  }

  // ── NV06: Ứng viên tương tự ──────────────────────────────────
  async findSimilarCandidates(candidateId) {
    const cacheKey = `cache:sim:candidates:${candidateId}`;
    const cached = await getCache(cacheKey);
    if (cached) return { data: cached, fromCache: true };

    const similar = await runCypher(
      `MATCH (c:Candidate {id: $cid})-[:HAS_SKILL]->(s:Skill)<-[:HAS_SKILL]-(other:Candidate)
       WHERE other.id <> $cid
       WITH other, count(s) AS sharedSkills, collect(s.name) AS commonSkills
       RETURN other.id AS candidateId, other.name AS name,
              other.location AS location, sharedSkills, commonSkills
       ORDER BY sharedSkills DESC
       LIMIT 10`,
      { cid: candidateId }
    );

    const result = similar.map(r => ({
      candidateId: r.get('candidateId'),
      name:         r.get('name'),
      location:     r.get('location'),
      sharedSkills: r.get('sharedSkills').toInt(),
      commonSkills: r.get('commonSkills'),
    }));

    await setCache(cacheKey, result, 300);
    return { data: result, fromCache: false };
  }

  // ── NV06: Công việc liên quan (dựa trên job ID) ──────────────
  async relatedJobs(jobId) {
    const cacheKey = `cache:related:jobs:${jobId}`;
    const cached = await getCache(cacheKey);
    if (cached) return cached;

    const related = await runCypher(
      `MATCH (j:Job {id: $jid})-[:REQUIRES]->(s:Skill)<-[:REQUIRES]-(other:Job)
       WHERE other.id <> $jid AND other.status = 'active'
       WITH other, count(s) AS sharedSkills
       RETURN other.id AS jobId, other.title AS title,
              other.location AS location, sharedSkills
       ORDER BY sharedSkills DESC
       LIMIT 6`,
      { jid: jobId }
    );

    if (!related.length) return [];

    const jobIds = related.map(r => r.get('jobId'));
    const jobs = await JobPosting.find({ jobId: { $in: jobIds } }).lean();
    const jobMap = Object.fromEntries(jobs.map(j => [j.jobId, j]));
    const result = jobIds.map(id => jobMap[id]).filter(Boolean);

    await setCache(cacheKey, result, 120);
    return result;
  }
}

module.exports = new RecommendService();