-- =============================================================
-- PostgreSQL Seed Data – Smart Recruitment System
-- Vietnamese market data for development/testing
-- =============================================================

-- Clear existing data (for development)
TRUNCATE TABLE interviews RESTART IDENTITY CASCADE;
TRUNCATE TABLE applications RESTART IDENTITY CASCADE;
TRUNCATE TABLE candidate_profiles RESTART IDENTITY CASCADE;
TRUNCATE TABLE job_postings RESTART IDENTITY CASCADE;
TRUNCATE TABLE companies RESTART IDENTITY CASCADE;
TRUNCATE TABLE candidates RESTART IDENTITY CASCADE;
TRUNCATE TABLE users RESTART IDENTITY CASCADE;

-- Refresh materialized view
REFRESH MATERIALIZED VIEW mv_pipeline_stats;

-- ── USERS ──
INSERT INTO users (id, email, password_hash, role, is_active) VALUES
-- Candidates
('11111111-1111-1111-1111-111111111111', 'nguyenvana@example.com', '$$2a$12$.BYmq08IkIWwSxXnVw5fU.oHdAlLnUFCsqkE5uvs/vwHMtZwanAC6', 'candidate', true),
('22222222-2222-2222-2222-222222222222', 'tranthib@example.com', '$$2a$12$.BYmq08IkIWwSxXnVw5fU.oHdAlLnUFCsqkE5uvs/vwHMtZwanAC6', 'candidate', true),
('33333333-3333-3333-3333-333333333333', 'lethic@example.com', '$$2a$12$.BYmq08IkIWwSxXnVw5fU.oHdAlLnUFCsqkE5uvs/vwHMtZwanAC6', 'candidate', true),
('44444444-4444-4444-4444-444444444444', 'phamd@example.com', '$$2a$12$.BYmq08IkIWwSxXnVw5fU.oHdAlLnUFCsqkE5uvs/vwHMtZwanAC6', 'candidate', true),
('55555555-5555-5555-5555-555555555555', 'vane@example.com', '$$2a$12$.BYmq08IkIWwSxXnVw5fU.oHdAlLnUFCsqkE5uvs/vwHMtZwanAC6', 'candidate', true),
-- Recruiters
('66666666-6666-6666-6666-666666666666', 'hr@techviet.com', '$$2a$12$.BYmq08IkIWwSxXnVw5fU.oHdAlLnUFCsqkE5uvs/vwHMtZwanAC6', 'recruiter', true),
('77777777-7777-7777-7777-777777777777', 'tuyendung@fintech.vn', '$$2a$12$.BYmq08IkIWwSxXnVw5fU.oHdAlLnUFCsqkE5uvs/vwHMtZwanAC6', 'recruiter', true),
('88888888-8888-8888-8888-888888888888', 'hr@vincommerce.vn', '$$2a$12$.BYmq08IkIWwSxXnVw5fU.oHdAlLnUFCsqkE5uvs/vwHMtZwanAC6', 'recruiter', true),
('99999999-9999-9999-9999-999999999999', 'recruiter@mbbank.com', '$$2a$12$.BYmq08IkIWwSxXnVw5fU.oHdAlLnUFCsqkE5uvs/vwHMtZwanAC6', 'recruiter', true),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'talent@fpt.com', '$$2a$12$.BYmq08IkIWwSxXnVw5fU.oHdAlLnUFCsqkE5uvs/vwHMtZwanAC6', 'recruiter', true),
-- Admin
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'admin@recruitment.vn', '$$2a$12$.BYmq08IkIWwSxXnVw5fU.oHdAlLnUFCsqkE5uvs/vwHMtZwanAC6', 'admin', true);

-- ── CANDIDATES ──
INSERT INTO candidates (id, user_id, full_name, phone, date_of_birth, location, avatar_url, bio, expected_salary, years_experience) VALUES
('cccccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111',
 'Nguyễn Văn A', '0987123456', '1995-05-15', 'Hà Nội',
 'https://example.com/avatars/nguyen-a.jpg',
 'Lập trình viên Full-stack với 5 năm kinh nghiệm, chuyên về JavaScript/TypeScript, React, Node.js. Từng làm việc tại các công ty startup và doanh nghiệp lớn.',
 35000000, 5),

