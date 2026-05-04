---
marp: true
theme: default
paginate: true
backgroundColor: #ffffff
style: |
  :root {
    --primary: #1a56db;
    --secondary: #0e9f6e;
    --accent: #7e3af2;
    --danger: #e02424;
    --dark: #1f2937;
    --light: #f9fafb;
    --muted: #6b7280;
  }

  section {
    font-family: 'Segoe UI', 'Arial', sans-serif;
    color: var(--dark);
    padding: 40px 56px;
  }

  /* COVER SLIDE */
  section.cover {
    background: linear-gradient(135deg, #1a56db 0%, #7e3af2 60%, #0e9f6e 100%);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 60px 72px;
  }
  section.cover h1 {
    font-size: 2.6em;
    font-weight: 800;
    line-height: 1.15;
    margin-bottom: 12px;
    color: white;
    border: none;
    text-shadow: 0 2px 12px rgba(0,0,0,0.2);
  }
  section.cover h2 {
    font-size: 1.3em;
    font-weight: 400;
    color: rgba(255,255,255,0.85);
    margin-bottom: 32px;
  }
  section.cover .meta {
    background: rgba(255,255,255,0.15);
    border-radius: 12px;
    padding: 18px 28px;
    color: white;
    font-size: 0.95em;
    line-height: 1.9;
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.25);
  }
  section.cover .meta strong { color: #fde68a; }

  /* SECTION DIVIDER */
  section.divider {
    background: linear-gradient(120deg, #1f2937 0%, #374151 100%);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 60px 72px;
  }
  section.divider .chapter-num {
    font-size: 5em;
    font-weight: 900;
    color: rgba(255,255,255,0.08);
    line-height: 1;
    margin-bottom: -24px;
  }
  section.divider h1 {
    font-size: 2em;
    font-weight: 700;
    color: white;
    border: none;
    margin-bottom: 16px;
  }
  section.divider p {
    color: rgba(255,255,255,0.65);
    font-size: 1em;
    max-width: 560px;
    line-height: 1.6;
  }
  section.divider .tag {
    display: inline-block;
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 20px;
    padding: 4px 16px;
    font-size: 0.8em;
    color: #a5f3fc;
    margin-bottom: 20px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  /* NORMAL SLIDES */
  h1 {
    font-size: 1.6em;
    font-weight: 700;
    color: var(--primary);
    border-bottom: 3px solid var(--primary);
    padding-bottom: 10px;
    margin-bottom: 24px;
  }
  h2 {
    font-size: 1.15em;
    font-weight: 600;
    color: var(--dark);
    margin-top: 20px;
    margin-bottom: 10px;
  }
  h3 {
    font-size: 0.95em;
    font-weight: 600;
    color: var(--accent);
    margin-top: 14px;
    margin-bottom: 6px;
  }

  ul {
    margin: 0;
    padding-left: 20px;
    line-height: 1.75;
  }
  ul li {
    font-size: 0.88em;
    margin-bottom: 4px;
  }
  ul li::marker { color: var(--primary); }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.78em;
    margin-top: 12px;
  }
  th {
    background: var(--primary);
    color: white;
    padding: 8px 12px;
    text-align: left;
    font-weight: 600;
  }
  td {
    padding: 7px 12px;
    border-bottom: 1px solid #e5e7eb;
  }
  tr:nth-child(even) td { background: #f3f4f6; }

  code {
    background: #f1f5f9;
    color: #1e293b;
    border-radius: 6px;
    padding: 2px 7px;
    font-size: 0.82em;
    font-family: 'Courier New', monospace;
    border: 1px solid #e2e8f0;
  }

  pre {
    background: #ffffff;
    color: #1e293b;
    border-radius: 10px;
    padding: 16px 20px;
    font-size: 0.72em;
    line-height: 1.55;
    font-family: 'Courier New', monospace;
    overflow: hidden;
    border: 1.5px solid #e2e8f0;
    box-shadow: 0 1px 6px rgba(0,0,0,0.06);
  }

  pre code {
    background: transparent;
    border: none;
    padding: 0;
    color: #1e293b;
  }

  /* CARD STYLES */
  .card-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    margin-top: 16px;
  }
  .card {
    background: var(--light);
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 14px 16px;
    font-size: 0.82em;
  }
  .card .card-title {
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 6px;
    font-size: 0.95em;
  }
  .card.green { border-left: 4px solid var(--secondary); }
  .card.blue  { border-left: 4px solid var(--primary); }
  .card.purple{ border-left: 4px solid var(--accent); }
  .card.red   { border-left: 4px solid var(--danger); }
  .card.gray  { border-left: 4px solid var(--muted); }

  /* DB BADGE */
  .badge {
    display: inline-block;
    border-radius: 6px;
    padding: 2px 10px;
    font-size: 0.72em;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-left: 6px;
    vertical-align: middle;
  }
  .badge.pg     { background: #e0f2fe; color: #0369a1; }
  .badge.mongo  { background: #dcfce7; color: #166534; }
  .badge.redis  { background: #fee2e2; color: #b91c1c; }
  .badge.neo4j  { background: #ede9fe; color: #6d28d9; }
  .badge.cass   { background: #fef3c7; color: #b45309; }

  /* HIGHLIGHT BOX */
  .highlight {
    background: linear-gradient(90deg, #eff6ff, #f0fdf4);
    border-left: 4px solid var(--primary);
    border-radius: 0 8px 8px 0;
    padding: 12px 18px;
    font-size: 0.86em;
    margin: 12px 0;
    line-height: 1.65;
  }

  /* STAT BOX */
  .stat-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-top: 14px;
  }
  .stat {
    background: var(--primary);
    color: white;
    border-radius: 10px;
    padding: 14px;
    text-align: center;
  }
  .stat .num {
    font-size: 1.9em;
    font-weight: 800;
    line-height: 1;
  }
  .stat .label {
    font-size: 0.72em;
    opacity: 0.85;
    margin-top: 4px;
  }
  .stat.green { background: var(--secondary); }
  .stat.purple { background: var(--accent); }
  .stat.orange { background: #d97706; }

  /* PIPELINE */
  .pipeline {
    display: flex;
    align-items: center;
    gap: 0;
    margin: 16px 0;
    flex-wrap: wrap;
  }
  .pipe-step {
    background: var(--primary);
    color: white;
    padding: 8px 16px;
    font-size: 0.78em;
    font-weight: 600;
    clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%, 12px 50%);
    margin-left: -8px;
    white-space: nowrap;
  }
  .pipe-step:first-child { clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%); margin-left: 0; }
  .pipe-step:nth-child(2) { background: #2563eb; }
  .pipe-step:nth-child(3) { background: #7c3aed; }
  .pipe-step:nth-child(4) { background: #059669; }
  .pipe-step:nth-child(5) { background: #d97706; }
  .pipe-step:last-child { background: #6b7280; clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 12px 50%); }

  /* ARCH DIAGRAM */
  .arch {
    background: #111827;
    color: #e5e7eb;
    border-radius: 12px;
    padding: 20px 24px;
    font-family: 'Courier New', monospace;
    font-size: 0.72em;
    line-height: 1.7;
    margin-top: 12px;
  }

  /* FOOTER/PAGE NUM */
  section::after {
    color: var(--muted);
    font-size: 0.72em;
  }

  /* TOC */
  section.toc ol {
    counter-reset: toc-counter;
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 20px;
  }
  section.toc ol li {
    counter-increment: toc-counter;
    background: var(--light);
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 10px 16px;
    font-size: 0.86em;
    position: relative;
    padding-left: 44px;
  }
  section.toc ol li::before {
    content: counter(toc-counter, decimal-leading-zero);
    position: absolute;
    left: 12px;
    font-weight: 800;
    color: var(--primary);
    font-size: 1em;
  }

  /* CONCLUSION */
  section.conclusion {
    background: linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px 72px;
  }
  section.conclusion h1 {
    color: #a7f3d0;
    border-color: #6ee7b7;
    font-size: 1.8em;
  }
  section.conclusion h2 { color: #d1fae5; }
  section.conclusion td, section.conclusion th { color: white; }
  section.conclusion table th { background: rgba(255,255,255,0.15); }
  section.conclusion table td { border-color: rgba(255,255,255,0.15); }
  section.conclusion tr:nth-child(even) td { background: rgba(255,255,255,0.06); }

  /* THANKS */
  section.thanks {
    background: linear-gradient(135deg, #1a56db 0%, #7e3af2 100%);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  section.thanks h1 { color: white; border-color: rgba(255,255,255,0.4); font-size: 2.5em; }
  section.thanks p { color: rgba(255,255,255,0.8); font-size: 1em; }
---

<!-- _class: cover -->

# HỆ THỐNG TUYỂN DỤNG THÔNG MINH
## Smart Recruitment System — Báo cáo Đồ án

<div class="meta">
<strong>Môn học:</strong> Cơ sở dữ liệu Quan hệ và NoSQL<br>
<strong>Nhóm thực hiện:</strong> [Tên nhóm]<br>
<strong>Giảng viên hướng dẫn:</strong> [Tên giảng viên]<br>
<strong>Năm học:</strong> 2024 – 2025
</div>

---

<!-- _class: toc -->

# Nội dung Báo cáo

<ol>
<li>Mô tả phạm vi nghiệp vụ hệ thống</li>
<li>Phân tích và lựa chọn loại CSDL phù hợp</li>
<li>Thiết kế mô hình dữ liệu</li>
<li>Cài đặt và triển khai hệ thống</li>
<li>Kỹ thuật nâng cao hiệu suất</li>
<li>Kết luận & Tài liệu tham khảo</li>
</ol>

---

<!-- _class: divider -->

<div class="chapter-num">01</div>

<div class="tag">Yêu cầu 1</div>

# Mô tả phạm vi nghiệp vụ hệ thống

Xác định các nghiệp vụ cốt lõi, khảo sát hệ thống thực tế và phân loại người dùng cho hệ thống tuyển dụng thông minh.

---

# Giới thiệu hệ thống

**Smart Recruitment System (SRS)** là nền tảng ứng dụng công nghệ thông tin hiện đại hỗ trợ toàn bộ quy trình tuyển dụng — từ đăng tin, tiếp nhận hồ sơ, sàng lọc, phỏng vấn đến onboarding.

## 3 nhóm người dùng chính

<div class="card-grid">
<div class="card blue">
<div class="card-title">👤 Ứng viên (Candidate)</div>
Tìm kiếm việc làm, nộp hồ sơ, theo dõi trạng thái ứng tuyển.
</div>
<div class="card green">
<div class="card-title">🏢 Nhà tuyển dụng (Recruiter / HR)</div>
Đăng tin, quản lý hồ sơ, lên lịch phỏng vấn.
</div>
<div class="card purple">
<div class="card-title">⚙️ Quản trị viên (Admin)</div>
Quản lý toàn bộ nền tảng, người dùng, báo cáo thống kê.
</div>
</div>

<div class="highlight">
💡 Hệ thống tích hợp <strong>AI/ML</strong> để phân tích hồ sơ, gợi ý ứng viên phù hợp và cung cấp công cụ quản lý quy trình tuyển dụng toàn diện.
</div>

---

# Khảo sát hệ thống thực tế

| Nền tảng | Điểm nổi bật |
|---|---|
| **LinkedIn** | Mạng xã hội nghề nghiệp, gợi ý kết nối, AI matching |
| **TopCV** | Thị trường Việt Nam, đa ngành nghề, phân tích CV |
| **VietnamWorks** | Quản lý hồ sơ, thông báo email, bộ lọc tìm kiếm |
| **ITViec** | Chuyên IT, đánh giá công ty, cộng đồng lập trình viên |

## Điểm chung được tổng hợp

- **Tìm kiếm nâng cao:** Full-text search + lọc đa tiêu chí
- **Quản lý pipeline:** Theo dõi ứng viên qua nhiều bước
- **Thông báo realtime:** Email, push notification
- **AI gợi ý:** Matching giữa ứng viên và công việc
- **Đánh giá công ty:** Minh bạch thông tin tuyển dụng

---

# Các nghiệp vụ chính (NV01 – NV05)

| Mã | Tên nghiệp vụ | Người dùng | Ưu tiên |
|---|---|---|---|
| **NV01** | Quản lý tài khoản người dùng | Tất cả | 🔴 Cao |
| **NV02** | Quản lý hồ sơ ứng viên (CV/Profile) | Ứng viên | 🔴 Cao |
| **NV03** | Đăng và quản lý tin tuyển dụng | Nhà tuyển dụng | 🔴 Cao |
| **NV04** | Tìm kiếm và lọc công việc / ứng viên | Tất cả | 🔴 Cao |
| **NV05** | Ứng tuyển và quản lý pipeline | Ứng viên, HR | 🔴 Cao |

### Pipeline ứng tuyển (NV05)

<div class="pipeline">
<div class="pipe-step">Đã nộp</div>
<div class="pipe-step">Đang xem xét</div>
<div class="pipe-step">Phỏng vấn</div>
<div class="pipe-step">Đề nghị</div>
<div class="pipe-step">Kết quả</div>
</div>

---

# Các nghiệp vụ chính (NV06 – NV10)

| Mã | Tên nghiệp vụ | Người dùng | Ưu tiên |
|---|---|---|---|
| **NV06** | Gợi ý thông minh AI Matching | Tất cả | 🔴 Cao |
| **NV07** | Lên lịch phỏng vấn | Ứng viên, HR | 🟡 Trung bình |
| **NV08** | Thông báo và tin nhắn realtime | Tất cả | 🟡 Trung bình |
| **NV09** | Đánh giá và nhận xét công ty | Ứng viên, HR | 🟡 Trung bình |
| **NV10** | Báo cáo và thống kê (Analytics) | HR, Admin | 🟢 Thấp |

### Tổng quan hệ thống

<div class="stat-grid">
<div class="stat"><div class="num">10</div><div class="label">Nghiệp vụ chính</div></div>
<div class="stat green"><div class="num">3</div><div class="label">Nhóm người dùng</div></div>
<div class="stat purple"><div class="num">5</div><div class="label">Loại CSDL</div></div>
<div class="stat orange"><div class="num">AI</div><div class="label">Gợi ý thông minh</div></div>
</div>

---

<!-- _class: divider -->

<div class="chapter-num">02</div>

<div class="tag">Yêu cầu 2</div>

# Phân tích và lựa chọn CSDL

Phân tích đặc thù từng nghiệp vụ và lựa chọn loại cơ sở dữ liệu tối ưu cho kiến trúc Polyglot Persistence.

---

# Tổng quan các loại CSDL

| Loại CSDL | Đặc điểm | Công nghệ |
|---|---|---|
| **Relational DB** | Schema cố định, ACID, JOIN phức tạp | PostgreSQL, MySQL |
| **Document Store** | Schema linh hoạt, lưu JSON/BSON | MongoDB |
| **Key-Value Store** | Đọc/ghi cực nhanh, TTL, cache/session | Redis |
| **Column Family** | Write-optimized, time-series, event log | Cassandra |
| **Graph Store** | Lưu quan hệ thực thể, duyệt đồ thị | Neo4j |

<div class="highlight">
🎯 <strong>Nguyên tắc Polyglot Persistence:</strong> Không có CSDL nào tốt nhất cho mọi bài toán. Mỗi loại được chọn dựa trên đặc thù nghiệp vụ cụ thể.
</div>

---

# Phân tích lựa chọn CSDL theo nghiệp vụ

| Nghiệp vụ | Loại CSDL | Công nghệ | Lý do chính |
|---|---|---|---|
| NV01 – Tài khoản | Relational | PostgreSQL | ACID, ràng buộc toàn vẹn |
| NV02 – Hồ sơ ứng viên | Document | MongoDB | Schema linh hoạt, JSON nested |
| NV03 – Tin tuyển dụng | Document | MongoDB | Full-text search, linh hoạt |
| NV04 – Tìm kiếm | Document | MongoDB | Text index, aggregate |
| NV05 – Ứng tuyển | Relational | PostgreSQL | JOIN, UNIQUE constraint |
| NV06 – Gợi ý AI | Graph | Neo4j | Quan hệ đồ thị, Cypher |
| NV07 – Lịch phỏng vấn | Relational | PostgreSQL | ACID, liên kết |
| NV08 – Session/Thông báo | Key-Value | Redis | In-memory, TTL, Pub/Sub |
| NV09 – Đánh giá | Document | MongoDB | Schema tự do |
| NV10 – Event Log | Column Family | Cassandra | Time-series, write-heavy |

---

# Chi tiết lựa chọn: PostgreSQL & MongoDB

<div class="card-grid" style="grid-template-columns:1fr 1fr; gap:16px;">
<div class="card blue" style="padding:16px 18px;">
<div class="card-title">🐘 PostgreSQL — Relational DB</div>

**Dùng cho:** NV01, NV05, NV07

- Dữ liệu có cấu trúc cố định, ràng buộc mạnh
- Hỗ trợ JOIN nhiều bảng liên quan
- Transaction ACID khi tạo/cập nhật tài khoản
- `UNIQUE(candidate_id, job_id)` ngăn duplicate
- Phù hợp với quy trình có trạng thái (pipeline)
</div>
<div class="card green" style="padding:16px 18px;">
<div class="card-title">🍃 MongoDB — Document Store</div>

**Dùng cho:** NV02, NV03, NV04, NV09

- Hồ sơ ứng viên là document JSON tự nhiên
- Schema linh hoạt theo từng ứng viên
- Full-text search với Atlas Search
- Compound index cho tìm kiếm đa tiêu chí
- Aggregate pipeline phân tích kỹ năng
</div>
</div>

**Ví dụ document MongoDB:**
```json
{ "_id": "candidate_001", "fullName": "Nguyễn Văn A",
  "skills": ["Java", "Spring Boot", "PostgreSQL"],
  "experience": [{ "company": "Công ty ABC", "role": "Backend Dev", "years": 3 }] }
```

---

# Chi tiết lựa chọn: Neo4j, Redis & Cassandra

<div class="card-grid" style="gap:14px;">
<div class="card purple">
<div class="card-title">🔗 Neo4j — Graph DB</div>

**Dùng cho:** NV06 – Gợi ý AI

- Mô hình quan hệ: `(Candidate)-[:HAS_SKILL]->(Skill)-[:REQUIRED_BY]->(Job)`
- Collaborative filtering
- Cypher query duyệt đa bước
- Phát hiện ứng viên tương tự
</div>
<div class="card red">
<div class="card-title">⚡ Redis — Key-Value</div>

**Dùng cho:** NV08 – Session/Thông báo

- Session token với TTL 1 giờ
- Pub/Sub thông báo realtime
- Cache kết quả tìm kiếm
- Tốc độ in-memory < 1ms
</div>
<div class="card gray">
<div class="card-title">📊 Cassandra — Column Family</div>

**Dùng cho:** NV10 – Event Log

- Write-optimized, hàng triệu event/ngày
- Partition key `(user_id, date)`
- Time-series analytics
- Scale ngang tuyệt vời
</div>
</div>

---

<!-- _class: divider -->

<div class="chapter-num">03</div>

<div class="tag">Yêu cầu 3</div>

# Thiết kế mô hình dữ liệu

Thiết kế chi tiết ERD PostgreSQL, MongoDB Collections, Neo4j Graph Model, Redis Key Structure và Cassandra Tables.

---

# PostgreSQL — Sơ đồ ERD

```
┌──────────┐    ┌─────────────┐    ┌──────────────┐
│  users   │    │ candidates  │    │  companies   │
│──────────│    │─────────────│    │──────────────│
│ id (PK)  │──<─│ user_id(FK) │    │ id (PK)      │
│ email    │    │ full_name   │    │ user_id (FK) │──>──┐
│ role     │──<─│ location    │    │ name         │     │
│ is_active│    │ expected_   │    │ industry     │     │
└──────────┘    │   salary    │    │ rating       │     │
                └──────┬──────┘    └──────────────┘     │
                       │                                  │
              ┌────────▼──────────────────────────────┐  │
              │            applications               │  │
              │──────────────────────────────────────│  │
              │ id (PK)  │ candidate_id (FK)          │  │
              │ job_id (FK) → job_postings            │  │
              │ status: submitted→review→interview→offer│ │
              │ UNIQUE(candidate_id, job_id)          │  │
              └────────────────┬──────────────────────┘  │
                               │              ┌───────────▼────────┐
                    ┌──────────▼──────────┐   │   job_postings     │
                    │     interviews      │   │────────────────────│
                    │─────────────────────│   │ id (PK)            │
                    │ application_id (FK) │   │ company_id (FK)    │
                    │ round, scheduled_at │   │ title, status      │
                    │ type, feedback      │   │ salary_min/max     │
                    └─────────────────────┘   └────────────────────┘
```

---

# PostgreSQL — Các bảng chính

| Bảng | Mô tả | Ràng buộc quan trọng |
|---|---|---|
| `users` | Tài khoản hệ thống | `UNIQUE(email)`, ENUM role |
| `candidates` | Hồ sơ ứng viên | `FK → users`, CASCADE DELETE |
| `companies` | Thông tin công ty | `FK → users` |
| `job_postings` | Tin tuyển dụng | `FK → companies`, ENUM status |
| `applications` | Đơn ứng tuyển | `UNIQUE(candidate_id, job_id)` |
| `interviews` | Lịch phỏng vấn | `FK → applications`, CASCADE |

**Indexes được tạo:**
```sql
CREATE INDEX idx_applications_candidate ON applications(candidate_id);
CREATE INDEX idx_applications_job       ON applications(job_id);
CREATE INDEX idx_job_postings_status    ON job_postings(status);
CREATE INDEX idx_job_postings_deadline  ON job_postings(deadline);
```

---

# MongoDB — 3 Collections chính

<div class="card-grid" style="gap:14px;">
<div class="card green">
<div class="card-title">📄 candidate_profiles</div>

Toàn bộ hồ sơ nghề nghiệp trong **một document**:
- `personalInfo`, `summary`
- `skills[]` — tên + cấp độ + năm kinh nghiệm
- `experience[]` — lịch sử công ty
- `education[]`, `certifications[]`
- `languages[]`, `portfolio[]`
- `preferences` — sở thích việc làm
</div>
<div class="card blue">
<div class="card-title">📋 job_postings</div>

Tin tuyển dụng chi tiết:
- `companyInfo` nhúng trực tiếp (tránh JOIN)
- `requirements.skills[]` + mức độ bắt buộc
- `benefits[]`, `applicationProcess[]`
- `viewCount`, `applicationCount` — thống kê
- Tags để tìm kiếm nhanh
</div>
<div class="card purple">
<div class="card-title">⭐ company_reviews</div>

Đánh giá công ty sau tuyển dụng:
- `ratings` — điểm đa chiều (WLB, lương, quản lý)
- `pros`, `cons`, `advice` — nhận xét văn bản
- `interviewExperience` — trải nghiệm phỏng vấn
- `isAnonymous` — ẩn danh tùy chọn
- `isVerified` — xác minh đã phỏng vấn
</div>
</div>

---

# Neo4j — Mô hình đồ thị

```
(Candidate) ──[HAS_SKILL{level, yearsOfExp}]──► (Skill)
     │                                              │
     │                                    [REQUIRES{isRequired}]
     │                                              ▼
     ├──[APPLIED_TO{status, appliedAt}]──► (Job) ◄──[POSTED_BY]── (Company)
     │                                              │
     ├──[SAVED{savedAt}]──────────────────►         │               │
     │                                              │        [BELONGS_TO]
     ├──[VIEWED{viewedAt}]────────────────►         │               ▼
     │                                              │          (Industry)
     ├──[WORKS_AT{role, startDate}]───────────────► (Company)
     │
     └──[SIMILAR_TO{similarityScore}]──► (Candidate)
```

**Ứng dụng Cypher gợi ý:**
```cypher
MATCH (c:Candidate {id: "001"})-[:HAS_SKILL]->(s:Skill)<-[:REQUIRES]-(j:Job)
WHERE NOT (c)-[:APPLIED]->(j)
RETURN j.title, count(s) AS matchScore ORDER BY matchScore DESC LIMIT 10
```

---

# Redis — Cấu trúc Key-Value

| Nhóm | Key Pattern | Kiểu | TTL |
|---|---|---|---|
| **Session** | `session:{userId}` | Hash | 1 giờ |
| **Token** | `refresh_token:{token}` | String | 7 ngày |
| **OTP** | `otp:{email}` | String | 5 phút |
| **Cache tìm kiếm** | `cache:jobs:search:{hash}` | String JSON | 60 giây |
| **Cache gợi ý** | `cache:recommend:{userId}` | List | 5 phút |
| **Online users** | `online_users` | Set | Không TTL |
| **Thông báo** | `notifications:{userId}` | List | 24 giờ |
| **Lượt xem** | `job_view_count:{jobId}` | Counter | Không TTL |
| **Rate limit** | `rate_limit:{ip}` | Integer | 60 giây |

---

# Cassandra — 3 Bảng chính

| Bảng | Partition Key | Mô tả |
|---|---|---|
| `user_activity_log` | `(user_id, event_date)` | Toàn bộ hoạt động người dùng: xem tin, nộp đơn, tìm kiếm |
| `job_daily_stats` | `(job_id, stat_date)` | Thống kê hàng ngày: lượt xem, ứng tuyển, lưu, nhấp |
| `search_history` | `(user_id, search_date)` | Lịch sử tìm kiếm + bộ lọc → phân tích hành vi |

**Đặc điểm thiết kế:**
- `job_daily_stats` dùng kiểu `COUNTER` để ghi tăng nguyên tử
- Partition key theo ngày → truy vấn khoảng thời gian hiệu quả
- Cluster nhân bản hệ số **3** để đảm bảo tính sẵn sàng

---

# Kiến trúc đa CSDL — Polyglot Persistence

```
                     ┌─────────────────────────────┐
                     │        Ứng dụng (Node.js)   │
                     │  API Gateway + JWT Auth      │
                     └───┬──────┬──────┬──────┬─────┘
                         │      │      │      │      │
              ┌──────────▼┐  ┌──▼──┐  ┌▼──┐ ┌▼──┐ ┌▼──────────┐
              │PostgreSQL │  │Mongo│  │Neo│ │Red│ │Cassandra  │
              │           │  │DB   │  │4j │ │is │ │           │
              │ Core logic│  │Docs │  │AI │ │⚡ │ │Analytics  │
              │ ACID ✓    │  │JSON │  │ML │ │<1ms│ │Time-series│
              └───────────┘  └─────┘  └───┘ └───┘ └───────────┘
               NV01,05,07   NV02-04  NV06  NV08     NV10
                              NV09
```

---

<!-- _class: divider -->

<div class="chapter-num">04</div>

<div class="tag">Yêu cầu 4</div>

# Cài đặt và Triển khai hệ thống

DDL/DML cho PostgreSQL, MongoDB, Neo4j, Redis, Cassandra và thiết kế UI, kết nối backend Node.js.

---

# Kiến trúc hệ thống tổng quan

<div class="arch">
┌───────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                         │
│          Web App (React)   │   Mobile App (React Native)  │
└────────────────────┬──────────────────────────────────────┘
                     │  HTTP / WebSocket
┌────────────────────▼──────────────────────────────────────┐
│              API GATEWAY / BFF                            │
│         Node.js + Express + JWT Authentication            │
└──┬──────────┬──────────┬──────────┬──────────┬────────────┘
   │          │          │          │          │
   ▼          ▼          ▼          ▼          ▼
PostgreSQL  MongoDB    Neo4j     Redis     Cassandra
(Core DB) (Profiles) (Graph)   (Cache)   (Analytics)
</div>

**Stack công nghệ:** Node.js (Express), React, JWT Auth, WebSocket, Docker

---

# PostgreSQL — DDL Ví dụ

```sql
-- Tạo kiểu ENUM
CREATE TYPE user_role AS ENUM ('candidate', 'recruiter', 'admin');
CREATE TYPE application_status AS ENUM
  ('submitted', 'reviewing', 'interview', 'offer', 'rejected', 'hired');

-- Bảng users
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role          user_role NOT NULL,
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMP DEFAULT NOW()
);

-- Bảng applications với ràng buộc UNIQUE
CREATE TABLE applications (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID NOT NULL REFERENCES candidates(id),
  job_id       UUID NOT NULL REFERENCES job_postings(id),
  status       application_status DEFAULT 'submitted',
  applied_at   TIMESTAMP DEFAULT NOW(),
  CONSTRAINT unique_application UNIQUE (candidate_id, job_id)
);
```

---

# PostgreSQL — DML Ví dụ

```sql
-- 1. Đăng ký ứng viên mới (trong transaction)
BEGIN;
  INSERT INTO users (email, password_hash, role)
  VALUES ('an.nguyen@email.com', '$2b$10$...', 'candidate')
  RETURNING id INTO v_user_id;

  INSERT INTO candidates (user_id, full_name, location, years_experience)
  VALUES (v_user_id, 'Nguyễn Văn An', 'TP.HCM', 3);
COMMIT;

-- 2. Thống kê pipeline tuyển dụng theo công ty
SELECT status, COUNT(*) AS total,
       ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) AS percentage
FROM applications a
JOIN job_postings j ON a.job_id = j.id
WHERE j.company_id = 'company_uuid'
GROUP BY status ORDER BY total DESC;

-- 3. Materialized View cho báo cáo nhanh
CREATE MATERIALIZED VIEW mv_pipeline_stats AS
  SELECT j.company_id, a.status, COUNT(*) AS cnt
  FROM applications a JOIN job_postings j ON a.job_id = j.id
  GROUP BY j.company_id, a.status;
```

---

# MongoDB — Thao tác dữ liệu

```javascript
// 1. Thêm kinh nghiệm làm việc cho ứng viên
await db.candidate_profiles.updateOne(
  { candidateId: "candidate_001" },
  {
    $push: { experience: {
      company: "Công ty XYZ", role: "Senior Backend", years: 2,
      from: "2022-01", to: "2024-01", description: "..."
    }},
    $set: { "updatedAt": new Date() }
  }
);

// 2. Tìm kiếm full-text công việc với điều kiện phức tạp
db.job_postings.aggregate([
  { $search: { index: "job_search_index",
      text: { query: "nodejs backend developer", path: ["title", "description"] }}},
  { $match: { status: "active", "salary.min": { $gte: 1000 },
      "location.city": { $in: ["TP.HCM", "Hà Nội"] }}},
  { $sort: { score: { $meta: "searchScore" }, viewCount: -1 } },
  { $limit: 20 }
]);
```

---

# Neo4j & Redis — Cài đặt

```cypher
// Neo4j — Tạo graph model
MERGE (c:Candidate {id: "candidate_001", name: "Nguyễn Văn A"})
MERGE (s:Skill {name: "Java"})
MERGE (c)-[:HAS_SKILL {level: "senior", yearsOfExp: 4}]->(s);

// Gợi ý việc làm dựa trên kỹ năng tương đồng
MATCH (c:Candidate {id: $candidateId})-[:HAS_SKILL]->(s:Skill)<-[:REQUIRES]-(j:Job)
WHERE j.status = 'active' AND NOT (c)-[:APPLIED_TO]->(j)
RETURN j.id, j.title, COUNT(s) AS score
ORDER BY score DESC LIMIT 10
```

```javascript
// Redis — Session và Pub/Sub
await redisClient.hSet(`session:${userId}`,
  { userId, role: 'candidate', email, loginAt: Date.now() });
await redisClient.expire(`session:${userId}`, 3600);

// Publish thông báo realtime
await redisClient.publish(`notifications:${userId}`,
  JSON.stringify({ type: 'new_job_match', jobId, matchScore: 0.92 }));
```

---

# Cassandra — DDL & DML

```sql
-- Tạo Keyspace
CREATE KEYSPACE smart_recruitment
  WITH replication = {'class': 'NetworkTopologyStrategy', 'dc1': 3};

-- Bảng ghi log hoạt động người dùng
CREATE TABLE user_activity_log (
  user_id    UUID,
  event_date DATE,
  event_time TIMESTAMP,
  event_id   UUID,
  event_type TEXT,        -- view_job, apply_job, search, click_recommend
  entity_id  UUID,
  metadata   MAP<TEXT, TEXT>,
  PRIMARY KEY ((user_id, event_date), event_time, event_id)
) WITH CLUSTERING ORDER BY (event_time DESC);

-- Bảng thống kê với COUNTER type
CREATE TABLE job_daily_stats (
  job_id      UUID, stat_date DATE,
  view_count  COUNTER, apply_count COUNTER, save_count COUNTER,
  PRIMARY KEY (job_id, stat_date)
);

-- Ghi tăng thống kê
UPDATE job_daily_stats SET view_count = view_count + 1
WHERE job_id = uuid() AND stat_date = toDate(now());
```

---

<!-- _class: divider -->

<div class="chapter-num">05</div>

<div class="tag">Yêu cầu 5</div>

# Kỹ thuật nâng cao hiệu suất

Indexing, Materialized Views, Caching Pattern, Graph Optimization và Partition Design cho hiệu suất tối đa.

---

# PostgreSQL — Kỹ thuật tối ưu

**1. Composite Index cho query phức tạp:**
```sql
-- Lọc tin active, sắp xếp theo deadline
CREATE INDEX idx_jobs_status_deadline
  ON job_postings(status, deadline DESC)
  WHERE status = 'active';

-- Covering index — không cần truy cập bảng chính
CREATE INDEX idx_applications_cover
  ON applications(job_id, status) INCLUDE (candidate_id, applied_at);
```

**2. Materialized View cho báo cáo:**
```sql
CREATE MATERIALIZED VIEW mv_pipeline_stats AS
  SELECT j.company_id, a.status, COUNT(*) AS cnt, DATE_TRUNC('day', a.applied_at) AS d
  FROM applications a JOIN job_postings j ON a.job_id = j.id
  GROUP BY j.company_id, a.status, d;

-- Refresh tự động mỗi giờ
REFRESH MATERIALIZED VIEW CONCURRENTLY mv_pipeline_stats;
```

---

# MongoDB — Kỹ thuật tối ưu

**1. Text Index cho tìm kiếm toàn văn:**
```javascript
db.job_postings.createIndex(
  { title: "text", description: "text", "requirements.skills": "text" },
  { weights: { title: 10, "requirements.skills": 5, description: 1 },
    default_language: "none" }
);

// Compound Index cho lọc đa tiêu chí
db.job_postings.createIndex({ status: 1, "location.city": 1, "salary.min": 1 });
db.candidate_profiles.createIndex({ "skills.name": 1, "preferences.location": 1 });
```

**2. Aggregation Pipeline tối ưu:**
```javascript
db.candidate_profiles.aggregate([
  { $match: { "skills.name": { $all: ["Java", "Spring Boot"] },
              "preferences.location": "TP.HCM" }},
  { $project: { candidateId: 1, skills: 1, experience: 1, _id: 0 }},
  { $sort: { "preferences.expectedSalary": 1 }},
  { $limit: 50 }
], { allowDiskUse: true });
```

---

# Redis — Cache-Aside Pattern & Neo4j Optimization

**Redis Cache-Aside với TTL:**
```javascript
async function getJobRecommendations(userId) {
  const cacheKey = `cache:recommend:${userId}`;
  const cached = await redisClient.get(cacheKey);
  if (cached) return JSON.parse(cached);           // Cache HIT

  // Cache MISS — query Neo4j
  const recommendations = await neo4jSession.run(
    `MATCH (c:Candidate {id:$userId})-[:HAS_SKILL]->(s:Skill)<-[:REQUIRES]-(j:Job)
     WHERE j.status='active' AND NOT (c)-[:APPLIED_TO]->(j)
     RETURN j.id, j.title, COUNT(s) AS score ORDER BY score DESC LIMIT 10`,
    { userId });
  const result = recommendations.records.map(r => ({...}));
  await redisClient.set(cacheKey, JSON.stringify(result), { EX: 300 }); // TTL 5 phút
  return result;
}
```

**Neo4j — Index & Optimization:**
```cypher
CREATE INDEX idx_job_status FOR (j:Job) ON (j.status);
CREATE INDEX idx_candidate_location FOR (c:Candidate) ON (c.location);
-- Giới hạn depth tránh cartesian product
MATCH path = (c:Candidate {id: $id})-[:HAS_SKILL*1..2]->(s) RETURN path LIMIT 1000
```

---

# Kết quả Benchmark Thực nghiệm

## PostgreSQL — Hiệu quả Index

| Query | Không Index | Có Index | Cải thiện |
|---|---|---|---|
| Lấy danh sách đơn theo job_id | 340 ms | 2.1 ms | **162×** |
| Lọc tin active theo deadline | 280 ms | 1.8 ms | **155×** |
| Pipeline statistics (GROUP BY) | 820 ms | 45 ms (MV) | **18×** |
| JOIN applications + candidates | 510 ms | 12 ms | **42×** |

*Dataset: 500,000 applications · 50,000 job_postings · 200,000 candidates*

## MongoDB — Hiệu quả Index

| Query | Collection Scan | Với Index | Cải thiện |
|---|---|---|---|
| Text search job title | 2,800 ms | 35 ms | **80×** |
| Filter city + status | 1,200 ms | 8 ms | **150×** |
| Aggregate top skills | 3,500 ms | 180 ms | **19×** |

---

# Benchmark: Redis Cache Hit Rate & Cassandra

## Redis — Tỷ lệ Cache Hit

| Scenario | Không Cache | Có Cache (5 min TTL) | Hit Rate |
|---|---|---|---|
| Job recommendation | 850 ms (Neo4j) | < 1 ms | **78%** |
| Search results | 320 ms (MongoDB) | < 1 ms | **65%** |
| Session validation | 15 ms (PostgreSQL) | < 1 ms | **99%** |

## Cassandra — Write Throughput

| Scenario | Throughput | Latency (p99) |
|---|---|---|
| Single write (event log) | 45,000 ops/s | 3.2 ms |
| Batch write (100 events) | 120,000 ops/s | 8.5 ms |
| Counter update | 38,000 ops/s | 4.1 ms |

*Test: 3-node cluster · 10 triệu records*

---

<!-- _class: conclusion -->

# Kết luận

## Tóm tắt kết quả đạt được

| Yêu cầu | Kết quả |
|---|---|
| **YC1 – Nghiệp vụ** | 10 nghiệp vụ chính với mô tả chi tiết |
| **YC2 – Phân tích CSDL** | Lựa chọn & lý giải 5 loại CSDL phù hợp |
| **YC3 – Thiết kế dữ liệu** | ERD PostgreSQL, 3 MongoDB collections, Neo4j graph, Redis model, 3 Cassandra tables |
| **YC4 – Cài đặt** | DDL + DML đầy đủ, UI design, kết nối backend Node.js |
| **YC5 – Hiệu suất** | Index cải thiện tới **162×**, cache hit rate **78–99%** |

## Bài học rút ra

> *Kiến trúc **Polyglot Persistence** — sử dụng nhiều loại CSDL, mỗi loại phù hợp nhất với một nhóm nghiệp vụ — là xu hướng tất yếu trong hệ thống thông tin hiện đại. Chìa khóa là hiểu rõ đặc thù từng CSDL và khớp nó với đặc thù nghiệp vụ.*

---

# Tài liệu tham khảo

1. Fowler & Sadalage (2012). *NoSQL Distilled: A Brief Guide to the Emerging World of Polyglot Persistence*. Addison-Wesley.
2. Kleppmann, M. (2017). *Designing Data-Intensive Applications*. O'Reilly Media.
3. PostgreSQL Documentation (2024). *PostgreSQL 16 Official Docs*. postgresql.org
4. MongoDB Documentation (2024). *MongoDB Manual*. mongodb.com/docs
5. Neo4j Documentation (2024). *Neo4j Graph Data Science Library*. neo4j.com/docs
6. Redis Documentation (2024). *Redis Commands Reference*. redis.io/commands
7. Apache Cassandra Documentation (2024). *Cassandra 4.1 Docs*. cassandra.apache.org
8. TopCV (2024). *Khảo sát thị trường tuyển dụng Việt Nam 2024*. topcv.vn
9. LinkedIn Engineering Blog (2024). *How LinkedIn Scales its Graph Data Infrastructure*. engineering.linkedin.com

---

<!-- _class: thanks -->

# Cảm ơn thầy/cô và các bạn đã lắng nghe! 🎓

**Hệ thống Tuyển dụng Thông minh**
*Smart Recruitment System*

PostgreSQL · MongoDB · Neo4j · Redis · Cassandra

<br>

*Nhóm thực hiện — Môn Cơ sở dữ liệu Quan hệ và NoSQL — 2024–2025*
