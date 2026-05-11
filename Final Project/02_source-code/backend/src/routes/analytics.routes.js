const router = require('express').Router();
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const analyticsService = require('../services/analytics.service');
const { success } = require('../utils/response');

// GET /api/analytics/recruiter – Dashboard HR
router.get('/recruiter', authenticate, authorize('recruiter', 'admin'), async (req, res, next) => {
  try {
    const data = await analyticsService.getRecruiterDashboard(req.user.companyId);
    success(res, data);
  } catch (err) { next(err); }
});

// GET /api/analytics/admin – Dashboard Admin
router.get('/admin', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const data = await analyticsService.getAdminDashboard();
    success(res, data);
  } catch (err) { next(err); }
});

// GET /api/analytics/jobs/:id – Thống kê một tin tuyển dụng
router.get('/jobs/:id', authenticate, authorize('recruiter', 'admin'), async (req, res, next) => {
  try {
    const data = await analyticsService.getJobStats(req.params.id, req.query.days);
    success(res, data);
  } catch (err) { next(err); }
});

module.exports = router;