('dddddddd-dddd-dddd-dddd-dddddddddddd', '22222222-2222-2222-2222-222222222222',
 'Trần Thị B', '0978234567', '1998-08-22', 'TP.HCM',
 'https://example.com/avatars/tran-b.jpg',
 'Data Scientist với 3 năm kinh nghiệm trong fintech. Thành thạo Python, SQL, ML algorithms. Tốt nghiệp ĐH Bách Khoa Hà Nội.',
 28000000, 3),

('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '33333333-3333-3333-3333-333333333333',
 'Lê Thị C', '0918345678', '1992-11-10', 'Đà Nẵng',
 'https://example.com/avatars/le-c.jpg',
 'Senior DevOps Engineer với 7 năm kinh nghiệm. Chuyên về AWS, Kubernetes, Docker, CI/CD. Có chứng chỉ AWS Solutions Architect.',
 45000000, 7),

('ffffffff-ffff-ffff-ffff-ffffffffffff', '44444444-4444-4444-4444-444444444444',
 'Phạm Văn D', '0969456789', '1996-03-28', 'Hà Nội',
 'https://example.com/avatars/pham-d.jpg',
 'Mobile Developer (iOS/Android) với 4 năm kinh nghiệm. Thành thạo Swift, Kotlin, React Native. Đã phát triển 10+ ứng dụng trên App Store.',
 30000000, 4),

('11111111-1111-1111-1111-111111111112', '55555555-5555-5555-5555-555555555555',
 'Văn Thị E', '0941567890', '2000-07-05', 'Cần Thơ',
 'https://example.com/avatars/van-e.jpg',
 'Fresher .NET Developer, mới tốt nghiệp ĐH Công nghệ TP.HCM. Có kiến thức về C#, ASP.NET, SQL Server, Entity Framework.',
 12000000, 0);

-- ── COMPANIES ──
INSERT INTO companies (id, user_id, name, industry, size, logo_url, website, description, address, rating, is_verified) VALUES
('22222222-2222-2222-2222-222222222221', '66666666-6666-6666-6666-666666666666',
 'TechViet JSC', 'Công nghệ Thông tin', '200-500',
 'https://example.com/logos/techviet.png',
 'https://techviet.com',
 'Công ty công nghệ hàng đầu Việt Nam, chuyên về giải pháp Fintech và E-commerce. Thành lập 2015 với hơn 300 nhân viên.',
 'Tòa nhà TechViet, 123 Lê Lợi, Quận 1, TP.HCM',
 4.5, true),

('22222222-2222-2222-2222-222222222222', '77777777-7777-7777-7777-777777777777',
 'FinTech Solutions Vietnam', 'Tài chính - Ngân hàng', '50-200',
 'https://example.com/logos/fintechvn.jpg',
 'https://fintech.vn',
 'Startup Fintech tiên phong trong lĩnh vực thanh toán di động và blockchain tại Việt Nam.',
 'Tầng 12, Vincom Center, 72 Lê Thánh Tôn, Quận 1, TP.HCM',
 4.2, true),

('22222222-2222-2222-2222-222222222223', '88888888-8888-8888-8888-888888888888',
 'VinCommerce', 'Bán lẻ', '500+',
 'https://example.com/logos/vincommerce.png',
 'https://vincommerce.vn',
 'Tập đoàn bán lẻ lớn nhất Việt Nam với hệ thống siêu thị VinMart và cửa hàng tiện lợi trên toàn quốc.',
 'Tòa nhà Vincom, 191 Bà Triệu, Hà Nội',
 4.0, true),

('22222222-2222-2222-2222-222222222224', '99999999-9999-9999-9999-999999999999',
 'MB Bank', 'Ngân hàng', '500+',
 'https://example.com/logos/mbbank.png',
 'https://mbbank.com',
 'Ngân hàng TMCP Quân đội, một trong những ngân hàng thương mại lớn nhất Việt Nam.',
 'Số 21 Láng Hạ, Đống Đa, Hà Nội',
 4.3, true),

