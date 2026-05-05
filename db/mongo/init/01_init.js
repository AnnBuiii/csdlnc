// =============================================================
// MongoDB Init Script – Smart Recruitment System
// Collections: candidate_profiles, job_postings, company_reviews
// =============================================================

// Chuyển sang đúng database
db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE || 'srs_mongo');

// ── Collection: candidate_profiles (NV02) ─────────────────────
db.createCollection('candidate_profiles', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['candidateId', 'userId', 'personalInfo'],
      properties: {
        candidateId: { bsonType: 'string' },
        userId:      { bsonType: 'string' },
        personalInfo: {
          bsonType: 'object',
          required: ['fullName'],
          properties: {
            fullName: { bsonType: 'string' },
            email:    { bsonType: 'string' },
            phone:    { bsonType: 'string' },
            location: { bsonType: 'string' }
          }
        },
        skills: {
          bsonType: 'array',
          items: {
            bsonType: 'object',
            required: ['name'],
            properties: {
              name:       { bsonType: 'string' },
              level:      { enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] },
              yearsOfExp: { bsonType: 'int' }
            }
          }
        },
        isPublic:  { bsonType: 'bool' },
        createdAt: { bsonType: 'date' },
        updatedAt: { bsonType: 'date' }
      }
    }
  }
});

// Indexes cho candidate_profiles
db.candidate_profiles.createIndex({ candidateId: 1 }, { unique: true });
db.candidate_profiles.createIndex({ userId: 1 });
db.candidate_profiles.createIndex({ 'personalInfo.location': 1 });
db.candidate_profiles.createIndex({ 'skills.name': 1 });
db.candidate_profiles.createIndex({ 'preferences.expectedSalary.min': 1, 'preferences.expectedSalary.max': 1 });
db.candidate_profiles.createIndex({ 'preferences.preferredLocations': 1 });
db.candidate_profiles.createIndex({ 'preferences.industries': 1 });
db.candidate_profiles.createIndex({ isPublic: 1, updatedAt: -1 });

// Full-text search index (NV04)
db.candidate_profiles.createIndex(
  { 'personalInfo.fullName': 'text', 'summary': 'text', 'skills.name': 'text' },
  { name: 'idx_candidate_fulltext', default_language: 'none' } // 'none' để hỗ trợ tiếng Việt
);

print('[MongoDB] candidate_profiles collection & indexes created');

// ── Collection: job_postings (NV03, NV04) ─────────────────────
db.createCollection('job_postings', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['jobId', 'companyId', 'title', 'status'],
      properties: {
        jobId:     { bsonType: 'string' },
        companyId: { bsonType: 'string' },
        title:     { bsonType: 'string' },
        status:    { enum: ['draft', 'active', 'expired', 'closed'] },
        salary: {
          bsonType: 'object',
          properties: {
            min:          { bsonType: 'int' },
            max:          { bsonType: 'int' },
            currency:     { bsonType: 'string' },
            isNegotiable: { bsonType: 'bool' },
            isPublic:     { bsonType: 'bool' }
          }
        }
      }
    }
  }
});

// Indexes cho job_postings
db.job_postings.createIndex({ jobId: 1 }, { unique: true });
db.job_postings.createIndex({ companyId: 1 });
db.job_postings.createIndex({ status: 1, 'deadline': 1 });
db.job_postings.createIndex({ 'location.city': 1, status: 1 });
db.job_postings.createIndex({ 'salary.min': 1, 'salary.max': 1 });
db.job_postings.createIndex({ 'requirements.skills.name': 1 });
db.job_postings.createIndex({ level: 1, workMode: 1 });

// Compound index tìm kiếm đa tiêu chí (NV04)
db.job_postings.createIndex(
  { 'location.city': 1, status: 1, 'salary.min': 1 },
  { name: 'idx_job_search_compound' }
);

// Full-text search index (NV04)
db.job_postings.createIndex(
  { title: 'text', description: 'text', 'requirements.skills.name': 'text' },
  { name: 'idx_job_fulltext', default_language: 'none' }
);

print('[MongoDB] job_postings collection & indexes created');

// ── Collection: company_reviews (NV09) ────────────────────────
db.createCollection('company_reviews', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['companyId', 'ratings'],
      properties: {
        companyId:    { bsonType: 'string' },
        candidateId:  { bsonType: 'string' },
        isAnonymous:  { bsonType: 'bool' },
        ratings: {
          bsonType: 'object',
          required: ['overall'],
          properties: {
            overall:         { bsonType: 'int', minimum: 1, maximum: 5 },
            culture:         { bsonType: 'int', minimum: 1, maximum: 5 },
            management:      { bsonType: 'int', minimum: 1, maximum: 5 },
            workLifeBalance: { bsonType: 'int', minimum: 1, maximum: 5 },
            salary:          { bsonType: 'int', minimum: 1, maximum: 5 },
            careerGrowth:    { bsonType: 'int', minimum: 1, maximum: 5 }
          }
        },
        title:     { bsonType: 'string' },
        content:   { bsonType: 'string' },
        pros:      { bsonType: 'string' },
        cons:      { bsonType: 'string' },
        advice:    { bsonType: 'string' },
        isApproved: { bsonType: 'bool' }
      }
    }
  }
});

db.company_reviews.createIndex({ companyId: 1, isApproved: 1 });
db.company_reviews.createIndex({ companyId: 1, 'ratings.overall': -1 });
db.company_reviews.createIndex({ candidateId: 1 });
db.company_reviews.createIndex({ createdAt: -1 });

print('[MongoDB] company_reviews collection & indexes created');
print('[MongoDB] Initialization complete!');
