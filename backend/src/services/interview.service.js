const { query, withTransaction } = require('../config/postgres');
const { parsePagination } = require('../utils/pagination');

class InterviewService {
  // ── NV07: Lên lịch phỏng vấn ───────────────────────────────────
  async scheduleInterview(applicationId, companyId, data) {
    return withTransaction(async (client) => {
      const { scheduledAt, type, location, meetingLink, interviewer, notes } = data;

      // Verify application belongs to company
      const appRes = await client.query(
        `SELECT a.id, a.candidate_id, a.job_id, c.full_name, j.title
         FROM applications a
         JOIN candidates c ON c.id = a.candidate_id
         JOIN job_postings j ON j.id = a.job_id
         WHERE a.id = $1 AND a.company_id = $2 AND a.status IN ('reviewing', 'interview')`,
        [applicationId, companyId]
      );
      if (!appRes.rows.length) {
        const err = new Error('Đơn ứng tuyển không tồn tại hoặc chưa ở giai đoạn phỏng vấn.');
        err.statusCode = 404; throw err;
      }
      const app = appRes.rows[0];

      const res = await client.query(
        `INSERT INTO interviews
           (application_id, candidate_id, job_id, scheduled_at, type, location, meeting_link, interviewer, notes)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
         RETURNING id, status, scheduled_at, type`,
        [applicationId, app.candidate_id, app.job_id, scheduledAt, type, location || null, meetingLink || null, interviewer || null, notes || null]
      );

      // Cập nhật application → interview
      await client.query(
        `UPDATE applications SET status = 'interview', updated_at = NOW() WHERE id = $1`,
        [applicationId]
      );

      return {
        id: res.rows[0].id,
        status: res.rows[0].status,
        scheduledAt: res.rows[0].scheduled_at,
        type: res.rows[0].type,
        candidateName: app.full_name,
        jobTitle: app.title,
      };
    });
  }

  // ── NV07: Lịch phỏng vấn của công ty ─────────────────────────
  async getInterviewsByCompany(companyId, filters, paginationQuery) {
    const { page, limit, offset } = parsePagination(paginationQuery);
    const params = [companyId, limit, offset];
    let where = 'i.company_id = $1';
    if (filters.status)   { where += ' AND i.status = $5'; params.push(filters.status); }
    if (filters.dateFrom) { where += ' AND i.scheduled_at >= $6'; params.push(filters.dateFrom); }

    const res = await query(
      `SELECT i.id, i.scheduled_at, i.type, i.status, i.location, i.meeting_link,
              i.interviewer, i.notes,
              ca.full_name  AS candidate_name, ca.phone, ca.email AS candidate_email,
              j.title       AS job_title
       FROM interviews i
       JOIN applications a ON a.id = i.application_id
       JOIN candidates   ca ON ca.id = a.candidate_id
       JOIN job_postings j  ON j.id = i.job_id
       WHERE ${where}
       ORDER BY i.scheduled_at ASC
       LIMIT $2 OFFSET $3`,
      params
    );
    const total = await query(
      `SELECT COUNT(*) FROM interviews i WHERE ${where}`,
      params.slice(0, params.length - 2)
    );
    return {
      data: res.rows,
      meta: { total: parseInt(total.rows[0].count), page, limit },
    };
  }

  // ── NV07: Lịch phỏng vấn của ứng viên ────────────────────────
  async getCandidateInterviews(candidateId) {
    const res = await query(
      `SELECT i.id, i.scheduled_at, i.type, i.status, i.location, i.meeting_link,
              j.title    AS job_title,
              co.name    AS company_name, co.logo_url
       FROM interviews i
       JOIN applications a ON a.id = i.application_id
       JOIN job_postings j  ON j.id = i.job_id
       JOIN companies    co ON co.id = i.company_id
       WHERE i.candidate_id = $1
       ORDER BY i.scheduled_at ASC`,
      [candidateId]
    );
    return res.rows;
  }

  // ── NV07: Ghi kết quả phỏng vấn ───────────────────────────────
  async updateResult(interviewId, companyId, data) {
    const { status, rating, feedback, decision, notes } = data;
    const res = await query(
      `UPDATE interviews
       SET status = $1, rating = $2, feedback = $3, decision = $4, notes = $5, updated_at = NOW()
       WHERE id = $6 AND company_id = $7
       RETURNING id, status, decision`,
      [status, rating || null, feedback || null, decision || null, notes || null, interviewId, companyId]
    );
    if (!res.rows.length) {
      const err = new Error('Lịch phỏng vấn không tồn tại hoặc bạn không có quyền.');
      err.statusCode = 404; throw err;
    }
    return res.rows[0];
  }

  // ── NV07: Đổi lịch phỏng vấn ─────────────────────────────────
  async reschedule(interviewId, companyId, data) {
    const { scheduledAt, reason } = data;
    const res = await query(
      `UPDATE interviews
       SET scheduled_at = $1, status = 'rescheduled', notes = COALESCE(notes || E'\\n', '') || $2, updated_at = NOW()
       WHERE id = $3 AND company_id = $4
       RETURNING id, scheduled_at, status`,
      [scheduledAt, `Rescheduled: ${reason || 'No reason'}`, interviewId, companyId]
    );
    if (!res.rows.length) {
      const err = new Error('Lịch phỏng vấn không tồn tại hoặc bạn không có quyền.');
      err.statusCode = 404; throw err;
    }
    return res.rows[0];
  }
}

module.exports = new InterviewService();