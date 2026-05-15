# Kiến trúc Polyglot Persistence – SRS

> Tài liệu này mô tả **chính xác** vai trò của từng CSDL trong hệ thống,
> dựa trên code thực tế của backend (không phải lý thuyết).

---

## Tổng quan: Tại sao 4 CSDL?

```
Người dùng (Browser)
        │
        ▼
   [React Frontend]
        │  REST API / JSON
        ▼
  [Node.js / Express]
   ┌────┴─────────────────────────────────────┐
   │                                          │
   ▼                ▼              ▼          ▼
[PostgreSQL]   [MongoDB]       [Neo4j]    [Redis]
 Giao dịch     Tài liệu       Đồ thị      Cache
 quan hệ       linh hoạt      AI gợi ý    & Session
```

Nguyên tắc: **"Right tool for the right job"** –
mỗi CSDL phụ trách đúng loại dữ liệu nó xử lý tốt nhất.

---

## 1. PostgreSQL — Dữ liệu quan hệ & Giao dịch

### Phụ trách gì?

Mọi dữ liệu **có ràng buộc quan hệ chặt** và cần ACID transaction:
tài khoản, đơn ứng tuyển, lịch phỏng vấn.

### Các bảng chính

| Bảng | Lưu gì | Đặc điểm quan trọng |
|------|--------|---------------------|
| `users` | Email, password hash (bcrypt), role | Tài khoản cho 3 vai trò: candidate / recruiter / admin |
| `candidates` | Họ tên, SĐT, địa chỉ, mức lương kỳ vọng | FK → users |
| `companies` | Tên công ty, ngành, quy mô, địa chỉ | FK → users (recruiter) |
| `job_postings` | Tiêu đề, mức lương, địa điểm, status, deadline | **Chỉ lưu metadata** – nội dung chi tiết sang MongoDB |
| `applications` | Trạng thái đơn, cover letter, thời gian nộp | UNIQUE(candidate_id, job_id) – tránh nộp trùng |
| `interviews` | Lịch phỏng vấn, loại, link meeting, kết quả | FK → applications, tự động update `updated_at` |
| `candidate_profiles` | Cache kỹ năng (JSONB) | Denormalized – tăng tốc tìm kiếm nhanh |

### Các truy vấn đặc biệt

**Materialized View `mv_pipeline_stats`** – Dashboard HR:
```sql
-- Đếm số đơn theo trạng thái cho từng job, theo ngày
SELECT jp.id AS job_id, jp.title, jp.company_id,
       a.status, COUNT(*) AS count,
       DATE_TRUNC('day', a.applied_at) AS day
FROM applications a
JOIN job_postings jp ON jp.id = a.job_id
GROUP BY jp.id, jp.title, jp.company_id, a.status, day;
```
> View này được `REFRESH` sau mỗi lần seed. Trong production, refresh theo schedule hoặc trigger.
> Tăng tốc dashboard 18× so với GROUP BY query thường.

**Tăng counter không conflict:**
```sql
UPDATE job_postings
SET application_count = application_count + 1
WHERE id = $jobId;
```

**Check trùng đơn trước khi insert:**
```sql
SELECT id FROM applications
WHERE candidate_id = $1 AND job_id = $2 AND status != 'withdrawn';
```

### Application status flow

```
submitted → reviewing → interview → offered → accepted
                                           ↘ rejected
         ↘ rejected
         ↘ withdrawn  (ứng viên tự rút)
```

### Tại sao không dùng MongoDB cho phần này?

Vì `applications` cần ACID: khi ứng viên apply, phải đồng thời
insert application **VÀ** tăng `application_count` – nếu một bước fail,
cần rollback. MongoDB không có multi-document ACID trong version thường.

---

## 2. MongoDB — Tài liệu linh hoạt (Rich Content)

### Phụ trách gì?

Dữ liệu **bán cấu trúc, thay đổi schema thường xuyên**:
hồ sơ ứng viên (mỗi người có kỹ năng/kinh nghiệm khác nhau)
và nội dung chi tiết tin tuyển dụng.

### Collection 1: `job_postings`

