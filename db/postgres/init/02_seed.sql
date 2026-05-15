-- =============================================================
-- PostgreSQL Seed Data – Smart Recruitment System (SRS)
-- Demo data for presentation – covers all pipeline stages
-- =============================================================
--
-- ╔══════════════════════════════════════════════════════════╗
-- ║              DEMO ACCOUNT CREDENTIALS                   ║
-- ║  Password for ALL accounts:  Demo@123456                ║
-- ╠══════════════════════════════════════════════════════════╣
-- ║  CANDIDATES:                                            ║
-- ║   candidate1@demo.vn  – Nguyễn Văn An  (Senior Dev)    ║
-- ║   candidate2@demo.vn  – Trần Thị Bích  (Data Sci)      ║
-- ║   candidate3@demo.vn  – Lê Hoàng Cường (DevOps)        ║
-- ║   candidate4@demo.vn  – Phạm Minh Đức  (Mobile)        ║
-- ║   candidate5@demo.vn  – Võ Thị Phương  (Fresher .NET)  ║
-- ╠══════════════════════════════════════════════════════════╣
-- ║  RECRUITERS:                                            ║
-- ║   hr@techviet.vn      – TechViet JSC                   ║
-- ║   hr@fintechvn.vn     – FinTech Solutions Vietnam       ║
-- ║   hr@vincommerce.vn   – VinCommerce                    ║
-- ║   hr@mbbank.vn        – MB Bank                        ║
-- ║   hr@fptsoftware.vn   – FPT Software                   ║
-- ╠══════════════════════════════════════════════════════════╣
-- ║  ADMIN:                                                 ║
-- ║   admin@srs.vn        – System Administrator           ║
-- ╚══════════════════════════════════════════════════════════╝
--
-- APPLICATION PIPELINE SHOWCASE:
--   submitted  → candidate4@demo.vn (job3, job5 partially)
--   reviewing  → candidate4@demo.vn (job5), candidate5@demo.vn (job6)
--   interview  → candidate1@demo.vn (job1 – round 2 scheduled)
--                candidate2@demo.vn (job10 – round 1 scheduled)
--   offered    → candidate2@demo.vn (job2 – got offer!)
--   accepted   → candidate3@demo.vn (job4 – accepted the offer)
--   rejected   → candidate3@demo.vn (job1), candidate1@demo.vn (job7 closed)
--   withdrawn  → candidate5@demo.vn (job9)
-- =============================================================

-- Clear existing data (in FK-safe order)
TRUNCATE TABLE interviews         RESTART IDENTITY CASCADE;
TRUNCATE TABLE applications       RESTART IDENTITY CASCADE;
TRUNCATE TABLE candidate_profiles RESTART IDENTITY CASCADE;
TRUNCATE TABLE job_postings       RESTART IDENTITY CASCADE;
TRUNCATE TABLE companies          RESTART IDENTITY CASCADE;
TRUNCATE TABLE candidates         RESTART IDENTITY CASCADE;
TRUNCATE TABLE users              RESTART IDENTITY CASCADE;

-- Refresh materialized view after truncation
REFRESH MATERIALIZED VIEW mv_pipeline_stats;

-- ── USERS ──────────────────────────────────────────────────────
-- bcrypt hash of "Demo@123456" with cost factor 12
INSERT INTO users (id, email, password_hash, role, is_active) VALUES
-- Candidates
('10000000-0000-0000-0000-000000000001', 'candidate1@demo.vn',
 '$2a$12$EH71hzuizy8pW9Ad.TPKc.wGFBkK37OuOkKgkJMb09Lq7X3wwSGwC', 'candidate', true),
('10000000-0000-0000-0000-000000000002', 'candidate2@demo.vn',
 '$2a$12$EH71hzuizy8pW9Ad.TPKc.wGFBkK37OuOkKgkJMb09Lq7X3wwSGwC', 'candidate', true),
('10000000-0000-0000-0000-000000000003', 'candidate3@demo.vn',
 '$2a$12$EH71hzuizy8pW9Ad.TPKc.wGFBkK37OuOkKgkJMb09Lq7X3wwSGwC', 'candidate', true),
('10000000-0000-0000-0000-000000000004', 'candidate4@demo.vn',
 '$2a$12$EH71hzuizy8pW9Ad.TPKc.wGFBkK37OuOkKgkJMb09Lq7X3wwSGwC', 'candidate', true),
