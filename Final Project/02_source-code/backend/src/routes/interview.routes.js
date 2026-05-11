const router = require('express').Router();
const { body, param } = require('express-validator');
const validate = require('../middlewares/validate');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const interviewService = require('../services/interview.service');
const { success, created } = require('../utils/response');

// POST /api/interviews – Tạo lịch phỏng vấn
router.post('/',
  authenticate, authorize('recruiter', 'admin'),
  [
    body('applicationId').isUUID(),
    body('scheduledAt').isISO8601(),
    body('type').isIn(['online', 'offline', 'phone']),
  ],
  validate,
  async (req, res, next) => {
    try {
      const { applicationId, ...data } = req.body;
      const result = await interviewService.scheduleInterview(applicationId, req.user.companyId, data);
      created(res, result, 'Lên lịch phỏng vấn thành công.');
    } catch (err) { next(err); }
  }
);

// GET /api/interviews/company – Lịch phỏng vấn của công ty
router.get('/company',
  authenticate, authorize('recruiter', 'admin'),
  async (req, res, next) => {
    try {
      const result = await interviewService.getInterviewsByCompany(req.user.companyId, req.query, req.query);
      success(res, result.data);
    } catch (err) { next(err); }
  }
);

// GET /api/interviews/mine – Lịch phỏng vấn của ứng viên
router.get('/mine', authenticate, authorize('candidate'), async (req, res, next) => {
  try {
    const result = await interviewService.getCandidateInterviews(req.user.candidateId);
    success(res, result);
  } catch (err) { next(err); }
});

// PATCH /api/interviews/:id/result – Ghi kết quả phỏng vấn
router.patch('/:id/result',
  authenticate, authorize('recruiter', 'admin'),
  [param('id').isUUID(), body('status').isIn(['completed', 'cancelled'])],
  validate,
  async (req, res, next) => {
    try {
      const result = await interviewService.updateResult(req.params.id, req.user.companyId, req.body);
      success(res, result);
    } catch (err) { next(err); }
  }
);

// PATCH /api/interviews/:id/reschedule – Đổi lịch
router.patch('/:id/reschedule',
  authenticate, authorize('recruiter', 'admin'),
  [param('id').isUUID(), body('scheduledAt').isISO8601()],
  validate,
  async (req, res, next) => {
    try {
      const result = await interviewService.reschedule(req.params.id, req.user.companyId, req.body);
      success(res, result, 'Đổi lịch thành công.');
    } catch (err) { next(err); }
  }
);

module.exports = router;
