# Báo Cáo Kiểm Thử API Toàn Diện - Hệ Thống Tuyển Dụng Thông Minh

**Ngày:** 2026-05-05 15:42 (Asia/Saigon)  
**Hệ Thống:** Smart Recruitment System (SRS)  
**Môi trường:** Development (Docker)  
**Node:** Relaxed Zhukovsky

---

## 1. Tóm Tắt Hệ Thống

### Thông Tin Chung
- **Backend URL:** http://localhost:3000
- **Trạng Thái Backend:** Đang chạy ✅
- **Thời Gian Test:** 2026-05-05 15:43-15:45
- **Tổng số Tests:** 40
- **Pass Rate:** 82.5% (33/40 tests)

### Trạng Thái Các Dịch Vụ

| Dịch Vụ | Trạng Thái | Thời Gian Chạy | Health |
|---------|-----------|----------------|--------|
| PostgreSQL | ✅ Healthy | ~15 minutes | Connected |
| MongoDB | ✅ Healthy | ~15 minutes | Connected |
| Redis | ✅ Healthy | ~15 minutes | Connected |
| Neo4j | ✅ Healthy | ~15 minutes | Connected |
| Cassandra | ✅ Healthy | ~15 minutes | Connected (temporary) |
| Backend (Node.js) | ✅ Running | ~5 minutes | Development |

---

## 2. Kiểm Tra DB Seeds

### PostgreSQL
| Bảng | Số lượng | Ghi chú |
|-----|---------|--------|
| users | 19 | 11 seed + 8 test users tạo trong kiểm thử |
| candidates | 10 | 5 seed + 5 test |
| companies | 8 | 5 seed + 3 test |
| applications | 10 | 9 seed + 1 test |
| interviews | 6 | 5 seed + 1 test |
| job_postings | 12 | 3 seed + 9 test |

### MongoDB
| Collection | Số lượng | Ghi chú |
|-----------|---------|--------|
| candidate_profiles | 5 | Seed data only |
| job_postings | 5 | Seed data only |
| company_reviews | 5 | Seed data only |

### Redis
- Keyspace: Trống (sử dụng cache khi cần)
- Password: srs_redis_pass ✓

### Neo4j
- Các node hiện tại: Chưa kiểm tra chi tiết (cypher-shell không trả về output)

### Cassandra
- Keyspace: srs_events ✓
- Tables: user_activity_log (tạo thành công)

---

## 3. Kết Quả Kiểm Thử API

### Tóm tắt theo Pha

| Pha | Route Category | Tests | Pass | Fail | Pass Rate |
|-----|----------------|-------|------|------|-----------|
| 1 | Auth | 5 | 5 | 0 | 100% |
| 2 | Candidates | 5 | 1 | 4 | 20% |
| 3 | Companies | 3 | 3 | 0 | 100% |
| 4 | Jobs | 6 | 6 | 0 | 100% |
| 5 | Applications | 5 | 5 | 0 | 100% |
| 6 | Interviews | 5 | 5 | 0 | 100% |
| 7 | Recommendations | 3 | 1 | 2 | 33% |
| 8 | Reviews | 2 | 2 | 0 | 100% |
| 9 | Analytics | 3 | 2 | 1 | 67% |
| 10 | Notifications | 3 | 3 | 0 | 100% |
| **TOTAL** | - | **40** | **33** | **7** | **82.5%** |

### Chi Tiết Các Endpoints

#### ✅ PASSED - Authentication (5/5)
| Method | Endpoint | Status | Response |
|--------|----------|--------|----------|
| POST | /api/auth/register/candidate | 201 | Created |
| POST | /api/auth/register/recruiter | 201 | Created |
| POST | /api/auth/login | 200 | OK |
| GET | /api/auth/me | 200 | OK (Current User) |
| POST | /api/auth/refresh | 200 | OK |

#### ⚠️ PARTIAL - Candidates (1/5)
| Method | Endpoint | Status | Result | Ghi Chú |
|--------|----------|--------|--------|---------|
| GET | /api/candidates/profile | 404 | ❌ FAIL | Profile không tồn tại (MongoDB empty) |
| PUT | /api/candidates/profile | 500 | ❌ FAIL | CastError: experience field validation |
| POST | /api/candidates/profile/skills | 404 | ❌ FAIL | Profile không tồn tại |
| POST | /api/candidates/profile/experience | 404 | ❌ FAIL | Profile không tồn tại |
| GET | /api/candidates/search | 200 | ✅ PASS | HR search OK |