('10000000-0000-0000-0000-000000000005', 'candidate5@demo.vn',
 '$2a$12$EH71hzuizy8pW9Ad.TPKc.wGFBkK37OuOkKgkJMb09Lq7X3wwSGwC', 'candidate', true),
-- Recruiters
('20000000-0000-0000-0000-000000000001', 'hr@techviet.vn',
 '$2a$12$EH71hzuizy8pW9Ad.TPKc.wGFBkK37OuOkKgkJMb09Lq7X3wwSGwC', 'recruiter', true),
('20000000-0000-0000-0000-000000000002', 'hr@fintechvn.vn',
 '$2a$12$EH71hzuizy8pW9Ad.TPKc.wGFBkK37OuOkKgkJMb09Lq7X3wwSGwC', 'recruiter', true),
('20000000-0000-0000-0000-000000000003', 'hr@vincommerce.vn',
 '$2a$12$EH71hzuizy8pW9Ad.TPKc.wGFBkK37OuOkKgkJMb09Lq7X3wwSGwC', 'recruiter', true),
('20000000-0000-0000-0000-000000000004', 'hr@mbbank.vn',
 '$2a$12$EH71hzuizy8pW9Ad.TPKc.wGFBkK37OuOkKgkJMb09Lq7X3wwSGwC', 'recruiter', true),
('20000000-0000-0000-0000-000000000005', 'hr@fptsoftware.vn',
 '$2a$12$EH71hzuizy8pW9Ad.TPKc.wGFBkK37OuOkKgkJMb09Lq7X3wwSGwC', 'recruiter', true),
-- Admin
('30000000-0000-0000-0000-000000000001', 'admin@srs.vn',
 '$2a$12$EH71hzuizy8pW9Ad.TPKc.wGFBkK37OuOkKgkJMb09Lq7X3wwSGwC', 'admin', true);

-- ── CANDIDATES ─────────────────────────────────────────────────
INSERT INTO candidates (id, user_id, full_name, phone, date_of_birth, location, bio, expected_salary, years_experience) VALUES
('40000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001',
 'Nguyễn Văn An', '0912111001', '1995-03-15', 'TP.HCM',
 'Senior Full-stack Developer 5 năm kinh nghiệm React/Node.js. Từng dẫn team 5 người tại startup fintech.',
 35000000, 5),
('40000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002',
 'Trần Thị Bích', '0978222002', '1998-07-22', 'TP.HCM',
 'Data Scientist 3 năm kinh nghiệm fintech. Thạc sĩ KHMT ĐH Bách Khoa. Chuyên ML cho credit scoring và fraud detection.',
 28000000, 3),
('40000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000003',
 'Lê Hoàng Cường', '0918333003', '1992-11-10', 'Đà Nẵng',
 'Senior DevOps/Cloud Engineer 7 năm kinh nghiệm. AWS Solutions Architect Professional và CKA certified.',
 45000000, 7),
('40000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000004',
 'Phạm Minh Đức', '0969444004', '1996-05-28', 'Hà Nội',
 'Senior Mobile Developer 4 năm kinh nghiệm iOS/Android native và React Native. Đã phát hành 10+ app.',
 30000000, 4),
('40000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000005',
 'Võ Thị Phương', '0941555005', '2001-09-15', 'TP.HCM',
 'Fresher .NET Developer mới tốt nghiệp ĐH CNTT TP.HCM. Đã hoàn thành 2 internship với ASP.NET Core.',
 12000000, 0);

-- ── COMPANIES ──────────────────────────────────────────────────
INSERT INTO companies (id, user_id, name, industry, size, logo_url, website, description, address, rating, is_verified) VALUES
('50000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001',
 'TechViet JSC', 'Công nghệ Thông tin', '200-500',
 NULL, 'https://techviet.vn',
 'Công ty công nghệ hàng đầu Việt Nam, chuyên giải pháp Fintech và E-commerce. Thành lập 2015, hơn 350 nhân viên. Văn hóa startup năng động, đề cao đổi mới sáng tạo. Đã huy động Series B 15 triệu USD.',
 'Tầng 8, Tòa nhà TechViet, 123 Lê Lợi, Quận 1, TP.HCM',
 4.5, true),
