# Report: Backend Implementation vs. Yeu Cau Nghiep Vu

## Summary

| NV | Name | Status | Satis. |
|---|---|---|---|
| NV01 | Quan ly Tai khoan nguoi dung | OAuth + device history missing | 75% |
| NV02 | Quan ly Ho so Ung vien | Resume upload unverified | 90% |
| NV03 | Dang va Quan ly Tin tuyen dung | Deadline auto-check missing | 85% |
| NV04 | Tim kiem va Loc Cong viec/Ung vien | Fuzzy + search history gap | 75% |
| NV05 | Ung tuyen va Quan ly Pipeline | Full implementation | 95% |
| NV06 | Goi y thong minh (AI Matching) | Social scoring gap | 85% |
| NV07 | Len lich Phong van | Double-booking guard gap | 80% |
| NV08 | Thong bao va Tin nhan | Email/SMS + preferences missing | 50% |
| NV09 | Danh gia va Nhan xet | Recruiter private notes missing | 75% |
| NV10 | Bao cao va Thong ke | Full implementation | 90% |

---

## NV01 – Quan ly Tai khoan nguoi dung (PostgreSQL + Redis)

### Yeu cau
- Dang ky/dang nhap bang email/mat khau hoac OAuth (Google, LinkedIn)
- Luu phien dang nhap, lich su truy cap, thiet bi dang nhap
- Role-based: candidate, recruiter, admin

### Trien khai
- `auth.service.js`: registerCandidate, registerRecruiter, login, logout, refresh
- `auth.routes.js`: POST /register/candidate, /register/recruiter, /login, /logout, /refresh, GET /me
- PostgreSQL `users` table voi role enum (candidate, recruiter, admin)
- bcrypt hash (12 rounds) + JWT access token + Redis session (TTL 1h) + refresh token (TTL 7d)
- `auth.middleware.js`: verify JWT, check Redis session, role-based authorization

### Gap
- **OAuth (Google, LinkedIn)**: Khong co endpoint OAuth, khong co OAuth provider trong schema
- **Device tracking**: `login()` nhan `deviceInfo` nhung chi luu vao Redis session (khong persist vao DB)
- **Lich su truy cap**: Khong co bang login_history

### Khuyen nghi
- Them OAuth strategy (passport-google-oauth20, passport-linkedin-oauth2)
- Them bang `login_history` (user_id, ip, device, login_at) trong PostgreSQL

---

## NV02 – Quan ly Ho so Ung vien (MongoDB)

### Yeu cau
- Profile linh hoat: personalInfo, skills, experience, education, certifications, languages, portfolio, preferences
- Upload PDF hoac dien truc tiep
- Public/private toggle

### Trien khai
- `candidate.service.js`: getProfile, upsertProfile, addExperience, addSkill
- `candidate.routes.js`: GET /profile, PUT /profile, POST /profile/experience, POST /profile/skills
- MongoDB `CandidateProfile` voi full schema: personalInfo, summary, skills[], experience[], education[], certifications[], languages[], portfolio[], preferences, resumeUrl, isPublic
- Neo4j sync: `_syncProfileToNeo4j` tao Candidate node + HAS_SKILL relationships
- Search candidates: text search, skill filter, location filter voi pagination

### Gap
- **Resume upload PDF**: `multer` trong package.json, nhung khong thay endpoint upload resume trong routes (chi co resumeUrl string)
- **isPublic toggle**: Co trong schema, nhung searchCandidates chua filter `isPublic: true`

### Khuyen nghi
- Them route POST /profile/resume voi multer upload
- Them filter `isPublic: true` trong searchCandidates

---

## NV03 – Dang va Quan ly Tin tuyen dung (MongoDB + PostgreSQL)

### Yeu cau
- Title, description, skills, salary, location, jobType, workMode, deadline
- Status: draft, active, paused, closed, expired
- View count, application count
- Embedded company info

### Trien khai
- `job.service.js`: createJob, updateJobStatus, searchJobs, getJobDetail, getCompanyJobs
- `job.routes.js`: POST /, GET /, GET /:id, PATCH /:id/status, GET /company/mine
- PostgreSQL `job_postings`: core metadata + counts
- MongoDB `JobPosting`: rich document voi requirements, benefits, companyInfo, applicationProcess, tags
- Neo4j sync: Job node + REQUIRES relationships
- Redis cache cho search (60s) va job detail (120s)
- Cassandra logging cho view events

### Gap
- **Auto-expired status**: Khong co cron job tu dong chuyen active -> expired khi qua deadline
- **applicationProcess**: Co trong schema nhung chua thay duoc dung trong API response