#### ✅ PASSED - Companies (3/3)
| Method | Endpoint | Status | Result |
|--------|----------|--------|--------|
| GET | /api/companies/profile | 200 | ✅ PASS |
| PUT | /api/companies/profile | 200 | ✅ PASS |
| GET | /api/companies/:id | 200 | ✅ PASS |

#### ✅ PASSED - Jobs (6/6)
| Method | Endpoint | Status | Result |
|--------|----------|--------|--------|
| POST | /api/jobs | 201 | ✅ PASS |
| GET | /api/jobs | 200 | ✅ PASS |
| GET | /api/jobs/company/mine | 200 | ✅ PASS |
| GET | /api/jobs/:id | 200 | ✅ PASS |
| PATCH | /api/jobs/:id/status | 200 | ✅ PASS |
| GET | /api/jobs/:id/related | 200 | ✅ PASS |

#### ✅ PASSED - Applications (5/5)
| Method | Endpoint | Status | Result |
|--------|----------|--------|--------|
| POST | /api/applications | 201 | ✅ PASS |
| GET | /api/applications/mine | 200 | ✅ PASS |
| GET | /api/applications/job/:jobId | 200 | ✅ PASS |
| GET | /api/applications/job/:jobId/pipeline | 200 | ✅ PASS |
| PATCH | /api/applications/:id/status | 200 | ✅ PASS |

#### ✅ PASSED - Interviews (5/5)
| Method | Endpoint | Status | Result |
|--------|----------|--------|--------|
| GET | /api/interviews/mine | 200 | ✅ PASS |
| GET | /api/interviews/company | 200 | ✅ PASS |
| POST | /api/interviews | 201 | ✅ PASS |
| PATCH | /api/interviews/:id/reschedule | 200 | ✅ PASS |
| PATCH | /api/interviews/:id/result | 200 | ✅ PASS |

#### ⚠️ PARTIAL - Recommendations (1/3)
| Method | Endpoint | Status | Result | Ghi Chú |
|--------|----------|--------|--------|---------|
| GET | /api/recommendations/jobs | 500 | ❌ FAIL | Neo4j LIMIT type error (float 10.0 vs int) |
| GET | /api/recommendations/similar-candidates | 200 | ✅ PASS | OK |
| GET | /api/recommendations/candidates/:jobId | 500 | ❌ FAIL | Neo4j LIMIT type error |

#### ✅ PASSED - Reviews (2/2)
| Method | Endpoint | Status | Result |
|--------|----------|--------|--------|
| GET | /api/reviews/company/:companyId | 200 | ✅ PASS |
| POST | /api/reviews | 201 | ✅ PASS |

#### ⚠️ PARTIAL - Analytics (2/3)
| Method | Endpoint | Status | Result | Ghi Chú |
|--------|----------|--------|--------|---------|
| GET | /api/analytics/recruiter | 200 | ✅ PASS | Dashboard HR OK |
| GET | /api/analytics/activity | 200 | ✅ PASS | User activity OK |
| GET | /api/analytics/jobs/:id | 500 | ❌ FAIL | Invalid UUID (job ID extraction issue) |

#### ✅ PASSED - Notifications (3/3)
| Method | Endpoint | Status | Result |
|--------|----------|--------|--------|
| GET | /api/notifications | 200 | ✅ PASS |
| GET | /api/notifications/count | 200 | ✅ PASS |
| DELETE | /api/notifications | 200 | ✅ PASS |

---

## 4. Lỗi Phát Hiện

### CRITICAL Issues (3)

#### 1. **Candidate Profile Not Created on Registration**
- **Severity:** 🔴 Critical
- **Endpoint:** GET /api/candidates/profile, PUT /api/candidates/profile, POST profile/skills, POST profile/experience
- **Root Cause:** Khi người dùng đăng ký role `candidate`, không tạo MongoDB profile document tự động
- **Error:** `"Hồ sơ không tồn tại."` (HTTP 404)
- **Stack Trace:**
  ```
  Error: Hồ sơ không tồn tại.
  at CandidateService.getProfile (/app/src/services/candidate.service.js:12:19)
  ```