('50000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002',
 'FinTech Solutions Vietnam', 'Tài chính - Ngân hàng', '50-200',
 NULL, 'https://fintechvn.vn',
 'Startup Fintech tiên phong về thanh toán di động, blockchain và AI ứng dụng trong ngân hàng. Đội ngũ 120 người, huy động Series B, đối tác chiến lược với Visa và MasterCard.',
 'Tầng 12, Vincom Center, 72 Lê Thánh Tôn, Quận 1, TP.HCM',
 4.2, true),
('50000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000003',
 'VinCommerce', 'Bán lẻ', '500+',
 NULL, 'https://winmart.vn',
 'Tập đoàn bán lẻ lớn nhất Việt Nam với 3,500+ siêu thị WinMart và cửa hàng tiện lợi. Đang đẩy mạnh chuyển đổi số, xây dựng nền tảng omnichannel và data-driven supply chain.',
 'Tòa nhà Vincom, 191 Bà Triệu, Hai Bà Trưng, Hà Nội',
 4.0, true),
('50000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000004',
 'MB Bank', 'Ngân hàng', '500+',
 NULL, 'https://mbbank.com.vn',
 'Ngân hàng TMCP Quân đội – Top 5 ngân hàng tư nhân lớn nhất Việt Nam. App MBBank đạt 15 triệu người dùng. Đầu tư mạnh vào công nghệ, tuyển dụng IT tích cực để xây dựng ngân hàng số.',
 'Số 21 Cát Linh, Đống Đa, Hà Nội',
 4.3, true),
('50000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000005',
 'FPT Software', 'Công nghệ Thông tin', '500+',
 NULL, 'https://fptsoftware.com',
 'Công ty phần mềm lớn nhất Việt Nam với 30,000+ nhân sự tại 30 quốc gia. Cung cấp dịch vụ outsourcing cho Fortune 500. Chương trình đào tạo fresher và lộ trình thăng tiến rõ ràng hàng đầu thị trường.',
 'FPT Tower, 10 Phạm Văn Bạch, Cầu Giấy, Hà Nội',
 4.7, true);

-- ── JOB POSTINGS (10 jobs, đa dạng level/status) ───────────────
INSERT INTO job_postings (id, company_id, title, level, job_type, work_mode, location, salary_min, salary_max, currency, status, deadline, application_count) VALUES
-- Job 1: TechViet – Senior Full-stack (active, candidate1 đang interview vòng 2)
('60000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000001',
 'Senior Full-stack Developer (ReactJS/NodeJS)', 'Senior', 'Full-time', 'Hybrid',
 'TP.HCM', 35000000, 60000000, 'VND', 'active', '2026-06-30', 18),

-- Job 2: TechViet – Data Scientist (active, candidate2 được offered)
('60000000-0000-0000-0000-000000000002', '50000000-0000-0000-0000-000000000001',
 'Data Scientist (Machine Learning)', 'Mid-level', 'Full-time', 'Remote',
 'TP.HCM', 25000000, 42000000, 'VND', 'active', '2026-07-15', 12),

-- Job 3: FinTech – Mobile Developer (active, candidate4 vừa submitted)
('60000000-0000-0000-0000-000000000003', '50000000-0000-0000-0000-000000000002',
 'Senior Mobile App Developer (iOS/Android)', 'Senior', 'Full-time', 'Onsite',
 'TP.HCM', 32000000, 55000000, 'VND', 'active', '2026-06-20', 9),

-- Job 4: VinCommerce – DevOps (active, candidate3 đã accepted)
('60000000-0000-0000-0000-000000000004', '50000000-0000-0000-0000-000000000003',
 'DevOps/Cloud Engineer', 'Mid-level', 'Full-time', 'Hybrid',
 'Hà Nội', 28000000, 48000000, 'VND', 'active', '2026-05-31', 7),

-- Job 5: MB Bank – Java Backend (active, candidate4 đang reviewing)
('60000000-0000-0000-0000-000000000005', '50000000-0000-0000-0000-000000000004',
 'Java Backend Developer', 'Junior', 'Full-time', 'Onsite',
 'Hà Nội', 15000000, 25000000, 'VND', 'active', '2026-06-05', 16),

