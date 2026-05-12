const { query } = require('../config/postgres');

class CompanyService {
  // ── Lấy thông tin công ty ─────────────────────────────────────
  async getProfile(companyId) {
    const res = await query(
      `SELECT c.id, c.name, c.industry, c.size, c.logo_url, c.website,
              c.description, c.address, c.phone, c.email,
              u.email AS user_email, c.created_at
       FROM companies c
       JOIN users u ON u.id = c.user_id
       WHERE c.id = $1`,
      [companyId]
    );
    if (!res.rows.length) {
      const err = new Error('Công ty không tồn tại.');
      err.statusCode = 404; throw err;
    }
    return res.rows[0];
  }

  // ── Cập nhật thông tin công ty ────────────────────────────────
  async upsertProfile(companyId, data) {
    const {
      name, industry, size, logoUrl, website,
      description, address, phone, email,
    } = data;

    const res = await query(
      `UPDATE companies
       SET name = COALESCE(NULLIF($2, ''), name),
           industry  = COALESCE(NULLIF($3, ''), industry),
           size      = COALESCE(NULLIF($4, ''), size),
           logo_url  = COALESCE(NULLIF($5, ''), logo_url),
           website   = COALESCE(NULLIF($6, ''), website),
           description = COALESCE(NULLIF($7, ''), description),
           address   = COALESCE(NULLIF($8, ''), address),
           phone     = COALESCE(NULLIF($9, ''), phone),
           email     = COALESCE(NULLIF($10, ''), email),
           updated_at = NOW()
       WHERE id = $1
       RETURNING id, name, industry, updated_at`,
      [companyId, name, industry, size, logoUrl, website, description, address, phone, email]
    );
    if (!res.rows.length) {
      const err = new Error('Công ty không tồn tại.');
      err.statusCode = 404; throw err;
    }
    return res.rows[0];
  }
}

module.exports = new CompanyService();