### Khuyen nghi
- Them cron job (node-cron) check deadline hang ngay
- Them applicationProcess vao job detail response

---

## NV04 – Tim kiem va Loc Cong viec/Ung vien (MongoDB)

### Yeu cau
- Full-text search, fuzzy search, loc da tieu chi
- Lich su tim kiem
- Ho tro tieng Viet + tieng Anh

### Trien khai
- `job.service.js` searchJobs: $text search tren title/description/tags, filter location/level/workMode/jobType/salary/skills, Redis cache 60s
- `candidate.service.js` searchCandidates: $text search tren fullName/summary/skills, filter location/skills
- MongoDB text index tren job_postings va candidate_profiles

### Gap
- **Fuzzy search**: Khong co (chi co exact text match)
- **Lich su tim kiem**: Cassandra co `search_history` table nhung khong thay API ghi lai search query
- **Tieng Viet**: MongoDB text index khong co Vietnamese analyzer

### Khuyen nghi
- Them Elasticsearch hoac MongoDB Atlas Search cho fuzzy + tieng Viet
- Them middleware/service ghi search query vao Cassandra `search_history`

---

## NV05 – Ung tuyen va Quan ly Pipeline (PostgreSQL)

### Yeu cau
- Nop don voi cover letter, resume
- Pipeline: submitted -> reviewing -> interview -> offer -> rejected/hired
- UNIQUE constraint (candidate_id, job_id)
- Thong ke pipeline

### Trien khai
- `application.service.js`: apply, getCandidateApplications, getApplicationsByJob, getPipelineStats, updateStatus
- `application.routes.js`: POST /, GET /mine, GET /job/:jobId, GET /job/:jobId/pipeline, PATCH /:id/status
- PostgreSQL `applications`: UNIQUE constraint (candidate_id, job_id), status enum day du
- Transaction: apply -> check duplicate -> insert application -> increment job count
- Cassandra log + Neo4j APPLIED_TO relationship
- Pipeline stats: GROUP BY status voi count

### Gap
- **Hired status**: Co trong enum nhung chua co endpoint/process chuyen status sang hired

### Khuyen nghi
- Them endpoint /applications/:id/hire hoac mo rong updateStatus cho phep hired

---

## NV06 – Goi y thong minh (Neo4j)

### Yeu cau
- Job recommendation cho candidate
- Candidate recommendation cho job
- Collaborative filtering (ung vien tuong tu)
- Graph: Candidate-Skill-Job-Company-Industry

### Trien khai
- `recommend.service.js`: recommendJobsForCandidate, recommendCandidatesForJob, findSimilarCandidates, relatedJobs
- `recommend.routes.js`: GET /jobs, GET /candidates/:jobId, GET /similar-candidates
- Neo4j Cypher queries: HAS_SKILL + REQUIRES matching, rank by matched skill count
- Redis cache 5 phut
- MongoDB lookup cho full documents

### Gap
- **SIMILAR_TO relationship**: Khong co pre-computed SIMILAR_TO edges giua candidates
- **Social scoring**: Khong co query "jobs qua ung vien tuong tu da ung tuyen thanh cong"
- **Jaccard similarity**: Khong tinh toan Jaccard, chi dem so skill chung

### Khuyen nghi
- Them batch job tinh Jaccard similarity va tao SIMILAR_TO relationships
- Them social recommendation query (2-hop qua similar candidates)

---

## NV07 – Len lich Phong van (PostgreSQL)

### Yeu cau
- Loai: online, offline, phone
- Multiple rounds
- Xac nhan, de xuat doi lich
- Calendar integration, email/SMS reminder
- ACID tranh trung lich

### Trien khai
- `interview.service.js`: scheduleInterview, getInterviewsByCompany, getCandidateInterviews, updateResult, reschedule
- `interview.routes.js`: POST /, GET /company, GET /mine, PATCH /:id/result, PATCH /:id/reschedule
- PostgreSQL `interviews`: round, type, scheduled_at, duration, location_or_link, status, feedback, score
- Transaction: scheduleInterview -> check app thuoc ve company -> insert interview -> update app status interview
- Reschedule: update scheduled_at + append reason to notes

### Gap
- **Tranh trung lich**: Khong co check trung lich (same candidate + same time)
- **Calendar integration**: Khong co (Google Calendar, Outlook)
- **Email/SMS reminder**: Khong co (chi co notification Redis don gian)
- **Candidate confirm**: Khong co endpoint candidate xac nhan/tu choi lich

### Khuyen nghi
- Them constraint/trigger check trung lich trong PostgreSQL
- Them nodemailer integration cho email reminders
- Them endpoint PATCH /:id/confirm cho candidate

