-- Database Schema Fixes for Smart Recruitment System
-- Apply these changes to make the fixes permanent

-- 1. Add 'withdrawn' to app_status enum
ALTER TYPE app_status ADD VALUE 'withdrawn';

-- 2. Add missing columns to applications table
ALTER TABLE applications ADD COLUMN company_id UUID REFERENCES companies(id);

-- 3. Add application_count to job_postings table
ALTER TABLE job_postings ADD COLUMN application_count INTEGER DEFAULT 0;

-- 4. Create candidate_profiles table (used by application service)
CREATE TABLE IF NOT EXISTS candidate_profiles (
    candidate_id UUID PRIMARY KEY REFERENCES candidates(id) ON DELETE CASCADE,
    summary TEXT,
    skills JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 5. Add missing columns to interviews table
ALTER TABLE interviews ADD COLUMN candidate_id UUID REFERENCES candidates(id);
ALTER TABLE interviews ADD COLUMN job_id UUID REFERENCES job_postings(id);
ALTER TABLE interviews ADD COLUMN company_id UUID REFERENCES companies(id);
ALTER TABLE interviews ADD COLUMN location TEXT;
ALTER TABLE interviews ADD COLUMN meeting_link TEXT;
ALTER TABLE interviews ADD COLUMN interviewer TEXT;
ALTER TABLE interviews ADD COLUMN notes TEXT;

-- 6. Add email column to candidates table (or fix the query to join with users)
ALTER TABLE candidates ADD COLUMN email VARCHAR(255);

-- Add triggers for new tables
CREATE TRIGGER trg_candidate_profiles_updated_at  
    BEFORE UPDATE ON candidate_profiles 
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();