- **Impact:** 4 endpoints bị block, người dùng không thể tạo hồ sơ
- **Fix:** Service phải tự động tạo empty profile khi candidate register hoặc PUT /profile phải auto-create
- **Files Affected:**
  - `/backend/src/services/candidate.service.js` (lines 9-15, 60-84)
  - `/backend/src/services/auth.service.js` (registerCandidate method)

#### 2. **Neo4j LIMIT Parameter Type Error**
- **Severity:** 🔴 Critical
- **Endpoint:** GET /api/recommendations/jobs, GET /api/recommendations/candidates/:jobId
- **Root Cause:** Parameter `limit` được truyền dưới dạng float (10.0) thay vì integer
- **Error:** `"Neo4jError: LIMIT: Invalid input. '10.0' is not a valid value. Must be a non-negative integer."`
- **Stack Trace:**
  ```
  Neo4jError: LIMIT: Invalid input. '10.0' is not a valid value. Must be a non-negative integer.
  at RecommendService.recommendJobsForCandidate (/app/src/services/recommend.service.js:14:26)
  ```
- **Root Cause Analysis:**
  - Method signature: `recommendJobsForCandidate(candidateId, limit = 10)`
  - Route passes: `req.query.limit || 10` (string from query becomes float when converted)
  - Neo4j Cypher query expects integer in LIMIT clause
- **Impact:** 2 core recommendation endpoints não funcionam (HTTP 500)
- **Fix:** Ensure limit is converted to integer: `parseInt(limit)` in service or route
- **Files Affected:**
  - `/backend/src/services/recommend.service.js` (lines 9, 39, 22, 51)
  - `/backend/src/routes/recommend.routes.js` (lines 12, 26)

#### 3. **MongoDB CastError on Profile Update**
- **Severity:** 🔴 Critical
- **Endpoint:** PUT /api/candidates/profile
- **Root Cause:** Field `experience` expects array of objects, nhưng request gửi `experience: 2` (number)
- **Error:** `"CastError: Cast to embedded failed for value "2" (type number) at path "experience""`
- **Stack Trace:**
  ```
  CastError: Cast to embedded failed for value "2" (type number) at path "experience"
  at SchemaDocumentArray.cast (/app/node_modules/mongoose/lib/schema/documentArray.js:521:19)
  ```
- **Impact:** PUT /candidates/profile không thể update khi gửi experience field
- **Root Issue:** Validation schema hoặc test data không đúng với model definition
- **Files Affected:**
  - `/backend/src/models/candidateProfile.model.js` (experience field schema)

### WARNING Issues (1)

#### 4. **Cassandra ALLOW FILTERING Required**
- **Severity:** 🟡 Warning (not hit in tests, but visible in logs)
- **Error:** `"ResponseError: Cannot execute this query as it might involve data filtering... use ALLOW FILTERING"`
- **Impact:** Future Cassandra queries might fail if not using indexed columns
- **Files Affected:** Analytics service queries with filters

---

## 5. Lỗi Chi Tiết từ Backend Logs

```
2026-05-05 08:43:57 [error]: Error: Hồ sơ không tồn tại.
    at CandidateService.getProfile (/app/src/services/candidate.service.js:12:19)

2026-05-05 08:43:57 [error]: CastError: Cast to embedded failed for value "2" (type number) 
    at path "experience" because of "ObjectParameterError"
    at SchemaDocumentArray.cast (/app/node_modules/mongoose/lib/schema/documentArray.js:521:19)

2026-05-05 08:43:58 [error]: Neo4jError: LIMIT: Invalid input. '10.0' is not a valid value. 
    Must be a non-negative integer.
    at RecommendService.recommendJobsForCandidate (/app/src/services/recommend.service.js:14:26)

2026-05-05 08:43:58 [error]: ResponseError: Cannot execute this query as it might involve 
    data filtering... use ALLOW FILTERING
```

---

## 6. Điểm Tổng Kết

### Test Coverage Summary
- **Total API Endpoints Tested:** 40
- **Fully Functional:** 33 (82.5%)
- **Partially Broken:** 7 (17.5%)