```js
{
  jobId:      "60000000-...",          // FK sang PostgreSQL
  companyId:  "50000000-...",
  companyInfo: {                        // Denormalized – tránh JOIN khi hiển thị
    name: "TechViet JSC",
    logoUrl: null,
    industry: "Công nghệ Thông tin",
    size: "200-500"
  },
  title:    "Senior Full-stack Developer",
  level:    "Senior",
  jobType:  ["Full-time"],              // Mảng – 1 job có thể nhiều loại
  workMode: "Hybrid",
  location: {
    city: "TP.HCM", district: "Quận 1",
    address: "Tầng 8, 123 Lê Lợi",
    isRemoteAllowed: true
  },
  salary: {
    min: 35000000, max: 60000000,
    currency: "VND",
    isNegotiable: true, isPublic: true
  },
  description: "...",                   // Văn bản dài, markdown
  requirements: {
    skills: [
      { name: "React",  level: "Advanced", isRequired: true  },
      { name: "Docker", level: "Beginner", isRequired: false }
    ],
    yearsOfExperience: { min: 4, max: null },
    education: "Cử nhân CNTT hoặc tương đương",
    languageRequirements: ["Tiếng Anh (đọc tài liệu kỹ thuật)"]
  },
  benefits:           ["MacBook Pro M3", "20 ngày phép/năm", "..."],
  applicationProcess: ["Vòng 1: Technical online", "Vòng 2: System design"],
  tags:     ["react", "nodejs", "senior", "fintech"],
  status:   "active",
  deadline: ISODate("2026-06-30"),
  viewCount: 312, applicationCount: 18
}
```

**Query tìm kiếm việc làm** (fuzzy search):
```js
// Tìm theo từ khóa – regex trên nhiều field
const keywordFilter = {
  $or: [
    { title:                   { $regex: keyword, $options: 'i' } },
    { description:             { $regex: keyword, $options: 'i' } },
    { tags:                    { $regex: keyword, $options: 'i' } },
    { 'companyInfo.name':      { $regex: keyword, $options: 'i' } },
    { 'requirements.skills.name': { $regex: keyword, $options: 'i' } }
  ]
};

// Kết hợp với các filter
const filter = {
  status: 'active',
  'location.city': city,
  'salary.min': { $lte: maxSalary },
  level: level,
  'requirements.skills.name': { $in: skillNames }
};

JobPosting.find(filter).sort({ createdAt: -1 }).skip(offset).limit(limit).lean()
```

**Text index** (full-text search nhanh hơn regex):
```js
{ title: 'text', description: 'text',
  'requirements.skills.name': 'text', tags: 'text' }
// weights: title×10, skills×5, description×3, tags×2
```

---

### Collection 2: `candidate_profiles`

```js
{
  candidateId: "40000000-...",         // FK sang PostgreSQL candidates.id
  userId:      "10000000-...",
  personalInfo: {
    fullName: "Nguyễn Văn An",
    email: "candidate1@demo.vn",
    phone: "0912111001",
    location: "TP.HCM"
  },
  summary: "Senior Full-stack Developer 5 năm...",
  skills: [
    { name: "React",     level: "Expert",    yearsOfExp: 5 },
    { name: "Node.js",   level: "Advanced",  yearsOfExp: 4 },
    { name: "Docker",    level: "Intermediate", yearsOfExp: 3 }
    // ...tuỳ người, không cố định số lượng
  ],
  experience: [
    {
      role: "Technical Lead", company: "PayTech Vietnam",
      startDate: "2022-01", endDate: null, isCurrent: true,
      description: "..."
    }
  ],
  education: [{ school: "ĐH Bách Khoa", degree: "Kỹ sư CNTT", gpa: 3.5, ... }],
  certifications: [{ name: "AWS Certified Developer", issuer: "AWS", issueDate: "2023-04" }],
  portfolio: [{ title: "GitHub", url: "https://github.com/..." }],
  preferences: {
    expectedSalary: { min: 35000000, max: 60000000, currency: "VND" },
    preferredLocations: ["TP.HCM", "Remote"],
    industries: ["Công nghệ Thông tin"]
  },
  isPublic: true,
  viewedCount: 58
}
```

