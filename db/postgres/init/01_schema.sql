-- =============================================================
-- PostgreSQL Init Script – Smart Recruitment System
-- Bảng: users, candidates, companies, job_postings,
--        applications, interviews
-- =============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";   -- Full-text search tiếng Việt

-- ── ENUM TYPES ────────────────────────────────────────────────
CREATE TYPE user_role     AS ENUM ('candidate', 'recruiter', 'admin');
CREATE TYPE job_status    AS ENUM ('draft', 'active', 'expired', 'closed');
CREATE TYPE app_status    AS ENUM ('submitted', 'reviewing', 'interview', 'offered', 'rejected', 'accepted');
CREATE TYPE interview_type   AS ENUM ('online', 'offline', 'phone');
CREATE TYPE interview_status AS ENUM ('scheduled', 'completed', 'cancelled', 'rescheduled');

-- ── BẢNG users ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email        VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),          -- NULL nếu đăng nhập OAuth
    role         user_role NOT NULL DEFAULT 'candidate',
    is_active    BOOLEAN NOT NULL DEFAULT TRUE,
    oauth_provider VARCHAR(50),          -- 'google' | 'linkedin'
    oauth_id     VARCHAR(255),
    last_login   TIMESTAMP,
    created_at   TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email   ON users (email);
CREATE INDEX idx_users_role    ON users (role);
CREATE INDEX idx_users_oauth   ON users (oauth_provider, oauth_id);

-- ── BẢNG candidates ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS candidates (
    id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id          UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    full_name        VARCHAR(200) NOT NULL,
    phone            VARCHAR(20),
    date_of_birth    DATE,
    location         VARCHAR(200),
    avatar_url       TEXT,
    bio              TEXT,
    expected_salary  INTEGER,            -- VND
    years_experience INTEGER NOT NULL DEFAULT 0,
    created_at       TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_candidates_user ON candidates (user_id);
CREATE INDEX idx_candidates_location    ON candidates (location);
CREATE INDEX idx_candidates_salary      ON candidates (expected_salary);

-- ── BẢNG companies ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS companies (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name        VARCHAR(255) NOT NULL,
    industry    VARCHAR(100),
    size        VARCHAR(50),             -- '1-50', '50-200', '200-500', '500+'
    logo_url    TEXT,
    website     VARCHAR(255),
    description TEXT,
    address     TEXT,
    rating      DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_companies_industry ON companies (industry);
CREATE INDEX idx_companies_name     ON companies USING GIN (name gin_trgm_ops);

-- ── BẢNG job_postings ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS job_postings (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id  UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    title       VARCHAR(255) NOT NULL,
    level       VARCHAR(50),             -- Intern/Junior/Senior/Lead/Manager
    job_type    VARCHAR(50),             -- Full-time/Part-time/Contract/Freelance
    work_mode   VARCHAR(50),             -- Onsite/Remote/Hybrid
    location    VARCHAR(200),
    salary_min  INTEGER,
    salary_max  INTEGER,
    currency    VARCHAR(10) NOT NULL DEFAULT 'VND',
    status      job_status NOT NULL DEFAULT 'draft',
    deadline    DATE,
    view_count  INTEGER NOT NULL DEFAULT 0,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_jobs_company    ON job_postings (company_id);
CREATE INDEX idx_jobs_status     ON job_postings (status);
CREATE INDEX idx_jobs_deadline   ON job_postings (deadline) WHERE status = 'active';
CREATE INDEX idx_jobs_salary     ON job_postings (salary_min, salary_max);
CREATE INDEX idx_jobs_location   ON job_postings (location);
CREATE INDEX idx_jobs_title_trgm ON job_postings USING GIN (title gin_trgm_ops);

-- ── BẢNG applications ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS applications (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id UUID NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
    job_id       UUID NOT NULL REFERENCES job_postings(id) ON DELETE CASCADE,
    status       app_status NOT NULL DEFAULT 'submitted',
    cover_letter TEXT,
    resume_url   TEXT,
    applied_at   TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMP NOT NULL DEFAULT NOW(),

    -- Một ứng viên chỉ nộp được 1 lần cho mỗi tin
    CONSTRAINT uq_application UNIQUE (candidate_id, job_id)
);

CREATE INDEX idx_app_candidate ON applications (candidate_id);
CREATE INDEX idx_app_job       ON applications (job_id);
CREATE INDEX idx_app_status    ON applications (status);
CREATE INDEX idx_app_applied   ON applications (applied_at DESC);

-- ── BẢNG interviews ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS interviews (
    id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id   UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    round            INTEGER NOT NULL DEFAULT 1,
    scheduled_at     TIMESTAMP NOT NULL,
    duration_minutes INTEGER NOT NULL DEFAULT 60,
    type             interview_type NOT NULL DEFAULT 'online',
    location_or_link TEXT,
    status           interview_status NOT NULL DEFAULT 'scheduled',
    feedback         TEXT,
    score            SMALLINT CHECK (score BETWEEN 1 AND 10),
    created_at       TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_interview_app       ON interviews (application_id);
CREATE INDEX idx_interview_scheduled ON interviews (scheduled_at);

-- ── MATERIALIZED VIEW: pipeline statistics ────────────────────
-- Dùng cho báo cáo dashboard HR (NV10) – cải thiện query 18x
CREATE MATERIALIZED VIEW mv_pipeline_stats AS
SELECT
    jp.id          AS job_id,
    jp.title,
    jp.company_id,
    a.status,
    COUNT(*)       AS count,
    DATE_TRUNC('day', a.applied_at) AS day
FROM applications a
JOIN job_postings jp ON jp.id = a.job_id
GROUP BY jp.id, jp.title, jp.company_id, a.status, DATE_TRUNC('day', a.applied_at);

CREATE UNIQUE INDEX idx_mv_pipeline ON mv_pipeline_stats (job_id, status, day);

-- ── FUNCTION: auto-update updated_at ──────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_users_updated_at       BEFORE UPDATE ON users        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_candidates_updated_at  BEFORE UPDATE ON candidates   FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_companies_updated_at   BEFORE UPDATE ON companies    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_jobs_updated_at        BEFORE UPDATE ON job_postings FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_apps_updated_at        BEFORE UPDATE ON applications FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_interviews_updated_at  BEFORE UPDATE ON interviews   FOR EACH ROW EXECUTE FUNCTION set_updated_at();
