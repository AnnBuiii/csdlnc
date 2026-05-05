const bcrypt   = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { withTransaction, query } = require('../config/postgres');
const { signToken, verifyToken }  = require('../utils/jwt');
const {
  setSession, deleteSession,
  setRefreshToken, getRefreshToken, deleteRefreshToken,
} = require('../config/redis');
const { writeTransaction } = require('../config/neo4j');
const CandidateProfile = require('../models/candidateProfile.model');

class AuthService {
  // ── NV01: Đăng ký ứng viên ──────────────────────────────────
  async registerCandidate({ email, password, fullName, phone, location }) {
    return withTransaction(async (client) => {
      // Kiểm tra email đã tồn tại chưa
      const existing = await client.query(
        'SELECT id FROM users WHERE email = $1',
        [email]
      );
      if (existing.rows.length > 0) {
        const err = new Error('Email đã được sử dụng.');
        err.statusCode = 409;
        throw err;
      }

      const hash = await bcrypt.hash(password, 12);

      // Tạo user
      const userRes = await client.query(
        `INSERT INTO users (email, password_hash, role)
         VALUES ($1, $2, 'candidate')
         RETURNING id, email, role, created_at`,
        [email, hash]
      );
      const user = userRes.rows[0];

      // Tạo candidate profile trong PostgreSQL
      const candRes = await client.query(
        `INSERT INTO candidates (user_id, full_name, phone, location)
         VALUES ($1, $2, $3, $4)
         RETURNING id`,
        [user.id, fullName, phone || null, location || null]
      );
      const candidateId = candRes.rows[0].id;

      // Tạo MongoDB profile (upsert để idempotent)
      CandidateProfile.findOneAndUpdate(
        { candidateId },
        {
          $setOnInsert: {
            candidateId,
            userId: user.id,
            personalInfo: { fullName, phone: phone || '', location: location || '', email },
            skills: [], experience: [], education: [], certifications: [],
            languages: [], portfolio: [],
            preferences: { expectedSalary: {}, jobTypes: [], preferredLocations: [], industries: [] },
            isPublic: true,
          },
        },
        { upsert: true, new: true }
      ).catch(() => {});

      // Tạo node trong Neo4j (bất đồng bộ, không block transaction)
      this._createCandidateNode(candidateId, { fullName, location }).catch(() => {});

      const token   = signToken({ userId: user.id, email, role: 'candidate' });
      const refresh = uuidv4();

      await setSession(user.id, {
        userId: user.id, email, role: 'candidate',
        candidateId, loginAt: new Date().toISOString(),
      });
      await setRefreshToken(refresh, user.id);

      return { user: { id: user.id, email, role: 'candidate', candidateId }, token, refreshToken: refresh };
    });
  }

  // ── NV01: Đăng ký nhà tuyển dụng ────────────────────────────
  async registerRecruiter({ email, password, companyName, industry }) {
    return withTransaction(async (client) => {
      const existing = await client.query('SELECT id FROM users WHERE email = $1', [email]);
      if (existing.rows.length > 0) {
        const err = new Error('Email đã được sử dụng.'); err.statusCode = 409; throw err;
      }

      const hash = await bcrypt.hash(password, 12);

      const userRes = await client.query(
        `INSERT INTO users (email, password_hash, role)
         VALUES ($1, $2, 'recruiter') RETURNING id, email, role`,
        [email, hash]
      );
      const user = userRes.rows[0];

      const compRes = await client.query(
        `INSERT INTO companies (user_id, name, industry)
         VALUES ($1, $2, $3) RETURNING id`,
        [user.id, companyName, industry || null]
      );
      const companyId = compRes.rows[0].id;

      const token   = signToken({ userId: user.id, email, role: 'recruiter' });
      const refresh = uuidv4();

      await setSession(user.id, {
        userId: user.id, email, role: 'recruiter',
        companyId, loginAt: new Date().toISOString(),
      });
      await setRefreshToken(refresh, user.id);

      return { user: { id: user.id, email, role: 'recruiter', companyId }, token, refreshToken: refresh };
    });
  }

  // ── NV01: Đăng nhập ─────────────────────────────────────────
  async login({ email, password, deviceInfo }) {
    const res = await query(
      `SELECT u.id, u.email, u.password_hash, u.role, u.is_active,
              c.id AS candidate_id, co.id AS company_id
       FROM users u
       LEFT JOIN candidates c  ON c.user_id  = u.id
       LEFT JOIN companies  co ON co.user_id = u.id
       WHERE u.email = $1`,
      [email]
    );

    const user = res.rows[0];
    if (!user) {
      const err = new Error('Email hoặc mật khẩu không đúng.'); err.statusCode = 401; throw err;
    }
    if (!user.is_active) {
      const err = new Error('Tài khoản đã bị khoá.'); err.statusCode = 403; throw err;
    }
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      const err = new Error('Email hoặc mật khẩu không đúng.'); err.statusCode = 401; throw err;
    }

    await query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);

    const token   = signToken({ userId: user.id, email: user.email, role: user.role });
    const refresh = uuidv4();

    await setSession(user.id, {
      userId:      user.id,
      email:       user.email,
      role:        user.role,
      candidateId: user.candidate_id || '',
      companyId:   user.company_id   || '',
      loginAt:     new Date().toISOString(),
      deviceInfo:  deviceInfo || '',
    });
    await setRefreshToken(refresh, user.id);

    return {
      user: {
        id: user.id, email: user.email, role: user.role,
        candidateId: user.candidate_id,
        companyId:   user.company_id,
      },
      token,
      refreshToken: refresh,
    };
  }

  // ── NV01: Đăng xuất ─────────────────────────────────────────
  async logout(userId, refreshToken) {
    await deleteSession(userId);
    if (refreshToken) await deleteRefreshToken(refreshToken);
  }

  // ── NV01: Refresh token ──────────────────────────────────────
  async refresh(refreshToken) {
    const userId = await getRefreshToken(refreshToken);
    if (!userId) {
      const err = new Error('Refresh token không hợp lệ hoặc đã hết hạn.'); err.statusCode = 401; throw err;
    }

    const res = await query(
      'SELECT id, email, role FROM users WHERE id = $1 AND is_active = TRUE',
      [userId]
    );
    const user = res.rows[0];
    if (!user) {
      const err = new Error('Tài khoản không tồn tại.'); err.statusCode = 401; throw err;
    }

    await deleteRefreshToken(refreshToken);
    const newRefresh = uuidv4();
    const newToken   = signToken({ userId: user.id, email: user.email, role: user.role });

    await setRefreshToken(newRefresh, user.id);

    return { token: newToken, refreshToken: newRefresh };
  }

  // ── Private: tạo node Neo4j ──────────────────────────────────
  async _createCandidateNode(candidateId, { fullName, location }) {
    await writeTransaction((tx) =>
      tx.run(
        `MERGE (c:Candidate {id: $id})
         SET c.name = $name, c.location = $location`,
        { id: candidateId, name: fullName, location: location || '' }
      )
    );
  }
}

module.exports = new AuthService();