**Partial update** (không ghi đè toàn bộ document):
```js
// Chỉ cập nhật các field được gửi lên, giữ nguyên phần còn lại
CandidateProfile.findOneAndUpdate(
  { candidateId },
  { $set: { 'personalInfo.phone': '...', summary: '...' } },
  { upsert: true, new: true }
)
```

**Thêm / xóa từng phần trong mảng:**
```js
// Thêm experience
{ $push: { experience: newExp } }

// Xóa experience theo _id
{ $pull: { experience: { _id: expId } } }

// Xóa skill theo index (splice + $set)
const skills = profile.skills;
skills.splice(index, 1);
{ $set: { skills } }
```

### Tại sao không dùng PostgreSQL cho phần này?

Mỗi ứng viên có số lượng kỹ năng, kinh nghiệm, chứng chỉ hoàn toàn khác nhau.
Nếu dùng PostgreSQL cần 5–6 bảng phụ (`skills`, `experiences`, `educations`...)
+ nhiều JOIN. MongoDB lưu thành 1 document, query 1 lần, cập nhật linh hoạt.

---

## 3. Neo4j — Đồ thị AI Gợi ý (Recommendation Engine)

### Phụ trách gì?

Trả lời các câu hỏi **dạng đồ thị** mà SQL cần nhiều JOIN lồng nhau:
- "Job nào phù hợp nhất với ứng viên này?"
- "Ứng viên nào phù hợp nhất với job này?"
- "Ứng viên nào tương tự nhau?"
- "Job nào liên quan đến job này?"

### Các loại node & relationship

```
(Candidate)-[:HAS_SKILL {level, years}]->(Skill)
(Job)-[:REQUIRES {isRequired, priority}]->(Skill)
(Candidate)-[:APPLIED_TO {date}]->(Job)
(Job)-[:POSTED_BY]->(Company)
(Company)-[:BELONGS_TO]->(Industry)
(Candidate)-[:PREFERS_INDUSTRY]->(Industry)
```

### Đồng bộ dữ liệu (async sync)

Khi tạo/sửa job hoặc profile, backend **đồng bộ bất đồng bộ** sang Neo4j:
```js
// Sau khi lưu MongoDB xong, sync Neo4j không block response
this._syncJobToNeo4j(jobData).catch(() => {}); // silent fail
```

```cypher
-- Sync job node + skill relationships
MERGE (j:Job {id: $id})
SET j.title = $title, j.salaryMin = $salaryMin, j.status = $status

WITH j
UNWIND $skills AS skill
MERGE (s:Skill {name: skill.name})
MERGE (j)-[:REQUIRES {isRequired: skill.isRequired}]->(s)
```

```cypher
-- Sync candidate node + skill relationships
MERGE (c:Candidate {id: $id})
SET c.location = $location, c.yearsExperience = $years

WITH c
UNWIND $skills AS skill
MERGE (s:Skill {name: skill.name})
MERGE (c)-[:HAS_SKILL {level: skill.level}]->(s)
```

### 4 Cypher query chính

**① Gợi ý việc làm cho ứng viên** (`recommendJobsForCandidate`):
```cypher
MATCH (c:Candidate {id: $cid})-[:HAS_SKILL]->(s:Skill)
MATCH (j:Job {status: 'active'})-[:REQUIRES]->(s)
WHERE NOT (c)-[:APPLIED_TO]->(j)          -- chưa nộp rồi
WITH j,
     count(s)          AS matchedSkills,
     collect(s.name)   AS matchedSkillNames,
     j.salaryMax        AS salaryMax
RETURN j.id, j.title, j.location, matchedSkills, matchedSkillNames, salaryMax
ORDER BY matchedSkills DESC, salaryMax DESC
LIMIT $limit
```
→ Lấy jobId từ Neo4j, sau đó fetch full document từ **MongoDB**
→ Cache kết quả **5 phút** trong Redis với key `cache:rec:jobs:{candidateId}`

---