('22222222-2222-2222-2222-222222222225', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
 'FPT Software', 'Công nghệ Thông tin', '500+',
 'https://example.com/logos/fpt-software.png',
 'https://fptsoftware.com',
 'Công ty phần mềm lớn nhất Việt Nam, cung cấp dịch vụ outsourcing cho các tập đoàn toàn cầu.',
 'FPT Tower, 10 Phạm Văn Bạch, Cầu Giấy, Hà Nội',
 4.7, true);

-- ── JOB POSTINGS ──
INSERT INTO job_postings (id, company_id, title, level, job_type, work_mode, location, salary_min, salary_max, currency, status, deadline, view_count, application_count) VALUES
('33333333-3333-3333-3333-333333333331', '22222222-2222-2222-2222-222222222221',
 'Senior Full-stack Developer (ReactJS/NodeJS)', 'Senior', 'Full-time', 'Hybrid',
 'Hà Nội', 35000000, 60000000, 'VND', 'active', '2026-05-30', 245, 18),

('33333333-3333-3333-3333-333333333332', '22222222-2222-2222-2222-222222222221',
 'Data Scientist', 'Mid-level', 'Full-time', 'Remote',
 'TP.HCM', 25000000, 40000000, 'VND', 'active', '2026-06-15', 189, 12),

('33333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222',
 'Mobile App Developer (iOS/Android)', 'Senior', 'Full-time', 'Onsite',
 'Đà Nẵng', 30000000, 50000000, 'VND', 'active', '2026-05-25', 156, 8),

('33333333-3333-3333-3333-333333333334', '22222222-2222-2222-2222-222222222223',
 'DevOps Engineer', 'Mid-level', 'Full-time', 'Hybrid',
 'Hà Nội', 28000000, 45000000, 'VND', 'active', '2026-06-10', 134, 6),

('33333333-3333-3333-3333-333333333335', '22222222-2222-2222-2222-222222222224',
 'Java Backend Developer', 'Junior', 'Full-time', 'Onsite',
 'TP.HCM', 15000000, 25000000, 'VND', 'active', '2026-05-20', 98, 15),

('33333333-3333-3333-3333-333333333336', '22222222-2222-2222-2222-222222222225',
 '.NET Developer', 'Fresher/Junior', 'Full-time', 'Hybrid',
 'Hà Nội', 10000000, 18000000, 'VND', 'active', '2026-06-05', 76, 20),

('33333333-3333-3333-3333-333333333337', '22222222-2222-2222-2222-222222222221',
 'UX/UI Designer', 'Mid-level', 'Part-time', 'Remote',
 'Toàn quốc', 20000000, 35000000, 'VND', 'active', '2026-05-28', 112, 9),

('33333333-3333-3333-3333-333333333338', '22222222-2222-2222-2222-222222222222',
 'QA Automation Engineer', 'Senior', 'Full-time', 'Onsite',
 'TP.HCM', 32000000, 48000000, 'VND', 'active', '2026-06-12', 89, 7),

('33333333-3333-3333-3333-333333333339', '22222222-2222-2222-2222-222222222223',
 'Business Analyst (IT Projects)', 'Mid-level', 'Full-time', 'Hybrid',
 'Hà Nội', 22000000, 38000000, 'VND', 'active', '2026-06-01', 145, 11),

('33333333-3333-3333-3333-333333333330', '22222222-2222-2222-2222-222222222225',
 'AI/ML Engineer', 'Senior', 'Full-time', 'Remote',
 'Toàn quốc', 40000000, 65000000, 'VND', 'active', '2026-06-20', 167, 5);

-- ── APPLICATIONS ──
INSERT INTO applications (id, candidate_id, job_id, company_id, status, cover_letter, applied_at) VALUES
-- Candidate 1 applied to 3 jobs
('44444444-4444-4444-4444-444444444441', 'cccccccc-cccc-cccc-cccc-cccccccccccc',
 '33333333-3333-3333-3333-333333333331', '22222222-2222-2222-2222-222222222221',
 'interview', 'Tôi có kinh nghiệm 5 năm với React và Node.js, phù hợp với yêu cầu công việc.',
 '2026-04-20 09:30:00'),

