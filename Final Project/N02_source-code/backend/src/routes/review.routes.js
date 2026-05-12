// ============================================================
// review.routes.js – NV09
// ============================================================
const router = require('express').Router();
const { body, param } = require('express-validator');
const validate = require('../middlewares/validate');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const reviewService = require('../services/review.service');
const { success, created } = require('../utils/response');

router.post('/',
  authenticate, authorize('candidate'),
  [
    body('companyId').notEmpty(),
    body('ratings.overall').isInt({ min: 1, max: 5 }),
  ],
  validate,
  async (req, res, next) => {
    try {
      const { companyId, ...data } = req.body;
      const review = await reviewService.createReview(req.user.candidateId, companyId, data);
      created(res, review, 'Gửi đánh giá thành công. Đang chờ duyệt.');
    } catch (err) { next(err); }
  }
);

router.get('/company/:companyId',
  [param('companyId').notEmpty()],
  validate,
  async (req, res, next) => {
    try {
      const result = await reviewService.getCompanyReviews(req.params.companyId, req.query);
      success(res, result);
    } catch (err) { next(err); }
  }
);

router.patch('/:id/approve',
  authenticate, authorize('admin'),
  [param('id').notEmpty(), body('approved').isBoolean()],
  validate,
  async (req, res, next) => {
    try {
      const review = await reviewService.approveReview(req.params.id, req.body.approved);
      success(res, review);
    } catch (err) { next(err); }
  }
);

module.exports = router;