-- Job 6: FPT – .NET Fresher (active, candidate5 đang reviewing)
('60000000-0000-0000-0000-000000000006', '50000000-0000-0000-0000-000000000005',
 '.NET Developer (Fresher/Junior)', 'Fresher/Junior', 'Full-time', 'Hybrid',
 'Hà Nội', 10000000, 18000000, 'VND', 'active', '2026-06-25', 24),

-- Job 7: TechViet – UX/UI Designer (CLOSED – để demo job đã đóng trong app list)
('60000000-0000-0000-0000-000000000007', '50000000-0000-0000-0000-000000000001',
 'UX/UI Designer', 'Mid-level', 'Part-time', 'Remote',
 'Toàn quốc', 18000000, 32000000, 'VND', 'closed', '2026-04-30', 11),

-- Job 8: FinTech – QA Engineer (active, candidate1 vừa submitted)
('60000000-0000-0000-0000-000000000008', '50000000-0000-0000-0000-000000000002',
 'QA Automation Engineer', 'Senior', 'Full-time', 'Onsite',
 'TP.HCM', 30000000, 50000000, 'VND', 'active', '2026-07-01', 8),

-- Job 9: VinCommerce – Business Analyst (active, candidate5 đã withdrawn)
('60000000-0000-0000-0000-000000000009', '50000000-0000-0000-0000-000000000003',
 'Business Analyst (IT/Digital)', 'Mid-level', 'Full-time', 'Hybrid',
 'Hà Nội', 22000000, 38000000, 'VND', 'active', '2026-06-15', 13),

-- Job 10: FPT – AI/ML Engineer (active, candidate2 đang interview vòng 1)
('60000000-0000-0000-0000-00000000000a', '50000000-0000-0000-0000-000000000005',
 'AI/ML Engineer (LLM/GenAI)', 'Senior', 'Full-time', 'Remote',
 'Toàn quốc', 42000000, 75000000, 'VND', 'active', '2026-07-30', 6);

-- ── APPLICATIONS (covers ALL 7 statuses) ───────────────────────
INSERT INTO applications (id, candidate_id, job_id, company_id, status, cover_letter, applied_at) VALUES
-- APP 1: candidate1 → job1 (TechViet Full-stack) → INTERVIEW
--        Round 1 completed (score 8), Round 2 scheduled 2026-05-22
('70000000-0000-0000-0000-000000000001',
 '40000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000001',
 'interview',
 'Tôi có 5 năm kinh nghiệm với ReactJS và NodeJS, từng xây dựng hệ thống xử lý hơn 1 triệu request/ngày cho nền tảng thanh toán. Rất hứng thú với cơ hội đóng góp tại TechViet.',
 '2026-04-10 09:30:00'),

-- APP 2: candidate2 → job2 (TechViet Data Scientist) → OFFERED
--        2 vòng phỏng vấn đã hoàn thành, offer lương 38M
('70000000-0000-0000-0000-000000000002',
 '40000000-0000-0000-0000-000000000002', '60000000-0000-0000-0000-000000000002', '50000000-0000-0000-0000-000000000001',
 'offered',
 'Với bằng Thạc sĩ KHMT và 3 năm kinh nghiệm xây dựng ML models cho credit scoring và chống gian lận trong ngân hàng, tôi tin mình có thể đóng góp ngay vào các dự án AI của TechViet.',
 '2026-04-08 11:00:00'),

-- APP 3: candidate3 → job4 (VinCommerce DevOps) → ACCEPTED
--        Phỏng vấn xong, nhận offer và đồng ý
('70000000-0000-0000-0000-000000000003',
 '40000000-0000-0000-0000-000000000003', '60000000-0000-0000-0000-000000000004', '50000000-0000-0000-0000-000000000003',
 'accepted',
 'Tôi có 7 năm kinh nghiệm DevOps, chứng chỉ AWS Solutions Architect Professional và CKA. Đã thiết kế và vận hành hệ thống Kubernetes multi-region cho 50+ microservices. Rất muốn đóng góp vào chuyển đổi số của VinCommerce.',
 '2026-04-07 08:30:00'),

-- APP 4: candidate3 → job1 (TechViet Full-stack) → REJECTED
--        DevOps engineer không phù hợp vị trí Full-stack
('70000000-0000-0000-0000-000000000004',
 '40000000-0000-0000-0000-000000000003', '60000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000001',
 'rejected',
 NULL,
 '2026-04-06 13:15:00'),

