const router = require('express').Router();
const { param } = require('express-validator');
const validate = require('../middlewares/validate');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const recommendService = require('../services/recommend.service');
const { success } = require('../utils/response');

// GET /api/recommendations/jobs – Gợi ý việc làm cho ứng viên
router.get('/jobs', authenticate, authorize('candidate'), async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10);
    const safeLimit = Number.isInteger(limit) && limit >= 0 ? limit : 10;
    const result = await recommendService.recommendJobsForCandidate(
      req.user.candidateId, safeLimit
    );
    success(res, result.data, result.fromCache ? 'Từ cache.' : 'Gợi ý mới.');
  } catch (err) { next(err); }
});

// GET /api/recommendations/candidates/:jobId – Gợi ý ứng viên cho HR
router.get('/candidates/:jobId',
  authenticate, authorize('recruiter', 'admin'),
  [param('jobId').isUUID()],
  validate,
  async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit, 10);
      const safeLimit = Number.isInteger(limit) && limit >= 0 ? limit : 10;
      const result = await recommendService.recommendCandidatesForJob(
        req.params.jobId, safeLimit
      );
      success(res, result.data);
    } catch (err) { next(err); }
  }
);

// GET /api/recommendations/similar-candidates – Ứng viên tương tự
router.get('/similar-candidates', authenticate, authorize('candidate'), async (req, res, next) => {
  try {
    const result = await recommendService.findSimilarCandidates(req.user.candidateId);
    success(res, result);
  } catch (err) { next(err); }
});

module.exports = router;