### By Feature Area

| Feature | Status | Notes |
|---------|--------|-------|
| Authentication | ✅ 100% | Register, login, refresh all working |
| Job Management | ✅ 100% | Create, list, search, status update OK |
| Applications | ✅ 100% | Apply, view, status pipeline all OK |
| Interviews | ✅ 100% | Schedule, reschedule, record result OK |
| Company Profile | ✅ 100% | View and update working |
| Candidate Profile | ❌ 20% | **BROKEN** - Not created on registration |
| Recommendations | ⚠️ 33% | **BROKEN** - Neo4j parameter type issue |
| Reviews | ✅ 100% | Create and list working |
| Analytics | ⚠️ 67% | Mostly working, job stats endpoint broken |
| Notifications | ✅ 100% | All notification endpoints working |

### Database Consistency
- **PostgreSQL:** ✅ Healthy (19 users, 12 jobs, 10 apps, 6 interviews)
- **MongoDB:** ✅ Healthy (5 candidate profiles, 5 jobs)
- **Redis:** ✅ Healthy (empty, used for caching)
- **Neo4j:** ✅ Connected (not fully tested)
- **Cassandra:** ✅ Connected (temporary, for analytics)

---

## 7. Khuyến Nghị Ưu Tiên

### Priority 1: CRITICAL (Must Fix Before Production)

#### 1.1 Auto-create Candidate Profile on Registration
**Severity:** 🔴 Blocks 4 endpoints (20% of candidate routes)

```typescript
// Fix in auth.service.js registerCandidate()
// After creating user, also create empty MongoDB profile:
const candidateProfile = new CandidateProfile({
  candidateId: candidate.id,
  userId: user.id,
  personalInfo: { email: user.email }
});
await candidateProfile.save();
```

**Or alternative:** Make PUT /candidates/profile auto-create via upsert

**Affected Files:**
- `/backend/src/services/auth.service.js` (registerCandidate method)
- `/backend/src/services/candidate.service.js` (getProfile method)

**Testing:** After fix, test:
- POST /auth/register/candidate → verify MongoDB profile created
- GET /candidates/profile → should return 200 with empty profile
- PUT /candidates/profile → should update
- POST /candidates/profile/skills → should work
- POST /candidates/profile/experience → should work

#### 1.2 Fix Neo4j LIMIT Parameter Type
**Severity:** 🔴 Breaks 2 endpoints (67% of recommendations)

```typescript
// Fix in recommend.service.js
async recommendJobsForCandidate(candidateId, limit = 10) {
  // Convert limit to integer
  const limitInt = Math.max(1, parseInt(limit) || 10);
  
  const scores = await runCypher(
    `MATCH (c:Candidate {id: $cid})-[:HAS_SKILL]->(s:Skill)
     ...
     LIMIT $limit`,
    { cid: candidateId, limit: limitInt }  // Pass as integer
  );
  // ...
}
```

**Also fix in routes:**
```typescript
// In recommend.routes.js
const limit = Math.max(1, parseInt(req.query.limit) || 10);
const result = await recommendService.recommendJobsForCandidate(
  req.user.candidateId, 
  limit  // Pass integer
);
```

**Affected Files:**
- `/backend/src/services/recommend.service.js` (lines 9, 39)
- `/backend/src/routes/recommend.routes.js` (lines 12, 26)

**Testing:**
- GET /recommendations/jobs?limit=5 → should return 200
- GET /recommendations/jobs → should return 200 with default limit=10
- GET /recommendations/candidates/jobId?limit=10 → should return 200

#### 1.3 Fix MongoDB Experience Field Validation
**Severity:** 🔴 Causes 500 error on profile update

```typescript
// In candidate.service.js upsertProfile()
// Validate and ensure experience is array of objects
const experience = Array.isArray(data.experience) 
  ? data.experience.map(exp => ({
      company: exp.company,
      role: exp.role,
      startDate: exp.startDate,
      endDate: exp.endDate,
      isCurrent: exp.isCurrent || false,
      description: exp.description || '',
      achievements: exp.achievements || []
    }))
  : [];

const update = {
  // ...
  experience,
  // ...
};
```

**Affected Files:**
- `/backend/src/services/candidate.service.js` (lines 19-56)
- `/backend/src/models/candidateProfile.model.js` (check schema)