-- APP 5: candidate2 → job10 (FPT AI/ML) → INTERVIEW
--        Vừa qua screening, phỏng vấn vòng 1 lịch 2026-05-24
('70000000-0000-0000-0000-000000000005',
 '40000000-0000-0000-0000-000000000002', '60000000-0000-0000-0000-00000000000a', '50000000-0000-0000-0000-000000000005',
 'interview',
 'Ngoài Data Science truyền thống, tôi đang nghiên cứu về LLM fine-tuning và RAG systems. Muốn tham gia đội AI Research của FPT để phát triển các sản phẩm AI thực chiến.',
 '2026-04-12 15:00:00'),

-- APP 6: candidate4 → job3 (FinTech Mobile) → SUBMITTED
--        Vừa nộp đơn hôm qua
('70000000-0000-0000-0000-000000000006',
 '40000000-0000-0000-0000-000000000004', '60000000-0000-0000-0000-000000000003', '50000000-0000-0000-0000-000000000002',
 'submitted',
 'Tôi có 4 năm kinh nghiệm phát triển iOS native (Swift) và Android (Kotlin), cùng React Native. 10+ app đã phát hành với rating trung bình 4.6/5. Rất hứng thú với cơ hội tại FinTech.',
 '2026-05-15 10:00:00'),

-- APP 7: candidate4 → job5 (MB Bank Java) → REVIEWING
--        HR đang xem xét hồ sơ
('70000000-0000-0000-0000-000000000007',
 '40000000-0000-0000-0000-000000000004', '60000000-0000-0000-0000-000000000005', '50000000-0000-0000-0000-000000000004',
 'reviewing',
 NULL,
 '2026-04-20 14:30:00'),

-- APP 8: candidate5 → job6 (FPT .NET Fresher) → REVIEWING
--        Đang xem xét, phỏng vấn bị huỷ 1 lần
('70000000-0000-0000-0000-000000000008',
 '40000000-0000-0000-0000-000000000005', '60000000-0000-0000-0000-000000000006', '50000000-0000-0000-0000-000000000005',
 'reviewing',
 'Tôi tốt nghiệp loại Giỏi ngành CNTT với GPA 3.2. Đã hoàn thành 2 internship .NET tại Software House Vietnam. Rất muốn được gia nhập FPT để phát triển sự nghiệp.',
 '2026-04-22 10:00:00'),

-- APP 9: candidate1 → job7 (TechViet UX – CLOSED job) → REJECTED
--        Job đã đóng, ứng viên bị từ chối
('70000000-0000-0000-0000-000000000009',
 '40000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000007', '50000000-0000-0000-0000-000000000001',
 'rejected',
 NULL,
 '2026-04-05 16:00:00'),

-- APP 10: candidate1 → job8 (FinTech QA) → SUBMITTED
--         Vừa nộp đơn hôm nay
('70000000-0000-0000-0000-00000000000a',
 '40000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000008', '50000000-0000-0000-0000-000000000002',
 'submitted',
 'Mặc dù background chính là Full-stack, tôi có kinh nghiệm viết test automation với Jest và Playwright. Muốn mở rộng sang QA Engineering.',
 '2026-05-16 08:30:00'),

-- APP 11: candidate5 → job9 (VinCommerce BA) → WITHDRAWN
--         Ứng viên tự rút hồ sơ
('70000000-0000-0000-0000-00000000000b',
 '40000000-0000-0000-0000-000000000005', '60000000-0000-0000-0000-000000000009', '50000000-0000-0000-0000-000000000003',
 'withdrawn',
 NULL,
 '2026-04-15 09:00:00');

-- ── INTERVIEWS (covers ALL 4 statuses + multiple rounds) ───────
-- Columns: id, application_id, candidate_id, job_id, company_id,
--          round, scheduled_at, duration_minutes, type,
--          location, meeting_link, interviewer, notes,
--          status, feedback, score
INSERT INTO interviews (id, application_id, candidate_id, job_id, company_id, round, scheduled_at, duration_minutes, type, location, meeting_link, interviewer, notes, status, feedback, score) VALUES

