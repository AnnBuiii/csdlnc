// ============================================================
// candidate.routes.js
// ============================================================
const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middlewares/validate');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const candidateService = require('../services/candidate.service');
const { success, paginated } = require('../utils/response');

// GET /api/candidates/profile – Lấy hồ sơ của mình
router.get('/profile', authenticate, authorize('candidate'), async (req, res, next) => {
  try {
    const profile = await candidateService.getProfile(req.user.candidateId);
    success(res, profile);
  } catch (err) { next(err); }
});

// GET /api/candidates/:id/profile – Xem hồ sơ public
router.get('/:id/profile', async (req, res, next) => {
  try {
    const profile = await candidateService.getProfile(req.params.id);
    if (!profile || !profile.isPublic) return res.status(404).json({ success: false, message: 'Hồ sơ không tồn tại.' });
    success(res, profile);
  } catch (err) { next(err); }
});

// PUT /api/candidates/profile – Cập nhật hồ sơ
router.put('/profile', authenticate, authorize('candidate'), async (req, res, next) => {
  try {
    const profile = await candidateService.upsertProfile(req.user.candidateId, req.user.userId, req.body);
    success(res, profile, 'Cập nhật hồ sơ thành công.');
  } catch (err) { next(err); }
});

// POST /api/candidates/profile/experience – Thêm kinh nghiệm
router.post('/profile/experience',
  authenticate, authorize('candidate'),
  [body('company').notEmpty(), body('role').notEmpty(), body('startDate').notEmpty()],
  validate,
  async (req, res, next) => {
    try {
      const profile = await candidateService.addExperience(req.user.candidateId, req.body);
      success(res, profile);
    } catch (err) { next(err); }
  }
);

// POST /api/candidates/profile/skills – Thêm kỹ năng
router.post('/profile/skills',
  authenticate, authorize('candidate'),
  [body('name').notEmpty()],
  validate,
  async (req, res, next) => {
    try {
      const profile = await candidateService.addSkill(req.user.candidateId, req.body);
      success(res, profile);
    } catch (err) { next(err); }
  }
);

// GET /api/candidates/search – HR tìm kiếm ứng viên (NV04)
router.get('/search', authenticate, authorize('recruiter', 'admin'), async (req, res, next) => {
  try {
    const result = await candidateService.searchCandidates(req.query, req.query);
    paginated(res, result.data, result.meta);
  } catch (err) { next(err); }
});

module.exports = router;
