const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middlewares/validate');
const { authenticate } = require('../middlewares/auth.middleware');
const authService = require('../services/auth.service');
const { success, created, error } = require('../utils/response');

// ── POST /api/auth/register/candidate ────────────────────────
router.post('/register/candidate',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }).withMessage('Mật khẩu tối thiểu 8 ký tự'),
    body('fullName').notEmpty().trim(),
  ],
  validate,
  async (req, res, next) => {
    try {
      const result = await authService.registerCandidate(req.body);
      created(res, result, 'Đăng ký ứng viên thành công.');
    } catch (err) { next(err); }
  }
);

// ── POST /api/auth/register/recruiter ────────────────────────
router.post('/register/recruiter',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    body('companyName').notEmpty().trim(),
  ],
  validate,
  async (req, res, next) => {
    try {
      const result = await authService.registerRecruiter(req.body);
      created(res, result, 'Đăng ký nhà tuyển dụng thành công.');
    } catch (err) { next(err); }
  }
);

// ── POST /api/auth/login ──────────────────────────────────────
router.post('/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
  ],
  validate,
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const deviceInfo = req.headers['user-agent'];
      const result = await authService.login({ email, password, deviceInfo });
      success(res, result, 'Đăng nhập thành công.');
    } catch (err) { next(err); }
  }
);

// ── POST /api/auth/logout ─────────────────────────────────────
router.post('/logout', authenticate, async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    await authService.logout(req.user.userId, refreshToken);
    success(res, null, 'Đăng xuất thành công.');
  } catch (err) { next(err); }
});

// ── POST /api/auth/refresh ────────────────────────────────────
router.post('/refresh',
  [body('refreshToken').notEmpty()],
  validate,
  async (req, res, next) => {
    try {
      const result = await authService.refresh(req.body.refreshToken);
      success(res, result);
    } catch (err) { next(err); }
  }
);

// ── GET /api/auth/me ──────────────────────────────────────────
router.get('/me', authenticate, (req, res) => {
  success(res, req.user);
});

module.exports = router;