-- INT 1: app1 (candidate1 → TechViet Full-stack) Round 1 – COMPLETED
--        Technical interview đã hoàn thành, điểm 8
('80000000-0000-0000-0000-000000000001',
 '70000000-0000-0000-0000-000000000001',
 '40000000-0000-0000-0000-000000000001',
 '60000000-0000-0000-0000-000000000001',
 '50000000-0000-0000-0000-000000000001',
 1, '2026-04-25 14:00:00', 60, 'online',
 NULL, 'https://meet.google.com/tviet-001-r1',
 'Phạm Thanh Hải – Senior Engineer',
 'Technical round 1: React, Node.js, algorithm',
 'completed',
 'Ứng viên có kiến thức vững về React Hooks, Context API, và async patterns trong Node.js. Giải quyết bài toán LRU cache tốt. Cần đánh giá thêm về system design ở round 2.',
 8),

-- INT 2: app1 (candidate1 → TechViet Full-stack) Round 2 – SCHEDULED
--        System design + culture fit, sắp tới 2026-05-22
('80000000-0000-0000-0000-000000000002',
 '70000000-0000-0000-0000-000000000001',
 '40000000-0000-0000-0000-000000000001',
 '60000000-0000-0000-0000-000000000001',
 '50000000-0000-0000-0000-000000000001',
 2, '2026-05-22 10:00:00', 90, 'online',
 NULL, 'https://meet.google.com/tviet-001-r2',
 'Nguyễn Hùng Cường – CTO',
 'System design + cultural fit. Chuẩn bị case study về microservices scaling.',
 'scheduled',
 NULL, NULL),

-- INT 3: app2 (candidate2 → TechViet Data Sci) Round 1 – COMPLETED
--        Phone screening kỹ thuật, điểm 9
('80000000-0000-0000-0000-000000000003',
 '70000000-0000-0000-0000-000000000002',
 '40000000-0000-0000-0000-000000000002',
 '60000000-0000-0000-0000-000000000002',
 '50000000-0000-0000-0000-000000000001',
 1, '2026-04-22 10:00:00', 45, 'phone',
 NULL, NULL,
 'Lê Thị Kim Anh – Data Science Manager',
 'Phone screening: ML fundamentals, SQL, statistics',
 'completed',
 'Ứng viên xuất sắc về ML fundamentals. Giải thích rõ ràng bias-variance tradeoff, overfitting, cross-validation. SQL optimization query tốt. Strongly recommend đưa vào vòng 2.',
 9),

-- INT 4: app2 (candidate2 → TechViet Data Sci) Round 2 – COMPLETED
--        Final round có case study, điểm 9 → offer
('80000000-0000-0000-0000-000000000004',
 '70000000-0000-0000-0000-000000000002',
 '40000000-0000-0000-0000-000000000002',
 '60000000-0000-0000-0000-000000000002',
 '50000000-0000-0000-0000-000000000001',
 2, '2026-04-29 15:00:00', 90, 'online',
 NULL, 'https://meet.google.com/tviet-002-r2',
 'Trần Minh Khoa – CTO, Lê Thị Kim Anh – DS Manager',
 'Final round: case study presentation + team fit',
 'completed',
 'Bài trình bày fraud detection model ấn tượng, hiểu rõ business context và business impact. Giải quyết cold-start problem sáng tạo. Recommend offer 38M VND.',
 9),

-- INT 5: app3 (candidate3 → VinCommerce DevOps) Round 1 – COMPLETED
--        Onsite technical, điểm 8 → offer → accepted
('80000000-0000-0000-0000-000000000005',
 '70000000-0000-0000-0000-000000000003',
 '40000000-0000-0000-0000-000000000003',
 '60000000-0000-0000-0000-000000000004',
 '50000000-0000-0000-0000-000000000003',
 1, '2026-04-21 09:00:00', 75, 'offline',
 'Tầng 5, VinCommerce HQ, 191 Bà Triệu, Hà Nội', NULL,
 'Đinh Quang Nam – Head of Infrastructure',
 'Onsite: Kubernetes architecture, Terraform, AWS',
 'completed',
 'Kinh nghiệm AWS và Kubernetes rất ấn tượng. Demo live Terraform module để provision EKS cluster thành công. Kiến trúc CI/CD đề xuất rất hợp lý. Extend offer trong range lương. Ứng viên đã đồng ý.',
 8),