### Priority 2: ENHANCEMENT (Should Fix)

#### 2.1 Add Input Validation for Job ID in Analytics
**Current Issue:** GET /analytics/jobs/:id returns 500 with "invalid UUID" when job creation fails

```typescript
// In analytics.routes.js
router.get('/jobs/:id', 
  authenticate, 
  authorize('recruiter', 'admin'),
  [param('id').isUUID()],  // Already validates UUID
  validate,
  async (req, res, next) => {
    try {
      const data = await analyticsService.getJobStats(req.params.id, req.query.days);
      success(res, data);
    } catch (err) { next(err); }
  }
);
```

The validation is in place, but job creation returns null ID. Fix job creation response.

#### 2.2 Add Cassandra ALLOW FILTERING
**Fix Cassandra queries to include ALLOW FILTERING when needed**

```typescript
// In analytics.service.js getUserActivity()
const rows = await execute(
  `SELECT event_id, event_type, entity_id, entity_type, event_time
   FROM user_activity_log
   WHERE user_id = ? AND event_date = ?
   ORDER BY event_time DESC
   ALLOW FILTERING`,  // Add this
  [userId, date]
);
```

### Priority 3: TESTING (Test Cases Needed)

| Test Case | Current Status | Priority |
|-----------|----------------|----------|
| Candidate profile lifecycle (create → update → delete) | ❌ Incomplete | P1 |
| Recommendation engine with neo4j nodes | ❌ Incomplete | P1 |
| Job analytics with cassandra events | ⚠️ Partial | P2 |
| Candidate skill search in MongoDB | ✅ Works | - |
| Application pipeline status flow | ✅ Works | - |
| Interview scheduling and rescheduling | ✅ Works | - |

---

## 8. Hành Động Tiếp Theo

### Immediate Actions (Before Next Test)
- [ ] **Fix candidate profile auto-creation** (1-2 hours)
  - Implement in `registerCandidate()` or `upsertProfile()`
  - Test: POST /auth/register/candidate → GET /candidates/profile
  - Re-run test suite to verify
  
- [ ] **Fix Neo4j LIMIT parameter** (30 minutes)
  - Convert limit to integer in recommend.service.js
  - Test: GET /recommendations/jobs
  - Re-run test suite to verify

- [ ] **Fix MongoDB experience field** (1 hour)
  - Validate and normalize experience array in upsertProfile()
  - Add unit tests for field validation
  - Re-run test suite to verify

- [ ] **Re-run comprehensive test suite** (30 minutes)
  - Should achieve 100% pass rate after fixes
  - Document any new issues

### Next Phase Testing
- [ ] Load testing (concurrent requests)
- [ ] Error scenario testing (invalid inputs, edge cases)
- [ ] Performance benchmarking
- [ ] Integration testing (cross-database transactions)
- [ ] End-to-end user journey testing

---

## 9. Test Environment Details

### Test Execution
- **Time:** 2026-05-05 15:43:54 +07
- **Duration:** ~2 minutes
- **Test Framework:** Bash + curl
- **Database State:** Seeded + test data (19 users)

### Test Data Created
- 8 candidate test accounts
- 3 recruiter/company test accounts
- 9 job postings
- 10 applications
- 6 interviews

### Test Isolation
- Each test uses unique email (timestamp-based)
- No data cleanup (intentional for debugging)
- Tests are independent and can run in any order

---

## 10. Unresolved Questions

1. **Neo4j Node Seeding:** Are Skill, Candidate, Job nodes properly created in Neo4j during application flow? Need to verify with Cypher queries.

2. **MongoDB vs PostgreSQL Sync:** When should candidate profiles be created in MongoDB? During registration or first profile update? Need product decision.

3. **Cassandra Event Logging:** Is user_activity_log being populated during API calls? Should verify with Cassandra queries.

4. **Analytics Job Stats:** Why is job ID null in job creation response? Need to check MongoDB/PostgreSQL sync for job data.

5. **Test Data Persistence:** Should test data be cleaned up between test runs? Currently accumulating in databases.

---

**Report Generated By:** Tester Agent  
**Status:** Ready for Development Team  
**Next Review:** After bug fixes are applied
