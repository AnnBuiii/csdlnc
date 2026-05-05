const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  companyId:   { type: String, required: true, index: true },
  candidateId: { type: String },
  isAnonymous: { type: Boolean, default: true },
  ratings: {
    overall:         { type: Number, required: true, min: 1, max: 5 },
    workLifeBalance: { type: Number, min: 1, max: 5 },
    salary:          { type: Number, min: 1, max: 5 },
    management:      { type: Number, min: 1, max: 5 },
    careerGrowth:    { type: Number, min: 1, max: 5 },
    culture:         { type: Number, min: 1, max: 5 },
  },
  title:   String,
  content: String,
  pros:    String,
  cons:    String,
  advice:  String,
  interviewExperience: {
    difficulty:         String,
    duration:           String,
    processDescription: String,
  },
  isApproved: { type: Boolean, default: false, index: true },
  isVerified: { type: Boolean, default: false },
}, {
  timestamps: true,
  collection: 'company_reviews',
});

reviewSchema.index({ companyId: 1, isApproved: 1 });
reviewSchema.index({ 'ratings.overall': -1 });

module.exports = mongoose.model('CompanyReview', reviewSchema);
