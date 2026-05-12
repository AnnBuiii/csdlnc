const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middlewares/validate');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const companyService = require('../services/company.service');
const { success } = require('../utils/response');

// GET /api/companies/profile – Lấy thông tin công ty của mình
router.get('/profile', authenticate, authorize('recruiter', 'admin'), async (req, res, next) => {
  try {
    const profile = await companyService.getProfile(req.user.companyId);
    success(res, profile);
  } catch (err) { next(err); }
});

// GET /api/companies/:id – Xem thông tin công ty public
router.get('/:id', async (req, res, next) => {
  try {
    const profile = await companyService.getProfile(req.params.id);
    success(res, profile);
  } catch (err) { next(err); }
});

// PUT /api/companies/profile – Cập nhật thông tin công ty
router.put('/profile',
  authenticate,
  authorize('recruiter', 'admin'),
  [
    body('name').optional().trim(),
    body('industry').optional().trim(),
    body('size').optional().trim(),
    body('logoUrl').optional().trim().isURL(),
    body('website').optional().trim().isURL(),
    body('phone').optional().trim(),
    body('email').optional().trim().isEmail(),
  ],
  validate,
  async (req, res, next) => {
    try {
      const profile = await companyService.upsertProfile(req.user.companyId, req.body);
      success(res, profile, 'Cập nhật thông tin công ty thành công.');
    } catch (err) { next(err); }
  }
);

module.exports = router;
