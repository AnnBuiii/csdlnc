const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema({
  jobId:      { type: String, required: true, unique: true, index: true },
  companyId:  { type: String, required: true, index: true },
  companyInfo: {
    name:     String,
    logoUrl:  String,
    industry: String,
    size:     String,
  },
  title:    { type: String, required: true },
  level:    String,
  jobType:  [{ type: String, enum: ['Full-time', 'Part-time', 'Remote', 'Hybrid'] }],
  workMode: { type: String, enum: ['Onsite', 'Remote', 'Hybrid'] },
  location: {
    city:            String,
    district:        String,
    address:         String,
    isRemoteAllowed: Boolean,
  },
  salary: {
    min:          Number,
    max:          Number,
    currency:     { type: String, default: 'VND' },
    isNegotiable: Boolean,
    isPublic:     { type: Boolean, default: true },
  },
  description: String,
  requirements: {
    skills: [{
      name:       String,
      level:      String,
      isRequired: Boolean,
    }],
    yearsOfExperience: {
      min: Number,
      max: Number,
    },
    education:           String,
    languageRequirements: [String],
  },
  benefits:           [String],
  applicationProcess: [String],
  tags:     [String],
  status:   { type: String, enum: ['draft', 'active', 'expired', 'closed'], default: 'active', index: true },
  deadline: Date,
  viewCount:        { type: Number, default: 0 },
  applicationCount: { type: Number, default: 0 },
}, {
  timestamps: true,
  collection: 'job_postings',
});

// Indexes
jobPostingSchema.index(
  { title: 'text', description: 'text', 'requirements.skills.name': 'text' },
  { name: 'job_fulltext' }
);
jobPostingSchema.index({ 'location.city': 1, status: 1, 'salary.min': 1 });
jobPostingSchema.index({ 'requirements.skills.name': 1 });
jobPostingSchema.index({ status: 1, deadline: 1 });
jobPostingSchema.index({ tags: 1 });

module.exports = mongoose.model('JobPosting', jobPostingSchema);
