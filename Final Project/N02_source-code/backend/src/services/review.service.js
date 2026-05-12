const CompanyReview = require('../models/review.model');
const { query } = require('../config/postgres');
const { parsePagination } = require('../utils/pagination');

class ReviewService {
  // ── NV09: Tạo đánh giá công ty ───────────────────────────────
  async createReview(candidateId, companyId, data) {
    const { ratings, title, pros, cons, advice, interviewExperience, isAnonymous } = data;

    const review = await CompanyReview.create({
      companyId,
      candidateId,
      isAnonymous: isAnonymous !== undefined ? isAnonymous : true,
      ratings,
      title,
      pros,
      cons,
      advice,
      interviewExperience,
      isApproved: false,
      isVerified: false,
    });

    return review;
  }

  // ── NV09: Lấy đánh giá của công ty (public, đã duyệt) ─────────
  async getCompanyReviews(companyId, paginationQuery) {
    const { page, limit, offset } = parsePagination(paginationQuery);

    const [reviews, total] = await Promise.all([
      CompanyReview.find({ companyId, isApproved: true })
        .sort({ 'ratings.overall': -1, createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .lean(),
      CompanyReview.countDocuments({ companyId, isApproved: true }),
    ]);

    const avgRatings = await CompanyReview.aggregate([
      { $match: { companyId, isApproved: true } },
      {
        $group: {
          _id: null,
          overall:         { $avg: '$ratings.overall' },
          workLifeBalance: { $avg: '$ratings.workLifeBalance' },
          salary:          { $avg: '$ratings.salary' },
          management:      { $avg: '$ratings.management' },
          careerGrowth:    { $avg: '$ratings.careerGrowth' },
          culture:         { $avg: '$ratings.culture' },
          count:           { $sum: 1 },
        },
      },
    ]);

    return {
      data: {
        reviews:    reviews.map(r => r.isAnonymous ? { ...r, candidateId: undefined } : r),
        avgRatings: avgRatings[0] || null,
      },
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  // ── NV09: Phê duyệt / từ chối đánh giá (admin) ──────────────
  async approveReview(reviewId, approved) {
    const review = await CompanyReview.findByIdAndUpdate(
      reviewId,
      { $set: { isApproved: approved } },
      { new: true }
    );
    if (!review) {
      const err = new Error('Đánh giá không tồn tại.');
      err.statusCode = 404; throw err;
    }
    return review;
  }
}

module.exports = new ReviewService();