('44444444-4444-4444-4444-444444444442', 'cccccccc-cccc-cccc-cccc-cccccccccccc',
 '33333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222',
 'submitted', 'Tôi có kinh nghiệm phát triển ứng dụng di động với React Native.',
 '2026-04-21 14:15:00'),

('44444444-4444-4444-4444-444444444443', 'cccccccc-cccc-cccc-cccc-cccccccccccc',
 '33333333-3333-3333-3333-333333333338', '22222222-2222-2222-2222-222222222222',
 'reviewing', NULL, '2026-04-22 10:45:00'),

-- Candidate 2 applied to 2 jobs
('44444444-4444-4444-4444-444444444444', 'dddddddd-dddd-dddd-dddd-dddddddddddd',
 '33333333-3333-3333-3333-333333333332', '22222222-2222-2222-2222-222222222221',
 'offered', 'Tôi có bằng Thạc sĩ Data Science và 3 năm kinh nghiệm trong Fintech.',
 '2026-04-18 11:20:00'),

('44444444-4444-4444-4444-444444444445', 'dddddddd-dddd-dddd-dddd-dddddddddddd',
 '33333333-3333-3333-3333-333333333330', '22222222-2222-2222-2222-222222222225',
 'interview', NULL, '2026-04-19 16:30:00'),

-- Candidate 3 applied to 2 jobs
('44444444-4444-4444-4444-444444444446', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
 '33333333-3333-3333-3333-333333333334', '22222222-2222-2222-2222-222222222223',
 'accepted', 'Tôi có 7 năm kinh nghiệm DevOps và chứng chỉ AWS Solutions Architect.',
 '2026-04-17 08:45:00'),

('44444444-4444-4444-4444-444444444447', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
 '33333333-3333-3333-3333-333333333331', '22222222-2222-2222-2222-222222222221',
 'rejected', NULL, '2026-04-16 13:10:00'),

-- Candidate 4 applied to 1 job
('44444444-4444-4444-4444-444444444448', 'ffffffff-ffff-ffff-ffff-ffffffffffff',
 '33333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222',
 'withdrawn', NULL, '2026-04-15 09:00:00'),

-- Candidate 5 applied to 1 job
('44444444-4444-4444-4444-444444444449', '11111111-1111-1111-1111-111111111112',
 '33333333-3333-3333-3333-333333333336', '22222222-2222-2222-2222-222222222225',
 'reviewing', 'Tôi mới tốt nghiệp và rất mong muốn được làm việc tại FPT Software.',
 '2026-04-23 10:00:00');

-- ── INTERVIEWS ──
INSERT INTO interviews (id, application_id, candidate_id, job_id, company_id, round, scheduled_at, duration_minutes, type, location, meeting_link, interviewer, status, feedback, score) VALUES
-- Interview for Candidate 1
('55555555-5555-5555-5555-555555555551', '44444444-4444-4444-4444-444444444441',
 'cccccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333331',
 '22222222-2222-2222-2222-222222222221', 1,
 '2026-04-25 14:00:00', 60, 'online',
 NULL, 'https://meet.google.com/abc-defg-hij', 'Trần Văn H - Tech Lead',
 'completed', 'Ứng viên có kiến thức tốt về React Hooks và Node.js performance optimization. Cần cải thiện về system design.', 8),

-- Interview for Candidate 2
('55555555-5555-5555-5555-555555555552', '44444444-4444-4444-4444-444444444444',
 'dddddddd-dddd-dddd-dddd-dddddddddddd', '33333333-3333-3333-3333-333333333332',
 '22222222-2222-2222-2222-222222222221', 1,
 '2026-04-26 10:00:00', 45, 'phone',
 NULL, NULL, 'Lê Thị K - Data Science Manager',
 'completed', 'Ứng viên có kiến thức vững về ML algorithms và SQL optimization. Phù hợp với vị trí.', 9),

