const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  level:     { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] },
  yearsOfExp: { type: Number, default: 0 },
}, { _id: false });

const experienceSchema = new mongoose.Schema({
  company:     String,
  role:        String,
  startDate:   String,
  endDate:     String,
  isCurrent:   { type: Boolean, default: false },
  description: String,
  achievements: [String],
}, { _id: true });

const educationSchema = new mongoose.Schema({
  school:    String,
  degree:    String,
  major:     String,
  gpa:       Number,
  startYear: Number,
  endYear:   Number,
}, { _id: false });

const certSchema = new mongoose.Schema({
  name:          String,
  issuer:        String,
  issueDate:     String,
  expiryDate:    String,
  credentialUrl: String,
}, { _id: false });

const candidateProfileSchema = new mongoose.Schema({
  candidateId:  { type: String, required: true, unique: true, index: true },
  userId:       { type: String, required: true, index: true },
  personalInfo: {
    fullName:  { type: String, required: true },
    email:     String,
    phone:     String,
    location:  String,
    avatarUrl: String,
  },
  summary:              String,
  professionalSummary:  String,
  skills:               [skillSchema],
  experience:     [experienceSchema],
  education:      [educationSchema],
  certifications: [certSchema],
  languages: [{
    language: String,
    level:    String,
  }],
  portfolio: [{
    title:       String,
    url:         String,
    description: String,
  }],
  preferences: {
    expectedSalary: {
      min:      Number,
      max:      Number,
      currency: { type: String, default: 'VND' },
    },
    jobTypes:           [String],
    preferredLocations: [String],
    industries:         [String],
  },
  resumeUrl:    String,
  isPublic:     { type: Boolean, default: true },
  lastViewedAt: Date,
  viewedCount:  { type: Number, default: 0 },
}, {
  timestamps: true,
  collection: 'candidate_profiles',
});

// Full-text search index
candidateProfileSchema.index(
  { 'personalInfo.fullName': 'text', summary: 'text', 'skills.name': 'text' },
  { name: 'candidate_fulltext' }
);
candidateProfileSchema.index({ 'personalInfo.location': 1 });
candidateProfileSchema.index({ 'skills.name': 1 });
candidateProfileSchema.index({ isPublic: 1, updatedAt: -1 });

module.exports = mongoose.model('CandidateProfile', candidateProfileSchema);