-- INT 6: app5 (candidate2 → FPT AI/ML) Round 1 – SCHEDULED
--        Phỏng vấn sắp tới 2026-05-24
('80000000-0000-0000-0000-000000000006',
 '70000000-0000-0000-0000-000000000005',
 '40000000-0000-0000-0000-000000000002',
 '60000000-0000-0000-0000-00000000000a',
 '50000000-0000-0000-0000-000000000005',
 1, '2026-05-24 14:00:00', 60, 'online',
 NULL, 'https://teams.microsoft.com/l/meetup/fpt-ai-001',
 'Dr. Nguyễn Anh Tuấn – AI Research Lead',
 'Technical: ML/DL fundamentals, LLM, RAG systems',
 'scheduled',
 NULL, NULL),

-- INT 7: app8 (candidate5 → FPT .NET) Round 1 – CANCELLED
--        Ứng viên bận, lịch bị huỷ (đang xem xét reschedule)
('80000000-0000-0000-0000-000000000007',
 '70000000-0000-0000-0000-000000000008',
 '40000000-0000-0000-0000-000000000005',
 '60000000-0000-0000-0000-000000000006',
 '50000000-0000-0000-0000-000000000005',
 1, '2026-05-05 10:00:00', 60, 'online',
 NULL, 'https://teams.microsoft.com/l/meetup/fpt-net-005',
 'Trịnh Thị Phương – .NET Team Lead',
 'Online test + interview cơ bản về C# và .NET',
 'cancelled',
 'Ứng viên báo bận việc đột xuất. Đề nghị reschedule vào tuần sau.',
 NULL);

-- ── CANDIDATE PROFILES (denormalized cache) ────────────────────
INSERT INTO candidate_profiles (candidate_id, summary, skills) VALUES
('40000000-0000-0000-0000-000000000001',
 'Senior Full-stack Developer với 5 năm kinh nghiệm ReactJS và NodeJS.',
 '["JavaScript","TypeScript","React","Next.js","Node.js","Express","MongoDB","PostgreSQL","Redis","AWS","Docker","Git","GraphQL","Jest"]'),
('40000000-0000-0000-0000-000000000002',
 'Data Scientist 3 năm kinh nghiệm fintech, chuyên ML models và data pipeline.',
 '["Python","SQL","Pandas","NumPy","Scikit-learn","TensorFlow","PyTorch","Apache Spark","Tableau","AWS SageMaker","R","Jupyter"]'),
('40000000-0000-0000-0000-000000000003',
 'Senior DevOps/Cloud Engineer 7 năm, AWS và Kubernetes expert.',
 '["AWS","Kubernetes","Docker","Terraform","Jenkins","GitLab CI","ArgoCD","Prometheus","Grafana","Linux","Bash","Ansible","Python"]'),
('40000000-0000-0000-0000-000000000004',
 'Senior Mobile Developer 4 năm iOS/Android, đã phát hành 10+ app trên Store.',
 '["Swift","Kotlin","React Native","Flutter","iOS","Android","Firebase","REST APIs","GraphQL","Git","Fastlane","Xcode"]'),
('40000000-0000-0000-0000-000000000005',
 'Fresher .NET Developer mới ra trường, đã có 2 internship với ASP.NET Core.',
 '["C#",".NET Core","ASP.NET","Entity Framework","SQL Server","HTML","CSS","JavaScript","Git","Visual Studio","LINQ"]');

-- Refresh materialized view sau khi seed
REFRESH MATERIALIZED VIEW mv_pipeline_stats;

-- ── SEED COMPLETION SUMMARY ─────────────────────────────────────
DO $$
BEGIN
    RAISE NOTICE '==============================================';
    RAISE NOTICE '  SRS PostgreSQL Seed – Demo Data Loaded!';
    RAISE NOTICE '  Password: Demo@123456 (all accounts)';
    RAISE NOTICE '==============================================';
    RAISE NOTICE '  Users:        %', (SELECT COUNT(*) FROM users);
    RAISE NOTICE '  Candidates:   %', (SELECT COUNT(*) FROM candidates);
    RAISE NOTICE '  Companies:    %', (SELECT COUNT(*) FROM companies);
    RAISE NOTICE '  Job Postings: %', (SELECT COUNT(*) FROM job_postings);
    RAISE NOTICE '  Applications: %', (SELECT COUNT(*) FROM applications);
    RAISE NOTICE '  Interviews:   %', (SELECT COUNT(*) FROM interviews);
    RAISE NOTICE '==============================================';
END $$;
