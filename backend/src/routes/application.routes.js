const router = require('express').Router();
const { body, param } = require('express-validator');
const validate  = require('../middlewares/validate');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const appService = require('../services/application.service');
const { success, created, paginated } = require('../utils/response');

// ── POST /api/applications – Nộp đơn ứng tuyển ───────────────
router.post('/',
  authenticate,
  authorize('candidate'),
  [
    body('jobId').isUUID(),
  ],
  validate,
  async (req, res, next) => {
    try {
      const { jobId, coverLetter } = req.body;
      const result = await appService.apply(
        req.user.candidateId, jobId, { coverLetter }
      );
      created(res, result, 'Nộp đơn thành công.');
    } catch (err) { next(err); }
  }
);

// ── GET /api/applications/mine – Đơn của ứng viên ────────────
router.get('/mine',
  authenticate,
  authorize('candidate'),
  async (req, res, next) => {
    try {
      const result = await appService.getCandidateApplications(req.user.candidateId, req.query);
      paginated(res, result.data, result.meta);
    } catch (err) { next(err); }
  }
);

// ── GET /api/applications/job/:jobId – Đơn của một tin (HR) ──
router.get('/job/:jobId',
  authenticate,
  authorize('recruiter', 'admin'),
  [param('jobId').isUUID()],
  validate,
  async (req, res, next) => {
    try {
      const result = await appService.getApplicationsByJob(
        req.params.jobId, req.user.companyId, req.query, req.query
      );
      paginated(res, result.data, result.meta);
    } catch (err) { next(err); }
  }
);

// ── GET /api/applications/job/:jobId/pipeline – Thống kê pipeline ──
router.get('/job/:jobId/pipeline',
  authenticate,
  authorize('recruiter', 'admin'),
  [param('jobId').isUUID()],
  validate,
  async (req, res, next) => {
    try {
      const stats = await appService.getPipelineStats(req.params.jobId, req.user.companyId);
      success(res, stats);
    } catch (err) { next(err); }
  }
);

// ── PATCH /api/applications/:id/status – Cập nhật pipeline ───
router.patch('/:id/status',
  authenticate,
  authorize('recruiter', 'admin'),
  [
    param('id').isUUID(),
    body('status').isIn(['submitted', 'reviewing', 'interview', 'offered', 'accepted', 'rejected']),
  ],
  validate,
  async (req, res, next) => {
    try {
      const result = await appService.updateStatus(
        req.params.id, req.user.companyId, req.body.status
      );
      success(res, result, 'Cập nhật trạng thái thành công.');
    } catch (err) { next(err); }
  }
);

module.exports = router;
