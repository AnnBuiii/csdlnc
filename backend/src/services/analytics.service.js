const { query } = require('../config/postgres');
const { execute } = require('../config/cassandra');
const { parsePagination } = require('../utils/pagination');
const JobPosting = require('../models/job.model');

class AnalyticsService {
  // ── NV10: Dashboard HR ─────────────────────────────────────────
  async getRecruiterDashboard(companyId) {
    const [appStats, jobStats, pipelineStats] = await Promise.all([
      query(
        `SELECT
           COUNT(*)                                              AS total_applications,
           COUNT(*) FILTER (WHERE status = 'submitted')          AS submitted,
           COUNT(*) FILTER (WHERE status = 'reviewing')          AS reviewing,
           COUNT(*) FILTER (WHERE status = 'interview')          AS interview,
           COUNT(*) FILTER (WHERE status = 'offered')            AS offered,
           COUNT(*) FILTER (WHERE status = 'rejected')           AS rejected,
           COUNT(*) FILTER (WHERE DATE(applied_at) = CURRENT_DATE) AS today_applications
         FROM applications
         WHERE company_id = $1`,
        [companyId]
      ),
      query(
        `SELECT id, title, status,
                view_count, application_count, created_at
         FROM job_postings
         WHERE company_id = $1
         ORDER BY created_at DESC
         LIMIT 10`,
        [companyId]
      ),
      query(
        `SELECT DATE(applied_at) AS date, COUNT(*) AS count
         FROM applications
         WHERE company_id = $1 AND applied_at >= NOW() - INTERVAL '30 days'
         GROUP BY DATE(applied_at)
         ORDER BY date`,
        [companyId]
      ),
    ]);

    return {
      applicationStats: appStats.rows[0],
      recentJobs:       jobStats.rows,
      dailyApplications: pipelineStats.rows,
    };
  }

  // ── NV10: Dashboard Admin ───────────────────────────────────────
  async getAdminDashboard() {
    const [userStats, jobStats, appStats] = await Promise.all([
      query(
        `SELECT
           COUNT(*) FILTER (WHERE role = 'candidate') AS total_candidates,
           COUNT(*) FILTER (WHERE role = 'recruiter') AS total_recruiters,
           COUNT(*) FILTER (WHERE is_active = FALSE)  AS inactive_users,
           COUNT(*) FILTER (WHERE last_login >= NOW() - INTERVAL '7 days') AS active_last_7d
         FROM users`
      ),
      query(
        `SELECT
           COUNT(*) FILTER (WHERE status = 'active')   AS active_jobs,
           COUNT(*) FILTER (WHERE status = 'draft')    AS draft_jobs,
           COUNT(*) FILTER (WHERE status = 'closed')   AS closed_jobs,
           COUNT(*) FILTER (WHERE deadline < NOW())    AS expired_jobs
         FROM job_postings`
      ),
      query(
        `SELECT DATE(applied_at) AS date, COUNT(*) AS count
         FROM applications
         WHERE applied_at >= NOW() - INTERVAL '30 days'
         GROUP BY DATE(applied_at)
         ORDER BY date`
      ),
    ]);

    return {
      userStats: userStats.rows[0],
      jobStats:  jobStats.rows[0],
      applicationTrend: appStats.rows,
    };
  }

  // ── NV10: Thống kê một tin tuyển dụng ────────────────────────
  async getJobStats(jobId, days = 30) {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - parseInt(days));
    const fromDateStr = fromDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'

    const [stats, viewEvents] = await Promise.all([
      query(
        `SELECT id, title, status, view_count, application_count, created_at, deadline
         FROM job_postings WHERE id = $1`,
        [jobId]
      ),
      execute(
        `SELECT event_date, count(*) AS views
         FROM user_activity_log
         WHERE entity_id = ? AND event_type = 'view_job'
           AND event_date >= ?
         GROUP BY event_date
         ORDER BY event_date`,
        [jobId, fromDateStr]
      ),
    ]);

    return {
      job:        stats.rows[0] || null,
      viewHistory: viewEvents.rows || [],
    };
  }

  // ── NV10: Lịch sử hành vi người dùng (Cassandra) ─────────────
  async getUserActivity(userId, date) {
    if (!date) {
      const now = new Date();
      date = now.toISOString().split('T')[0];
    }
    const rows = await execute(
      `SELECT event_id, event_type, entity_id, entity_type, event_time
       FROM user_activity_log
       WHERE user_id = ? AND event_date = ?
       ORDER BY event_time DESC`,
      [userId, date]
    );
    return rows.rows || [];
  }
}

module.exports = new AnalyticsService();