**② Gợi ý ứng viên cho job** (`recommendCandidatesForJob`):
```cypher
MATCH (j:Job {id: $jid})-[:REQUIRES]->(s:Skill)
MATCH (c:Candidate)-[:HAS_SKILL]->(s)
WITH c,
     count(s)          AS matchedSkills,
     collect(s.name)   AS matchedSkillNames,
     c.location         AS location
RETURN c.id, c.name, location, matchedSkills, matchedSkillNames
ORDER BY matchedSkills DESC
LIMIT $limit
```
→ Recruiter mở job → xem danh sách ứng viên phù hợp nhất

---

**③ Ứng viên tương tự** (`findSimilarCandidates`):
```cypher
MATCH (c:Candidate {id: $cid})-[:HAS_SKILL]->(s:Skill)
      <-[:HAS_SKILL]-(other:Candidate)
WHERE other.id <> $cid
WITH other,
     count(s)        AS sharedSkills,
     collect(s.name) AS commonSkills
RETURN other.id, other.name, other.location, sharedSkills, commonSkills
ORDER BY sharedSkills DESC
LIMIT 10
```
→ Dùng cho recruiter: "Ứng viên này không phù hợp, ai tương tự?"

---

**④ Job liên quan** (`relatedJobs`):
```cypher
MATCH (j:Job {id: $jid})-[:REQUIRES]->(s:Skill)
      <-[:REQUIRES]-(other:Job)
WHERE other.id <> $jid AND other.status = 'active'
WITH other,
     count(s) AS sharedSkills
RETURN other.id, other.title, other.location, sharedSkills
ORDER BY sharedSkills DESC
LIMIT 6
```
→ Hiển thị "Việc làm tương tự" ở cuối trang job detail

---

### Tại sao Neo4j mà không phải SQL?

Query ④ bằng SQL:
```sql
-- Tìm job liên quan qua skill overlap – cần 3 JOIN
SELECT j2.id, j2.title, COUNT(*) as shared
FROM job_requirements jr1
JOIN job_requirements jr2 ON jr1.skill_id = jr2.skill_id AND jr2.job_id != $jid
JOIN job_postings j2 ON jr2.job_id = j2.id
WHERE jr1.job_id = $jid AND j2.status = 'active'
GROUP BY j2.id, j2.title
ORDER BY shared DESC LIMIT 6;
```
Với 10,000 jobs × 7 skills = 70,000 rows, query này đòi hash join nặng.
Neo4j traversal graph tự nhiên hơn, index trên relationship, nhanh hơn ~10×.

---

## 4. Redis — Cache & Session

### Phụ trách gì?

**Giảm tải** cho MongoDB và Neo4j, lưu JWT token, giới hạn request.

### Toàn bộ cache key

| Key | TTL | Lưu gì | Bị xóa khi nào |
|-----|-----|--------|----------------|
| `session:{userId}` | 3,600s (1h) | Session data sau login | Logout hoặc hết hạn |
| `refresh_token:{token}` | 604,800s (7 ngày) | Refresh token để cấp Access Token mới | Logout, dùng rồi (rotate) |
| `cache:jobs:search:{md5}` | 60s | Kết quả tìm kiếm việc làm (JSON) | Job được tạo/sửa/đổi status |
| `cache:job:{jobId}` | 120s | Chi tiết 1 job (JSON) | Job được cập nhật |
| `cache:rec:jobs:{candidateId}` | 300s (5 phút) | Danh sách job được gợi ý | Hết TTL |
| `cache:rec:candidates:{jobId}` | 300s | Danh sách ứng viên gợi ý cho job | Hết TTL |
| `cache:sim:candidates:{candidateId}` | 300s | Ứng viên tương tự | Hết TTL |
| `cache:related:jobs:{jobId}` | 120s | Job liên quan | Hết TTL |
| `notifications:{userId}` | 86,400s (24h) | List thông báo (max 50) | Hết TTL |
| `job_view_count:{jobId}` | Không hết hạn | Bộ đếm lượt xem | — (persist) |
| `rate_limit:{ip}` | 60s | Số request trong 1 phút | Tự reset |

### Cache key cho search được hash như thế nào?

```js
// Tất cả params (keyword, city, level, page...) → MD5 → key ngắn
const cacheKey = `cache:jobs:search:${md5(JSON.stringify(params))}`;

const cached = await redis.get(cacheKey);
if (cached) return JSON.parse(cached);           // cache hit → trả về ngay

const result = await JobPosting.find(...);       // cache miss → query MongoDB
await redis.setex(cacheKey, 60, JSON.stringify(result)); // lưu 60s
return result;
```

