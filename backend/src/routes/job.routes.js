const router  = require('express').Router();
const { body, param, query } = require('express-validator');
const validate = require('../middlewares/validate');
const { authenticate, authorize, optionalAuth } = require('../middlewares/auth.middleware');
const jobService = require('../services/job.service');
const recommendService = require('../services/recommend.service');
const { success, created, paginated, notFound } = require('../utils/response');

// ── GET /api/jobs – Tìm kiếm công việc (NV04, public) ────────
router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const result = await jobService.searchJobs(req.query, req.query);
    paginated(res, result.data, result.meta);
  } catch (err) { next(err); }
});

// ── GET /api/jobs/:id – Chi tiết tin tuyển dụng ───────────────
router.get('/:id',
  [param('id').isUUID()],
  validate,
  optionalAuth,
  async (req, res, next) => {
    try {
      const job = await jobService.getJobDetail(req.params.id, req.user?.userId);
      if (!job) return notFound(res, 'Tin tuyển dụng không tồn tại.');
      success(res, job);
    } catch (err) { next(err); }
  }
);

// ── GET /api/jobs/:id/related – Công việc liên quan (NV06) ────
router.get('/:id/related',
  [param('id').isUUID()],
  validate,
  async (req, res, next) => {
    try {
      const jobs = await recommendService.relatedJobs(req.params.id);
      success(res, jobs);
    } catch (err) { next(err); }
  }
);

// ── POST /api/jobs – Tạo tin (recruiter only, NV03) ───────────
router.post('/',
  authenticate,
  authorize('recruiter', 'admin'),
  [
    body('title').notEmpty().trim(),
    body('deadline').optional().isDate(),
    body('salaryMin').optional().isInt({ min: 0 }),
    body('salaryMax').optional().isInt({ min: 0 }),
  ],
  validate,
  async (req, res, next) => {
    try {
      const result = await jobService.createJob(req.user.companyId, req.body);
      created(res, result, 'Tạo tin tuyển dụng thành công.');
    } catch (err) { next(err); }
  }
);

// ── PATCH /api/jobs/:id/status – Cập nhật trạng thái ─────────
router.patch('/:id/status',
  authenticate,
  authorize('recruiter', 'admin'),
  [
    param('id').isUUID(),
    body('status').isIn(['draft', 'active', 'closed']),
  ],
  validate,
  async (req, res, next) => {
    try {
      const result = await jobService.updateJobStatus(req.params.id, req.user.companyId, req.body.status);
      success(res, result, 'Cập nhật trạng thái thành công.');
    } catch (err) { next(err); }
  }
);

// ── GET /api/jobs/company/mine – Tin tuyển dụng của mình ──────
router.get('/company/mine',
  authenticate,
  authorize('recruiter', 'admin'),
  async (req, res, next) => {
    try {
      const result = await jobService.getCompanyJobs(req.user.companyId, req.query);
      paginated(res, result.data, result.meta);
    } catch (err) { next(err); }
  }
);

module.exports = router;