-- Interview for Candidate 2 (second round)
('55555555-5555-5555-5555-555555555553', '44444444-4444-4444-4444-444444444444',
 'dddddddd-dddd-dddd-dddd-dddddddddddd', '33333333-3333-3333-3333-333333333332',
 '22222222-2222-2222-2222-222222222221', 2,
 '2026-05-02 15:30:00', 90, 'online',
 NULL, 'https://meet.google.com/xyz-uvw-rst', 'Nguyễn Văn M - CTO',
 'scheduled', NULL, NULL),

-- Interview for Candidate 3
('55555555-5555-5555-5555-555555555554', '44444444-4444-4444-4444-444444444446',
 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '33333333-3333-3333-3333-333333333334',
 '22222222-2222-2222-2222-222222222223', 1,
 '2026-04-24 09:00:00', 75, 'offline',
 'Tầng 7, Tòa nhà Vincom, 191 Bà Triệu, Hà Nội', NULL, 'Phạm Quang N - Head of DevOps',
 'completed', 'Kinh nghiệm AWS và Kubernetes rất tốt. Đề xuất salary trong range.', 8),

-- Upcoming interview for Candidate 5
('55555555-5555-5555-5555-555555555555', '44444444-4444-4444-4444-444444444449',
 '11111111-1111-1111-1111-111111111112', '33333333-3333-3333-3333-333333333336',
 '22222222-2222-2222-2222-222222222225', 1,
 '2026-05-03 13:00:00', 60, 'online',
 NULL, 'https://teams.microsoft.com/l/meetup-join/12345', 'Trịnh Thị P - .NET Team Lead',
 'scheduled', NULL, NULL);

-- ── CANDIDATE PROFILES (denormalized) ──
INSERT INTO candidate_profiles (candidate_id, summary, skills) VALUES
('cccccccc-cccc-cccc-cccc-cccccccccccc',
 'Senior Full-stack Developer với kinh nghiệm xây dựng ứng dụng web quy mô lớn.',
 '["JavaScript", "TypeScript", "React", "Node.js", "Express", "MongoDB", "PostgreSQL", "AWS", "Docker", "Git"]'),

('dddddddd-dddd-dddd-dddd-dddddddddddd',
 'Data Scientist chuyên về predictive modeling và data pipeline.',
 '["Python", "SQL", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "PyTorch", "Apache Spark", "Tableau", "AWS SageMaker"]'),

('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
 'DevOps Engineer với expertise trong cloud infrastructure và automation.',
 '["AWS", "Kubernetes", "Docker", "Terraform", "Jenkins", "GitLab CI", "Prometheus", "Grafana", "Linux", "Bash"]'),

('ffffffff-ffff-ffff-ffff-ffffffffffff',
 'Mobile Developer với experience trong native và cross-platform development.',
 '["Swift", "Kotlin", "React Native", "Flutter", "iOS", "Android", "Firebase", "REST APIs", "Git", "CI/CD"]'),

('11111111-1111-1111-1111-111111111112',
 'Junior .NET Developer mới tốt nghiệp, nhiệt huyết với công nghệ.',
 '["C#", ".NET Core", "ASP.NET", "Entity Framework", "SQL Server", "HTML/CSS", "JavaScript", "Git", "Visual Studio"]');

-- Refresh materialized view after seeding
REFRESH MATERIALIZED VIEW mv_pipeline_stats;

-- ── SEED COMPLETION MESSAGE ──
DO $$
BEGIN
    RAISE NOTICE '✅ PostgreSQL seed data inserted successfully!';
    RAISE NOTICE '   - Users: %', (SELECT COUNT(*) FROM users);
    RAISE NOTICE '   - Candidates: %', (SELECT COUNT(*) FROM candidates);
    RAISE NOTICE '   - Companies: %', (SELECT COUNT(*) FROM companies);
    RAISE NOTICE '   - Job Postings: %', (SELECT COUNT(*) FROM job_postings);
    RAISE NOTICE '   - Applications: %', (SELECT COUNT(*) FROM applications);
    RAISE NOTICE '   - Interviews: %', (SELECT COUNT(*) FROM interviews);
END $$;