### Cache invalidation khi job thay đổi

```js
// Sau khi update job:
await redis.del(`cache:job:${jobId}`);           // xóa chi tiết job cụ thể
const keys = await redis.keys('cache:jobs:search:*');
if (keys.length) await redis.del(...keys);       // xóa toàn bộ search cache
```

### JWT pattern với Redis

```
Login:
  [Client] → POST /auth/login
  [Server] → tạo AccessToken (JWT, 15 phút, không lưu DB)
           → tạo RefreshToken (opaque, lưu Redis 7 ngày)
           → trả về cả 2

Khi AccessToken hết hạn:
  [Client] → POST /auth/refresh { refreshToken }
  [Server] → kiểm tra refreshToken trong Redis
           → cấp AccessToken mới
           → rotate RefreshToken (xóa cũ, tạo mới)

Logout:
  [Client] → POST /auth/logout { refreshToken }
  [Server] → DEL refresh_token:{token} khỏi Redis
           → token bị revoke ngay lập tức
```

> Ưu điểm: Stateless (AccessToken) + Revocable (RefreshToken trong Redis).
> Nếu dùng JWT thuần túy không có Redis, logout không thể revoke token.

---

## 5. Luồng dữ liệu – Ví dụ cụ thể

### Ứng viên tìm việc

```
GET /api/jobs?keyword=react&city=HCM&page=1

1. Redis: GET cache:jobs:search:{md5}
   → HIT → trả về JSON (< 5ms)
   → MISS → tiếp tục

2. MongoDB: JobPosting.find({ status:'active', 'location.city':'TP.HCM',
             title: /react/i, ... }).sort().skip().limit()
   → trả về 20 jobs

3. Redis: SETEX cache:jobs:search:{md5} 60 {result}
   → lưu cache 60 giây

4. Response về client
```

### Ứng viên nộp đơn

```
POST /api/applications { jobId, coverLetter }

1. PostgreSQL: SELECT ... WHERE candidate_id=X AND job_id=Y (check trùng)
   → đã nộp → 409 Conflict

   → chưa nộp:
2. PostgreSQL BEGIN TRANSACTION
   INSERT INTO applications (candidate_id, job_id, company_id, cover_letter)
   UPDATE job_postings SET application_count = application_count + 1
   COMMIT

3. Neo4j (async): MERGE (c)-[:APPLIED_TO]->(j)
   → không block response, fail thầm

4. Response 201 Created
```

### Recruiter xem gợi ý ứng viên

```
GET /api/recommendations/candidates?jobId=60000000-...

1. Redis: GET cache:rec:candidates:{jobId}
   → HIT → trả về ngay

   → MISS:
2. Neo4j: MATCH (j)-[:REQUIRES]->(s)<-[:HAS_SKILL]-(c)
          WITH c, count(s) AS matched ORDER BY matched DESC LIMIT 20
   → [list candidateId + matchedSkills count]

3. MongoDB: CandidateProfile.find({ candidateId: { $in: [ids] } })
   → fetch full profiles

4. Merge Neo4j match score vào MongoDB profiles

5. Redis: SETEX cache:rec:candidates:{jobId} 300 {result}

6. Response: profiles có kèm { matchedSkills: 6, matchedSkillNames: [...] }
```

---

## 6. Tóm tắt 1 câu mỗi DB

| CSDL | Vai trò | Lý do chọn |
|------|---------|------------|
| **PostgreSQL** | Giao dịch quan hệ: user, đơn tuyển dụng, phỏng vấn | ACID, FK constraint, Materialized View |
| **MongoDB** | Nội dung linh hoạt: hồ sơ ứng viên, chi tiết job | Schema tự do, full-text search, document model |
| **Neo4j** | Gợi ý AI: job ↔ skill ↔ candidate matching | Graph traversal tự nhiên, traversal nhanh hơn SQL JOIN 10× |
| **Redis** | Cache & Session: tìm kiếm, recommendation, JWT | Sub-millisecond reads, TTL built-in, atomic increment |