---

## NV08 – Thong bao va Tin nhan (Redis)

### Yeu cau
- Realtime + email notifications
- WebSocket
- Chat noi bo
- Session TTL, OTP, rate limiting

### Trien khai
- `notification.service.js`: getAll, getUnreadCount, markAllRead
- `notification.routes.js`: GET /, GET /count, DELETE /
- Redis: `notifications:{userId}` list, `notifications:unread:{userId}` counter
- `config/socket.js`: SocketIO server init
- `auth.service.js`: Redis session (1h), OTP (5m), rate limiting (100 req/min)

### Gap
- **Tao notification**: Khong co service/function tao notification (chi co read)
- **Email notifications**: Khong su dung nodemailer (co trong package.json nhung chua thay dung)
- **WebSocket push notifications**: SocketIO init nhung khong thay code emit/push notification
- **Chat noi bo**: Khong co chat endpoints
- **Notification preferences**: Khong co bang/settings preferences

### Khuyen nghi
- Them notification emitter trong services (sau apply, status change, interview schedule)
- Them WebSocket event handlers trong socket.js
- Them chat endpoints hoac tich hop third-party (Twilio, SendBird)

---

## NV09 – Danh gia va Nhan xet (MongoDB)

### Yeu cau
- Danh gia cong ty: work-life balance, salary, management, culture
- Pros/cons/advice
- Anonymous option
- Verified badge
- Recruiter private notes

### Trien khai
- `review.service.js`: createReview, getCompanyReviews, approveReview
- `review.routes.js`: POST /, GET /company/:companyId, PATCH /:id/approve
- MongoDB `CompanyReview`: ratings (overall, workLifeBalance, salary, management, careerGrowth, culture), pros, cons, advice, interviewExperience, isAnonymous, isVerified, isApproved
- Aggregation tinh average ratings 6 dimensions

### Gap
- **Recruiter private notes**: Khong co endpoint/service cho recruiter ghi nhan xet private ve candidate
- **isVerified**: Luon false, khong co logic xac minh (check candidate da ung tuyen vao cong ty)

### Khuyen nghi
- Them collection `recruiter_notes` hoac field trong applications/interviews
- Them logic verify: chi cho phep review neu candidate da co application voi company

---

## NV10 – Bao cao va Thong ke (Cassandra + PostgreSQL)

### Yeu cau
- Dashboard cho HR: so don, ty le chuyen doi, thoi gian tuyen dung TB
- Dashboard cho admin: nguoi dung moi, tin dang, hoat dong
- Event log time-series
- Counter updates

### Trien khai
- `analytics.service.js`: getRecruiterDashboard, getAdminDashboard, getJobStats, getUserActivity
- `analytics.routes.js`: GET /recruiter, GET /admin, GET /activity, GET /jobs/:id
- PostgreSQL: aggregations cho userStats, jobStats, applicationTrend
- Materialized view `mv_pipeline_stats` cho HR dashboard
- Cassandra: `user_activity_log`, `job_daily_stats` (COUNTER), `search_history`
- viewHistory tu Cassandra cho job stats

### Gap
- **Nguon ung vien**: Khong co tracking source (organic, referral, linkedin, etc.)
- **Thoi gian tuyen dung TB**: Co trong materialized view nhung chua chac duoc tinh chinh xac

### Khuyen nghi
- Them `source` field vao applications
- Kiem tra lai logic tinh avg_days_to_close trong mv_pipeline_stats

---

## Danh gia tong the

| Tieu chi | Danh gia |
|---|---|
| Polyglot Persistence architecture | Fully implemented (5 DBs) |
| Core business flows (auth, jobs, apply, interview) | Strong implementation |
| Caching strategy (Redis) | Well implemented |
| Graph recommendations (Neo4j) | Core skill-matching done, social scoring missing |
| Event logging (Cassandra) | Well implemented |
| Real-time features (notifications, chat) | Weak — infrastructure co, business logic thieu |
| OAuth / third-party integrations | Not implemented |
| Email/SMS notifications | Not implemented |
| Fuzzy search / Vietnamese support | Not implemented |
| Admin moderation (review approval) | Implemented |

### Top 5 khoang trong quan trong
1. **NV08 Notifications**: Thieu hoan toan logic tao notification, email push, chat
2. **NV01 OAuth**: OAuth chua co, anh huong dang nhap UX
3. **NV07 Interview**: Thieu guard trung lich, email reminder, calendar
4. **NV04 Search**: Thieu fuzzy search, Vietnamese analyzer, search history logging
5. **NV06 AI**: Thieu SIMILAR_TO edges, social scoring, Jaccard chinh xac
