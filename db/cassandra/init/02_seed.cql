-- =============================================================
-- Cassandra Seed Data – Smart Recruitment System
-- Analytics and time-series data for development/testing
-- =============================================================

USE srs_events;

-- Disable batch warnings for seed data
TRUNCATE user_activity_log;
TRUNCATE search_history;
TRUNCATE notification_log;

-- Note: We cannot TRUNCATE counter tables, but they will be empty initially

-- ─── USER ACTIVITY LOG ────────────────────────────────────────
-- Seed user activity data for the past 7 days

-- User 1 activities (Nguyễn Văn A - Candidate)
INSERT INTO user_activity_log (user_id, event_date, event_time, event_id, event_type, entity_id, entity_type, metadata, ip_address, user_agent) VALUES
('11111111-1111-1111-1111-111111111111', '2026-04-16', '2026-04-16 09:30:00', uuid(), 'login', NULL, NULL, '{"device": "chrome", "location": "Hà Nội"}', '192.168.1.100', 'Mozilla/5.0'),
('11111111-1111-1111-1111-111111111111', '2026-04-16', '2026-04-16 10:15:00', uuid(), 'search', NULL, NULL, '{"query": "react developer", "filters": {"location": "hanoi", "salary_min": 30000000}}', '192.168.1.100', 'Mozilla/5.0'),
('11111111-1111-1111-1111-111111111111', '2026-04-16', '2026-04-16 10:20:00', uuid(), 'view_job', '33333333-3333-3333-3333-333333333331', 'job', '{"duration_seconds": 120}', '192.168.1.100', 'Mozilla/5.0'),
('11111111-1111-1111-1111-111111111111', '2026-04-17', '2026-04-17 14:30:00', uuid(), 'apply', '33333333-3333-3333-3333-333333333331', 'job', '{"application_id": "44444444-4444-4444-4444-444444444441"}', '192.168.1.100', 'Mozilla/5.0'),
('11111111-1111-1111-1111-111111111111', '2026-04-18', '2026-04-18 11:45:00', uuid(), 'view_job', '33333333-3333-3333-3333-333333333333', 'job', '{"duration_seconds": 90}', '192.168.1.100', 'Mozilla/5.0'),
('11111111-1111-1111-1111-111111111111', '2026-04-18', '2026-04-18 12:00:00', uuid(), 'apply', '33333333-3333-3333-3333-333333333333', 'job', '{"application_id": "44444444-4444-4444-4444-444444444442"}', '192.168.1.100', 'Mozilla/5.0'),
('11111111-1111-1111-1111-111111111111', '2026-04-20', '2026-04-20 08:30:00', uuid(), 'login', NULL, NULL, '{"device": "mobile", "location": "Hà Nội"}', '192.168.1.101', 'Mobile Safari'),
('11111111-1111-1111-1111-111111111111', '2026-04-20', '2026-04-20 09:00:00', uuid(), 'click', '22222222-2222-2222-2222-222222222221', 'company', '{"page": "company_profile"}', '192.168.1.101', 'Mobile Safari'),
('11111111-1111-1111-1111-111111111111', '2026-04-21', '2026-04-21 15:20:00', uuid(), 'view_job', '33333333-3333-3333-3333-333333333338', 'job', '{"duration_seconds": 60}', '192.168.1.100', 'Mozilla/5.0'),
('11111111-1111-1111-1111-111111111111', '2026-04-21', '2026-04-21 15:30:00', uuid(), 'apply', '33333333-3333-3333-3333-333333333338', 'job', '{"application_id": "44444444-4444-4444-4444-444444444443"}', '192.168.1.100', 'Mozilla/5.0');

-- User 2 activities (Trần Thị B - Data Scientist)
INSERT INTO user_activity_log (user_id, event_date, event_time, event_id, event_type, entity_id, entity_type, metadata, ip_address, user_agent) VALUES
('22222222-2222-2222-2222-222222222222', '2026-04-15', '2026-04-15 13:45:00', uuid(), 'login', NULL, NULL, '{"device": "chrome", "location": "TP.HCM"}', '203.162.1.50', 'Mozilla/5.0'),
('22222222-2222-2222-2222-222222222222', '2026-04-15', '2026-04-15 14:00:00', uuid(), 'search', NULL, NULL, '{"query": "data scientist remote", "filters": {"work_mode": "remote", "salary_min": 25000000}}', '203.162.1.50', 'Mozilla/5.0'),
('22222222-2222-2222-2222-222222222222', '2026-04-15', '2026-04-15 14:15:00', uuid(), 'view_job', '33333333-3333-3333-3333-333333333332', 'job', '{"duration_seconds": 180}', '203.162.1.50', 'Mozilla/5.0'),
('22222222-2222-2222-2222-222222222222', '2026-04-17', '2026-04-17 10:30:00', uuid(), 'apply', '33333333-3333-3333-3333-333333333332', 'job', '{"application_id": "44444444-4444-4444-4444-444444444444"}', '203.162.1.50', 'Mozilla/5.0'),
('22222222-2222-2222-2222-222222222222', '2026-04-18', '2026-04-18 16:20:00', uuid(), 'login', NULL, NULL, '{"device": "firefox", "location": "TP.HCM"}', '203.162.1.51', 'Firefox/120'),
('22222222-2222-2222-2222-222222222222', '2026-04-18', '2026-04-18 16:30:00', uuid(), 'search', NULL, NULL, '{"query": "machine learning engineer", "filters": {"location": "hcm", "experience": "senior"}}', '203.162.1.51', 'Firefox/120'),
('22222222-2222-2222-2222-222222222222', '2026-04-18', '2026-04-18 16:45:00', uuid(), 'view_job', '33333333-3333-3333-3333-333333333330', 'job', '{"duration_seconds": 150}', '203.162.1.51', 'Firefox/120'),
('22222222-2222-2222-2222-222222222222', '2026-04-19', '2026-04-19 09:15:00', uuid(), 'apply', '33333333-3333-3333-3333-333333333330', 'job', '{"application_id": "44444444-4444-4444-4444-444444444445"}', '203.162.1.50', 'Mozilla/5.0'),
('22222222-2222-2222-2222-222222222222', '2026-04-20', '2026-04-20 11:00:00', uuid(), 'view_job', '33333333-3333-3333-3333-333333333331', 'job', '{"duration_seconds": 45}', '203.162.1.50', 'Mozilla/5.0'),
('22222222-2222-2222-2222-222222222222', '2026-04-22', '2026-04-22 14:10:00', uuid(), 'click', '22222222-2222-2222-2222-222222222225', 'company', '{"page": "company_reviews"}', '203.162.1.50', 'Mozilla/5.0');

-- User 3 activities (Lê Thị C - DevOps)
INSERT INTO user_activity_log (user_id, event_date, event_time, event_id, event_type, entity_id, entity_type, metadata, ip_address, user_agent) VALUES
('33333333-3333-3333-3333-333333333333', '2026-04-14', '2026-04-14 08:20:00', uuid(), 'login', NULL, NULL, '{"device": "chrome", "location": "Đà Nẵng"}', '118.70.1.25', 'Mozilla/5.0'),
('33333333-3333-3333-3333-333333333333', '2026-04-14', '2026-04-14 08:45:00', uuid(), 'search', NULL, NULL, '{"query": "devops engineer kubernetes", "filters": {"location": "danang", "salary_min": 40000000}}', '118.70.1.25', 'Mozilla/5.0'),
('33333333-3333-3333-3333-333333333333', '2026-04-14', '2026-04-14 09:10:00', uuid(), 'view_job', '33333333-3333-3333-3333-333333333334', 'job', '{"duration_seconds": 200}', '118.70.1.25', 'Mozilla/5.0'),
('33333333-3333-3333-3333-333333333333', '2026-04-16', '2026-04-16 15:30:00', uuid(), 'apply', '33333333-3333-3333-3333-333333333334', 'job', '{"application_id": "44444444-4444-4444-4444-444444444446"}', '118.70.1.25', 'Mozilla/5.0'),
('33333333-3333-3333-3333-333333333333', '2026-04-16', '2026-04-16 16:00:00', uuid(), 'view_job', '33333333-3333-3333-3333-333333333331', 'job', '{"duration_seconds": 90}', '118.70.1.25', 'Mozilla/5.0'),
('33333333-3333-3333-3333-333333333333', '2026-04-17', '2026-04-17 13:20:00', uuid(), 'apply', '33333333-3333-3333-3333-333333333331', 'job', '{"application_id": "44444444-4444-4444-4444-444444444447"}', '118.70.1.25', 'Mozilla/5.0'),
('33333333-3333-3333-3333-333333333333', '2026-04-19', '2026-04-19 10:45:00', uuid(), 'login', NULL, NULL, '{"device": "mobile", "location": "Đà Nẵng"}', '118.70.1.26', 'Mobile Safari'),
('33333333-3333-3333-3333-333333333333', '2026-04-19', '2026-04-19 11:00:00', uuid(), 'search', NULL, NULL, '{"query": "senior devops", "filters": {"work_mode": "remote"}}', '118.70.1.26', 'Mobile Safari'),
('33333333-3333-3333-3333-333333333333', '2026-04-20', '2026-04-20 14:30:00', uuid(), 'click', '22222222-2222-2222-2222-222222222223', 'company', '{"page": "jobs_list"}', '118.70.1.25', 'Mozilla/5.0'),
('33333333-3333-3333-3333-333333333333', '2026-04-21', '2026-04-21 09:15:00', uuid(), 'view_job', '33333333-3333-3333-3333-333333333339', 'job', '{"duration_seconds": 75}', '118.70.1.25', 'Mozilla/5.0');

-- User 5 activities (Văn Thị E - Fresher)
INSERT INTO user_activity_log (user_id, event_date, event_time, event_id, event_type, entity_id, entity_type, metadata, ip_address, user_agent) VALUES
('55555555-5555-5555-5555-555555555555', '2026-04-20', '2026-04-20 08:00:00', uuid(), 'register', NULL, NULL, '{"source": "google", "campaign": "fresher_2026"}', '171.244.1.80', 'Mozilla/5.0'),
('55555555-5555-5555-5555-555555555555', '2026-04-20', '2026-04-20 08:30:00', uuid(), 'complete_profile', NULL, NULL, '{"profile_completion": 85}', '171.244.1.80', 'Mozilla/5.0'),
('55555555-5555-5555-5555-555555555555', '2026-04-21', '2026-04-21 09:45:00', uuid(), 'login', NULL, NULL, '{"device": "chrome", "location": "Cần Thơ"}', '171.244.1.80', 'Mozilla/5.0'),
('55555555-5555-5555-5555-555555555555', '2026-04-21', '2026-04-21 10:00:00', uuid(), 'search', NULL, NULL, '{"query": ".NET fresher", "filters": {"location": "hanoi", "job_type": "full-time"}}', '171.244.1.80', 'Mozilla/5.0'),
('55555555-5555-5555-5555-555555555555', '2026-04-21', '2026-04-21 10:15:00', uuid(), 'view_job', '33333333-3333-3333-3333-333333333336', 'job', '{"duration_seconds": 120}', '171.244.1.80', 'Mozilla/5.0'),
('55555555-5555-5555-5555-555555555555', '2026-04-21', '2026-04-21 10:30:00', uuid(), 'view_job', '33333333-3333-3333-3333-333333333335', 'job', '{"duration_seconds": 60}', '171.244.1.80', 'Mozilla/5.0'),
('55555555-5555-5555-5555-555555555555', '2026-04-22', '2026-04-22 13:20:00', uuid(), 'login', NULL, NULL, '{"device": "mobile", "location": "Cần Thơ"}', '171.244.1.81', 'Mobile Safari'),
('55555555-5555-5555-5555-555555555555', '2026-04-22', '2026-04-22 13:45:00', uuid(), 'search', NULL, NULL, '{"query": "junior developer training", "filters": {"experience": "fresher"}}', '171.244.1.81', 'Mobile Safari'),
('55555555-5555-5555-5555-555555555555', '2026-04-22', '2026-04-22 14:00:00', uuid(), 'click', '22222222-2222-2222-2222-222222222225', 'company', '{"page": "company_profile"}', '171.244.1.81', 'Mobile Safari'),
('55555555-5555-5555-5555-555555555555', '2026-04-23', '2026-04-23 10:00:00', uuid(), 'apply', '33333333-3333-3333-3333-333333333336', 'job', '{"application_id": "44444444-4444-4444-4444-444444444449"}', '171.244.1.80', 'Mozilla/5.0');

-- Recruiter activities
INSERT INTO user_activity_log (user_id, event_date, event_time, event_id, event_type, entity_id, entity_type, metadata, ip_address, user_agent) VALUES
('66666666-6666-6666-6666-666666666666', '2026-04-16', '2026-04-16 08:30:00', uuid(), 'login', NULL, NULL, '{"device": "chrome", "role": "recruiter"}', '203.162.2.10', 'Mozilla/5.0'),
('66666666-6666-6666-6666-666666666666', '2026-04-16', '2026-04-16 09:00:00', uuid(), 'post_job', '33333333-3333-3333-3333-333333333331', 'job', '{"title": "Senior Full-stack Developer", "status": "draft"}', '203.162.2.10', 'Mozilla/5.0'),
('66666666-6666-6666-6666-666666666666', '2026-04-17', '2026-04-17 10:15:00', uuid(), 'view_candidate', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'candidate', '{"duration_seconds": 180}', '203.162.2.10', 'Mozilla/5.0'),
('66666666-6666-6666-6666-666666666666', '2026-04-17', '2026-04-17 11:00:00', uuid(), 'search', NULL, NULL, '{"query": "react senior", "filters": {"experience": "5+", "location": "hanoi"}}', '203.162.2.10', 'Mozilla/5.0'),
('66666666-6666-6666-6666-666666666666', '2026-04-18', '2026-04-18 14:30:00', uuid(), 'schedule_interview', '55555555A555-5555-5555-5555-555555555551', 'interview', '{"candidate": "Nguyễn Văn A", "job": "Senior Full-stack Developer"}', '203.162.2.10', 'Mozilla/5.0'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '2026-04-01', '2026-04-01 09:00:00', uuid(), 'login', NULL, NULL, '{"device": "chrome", "role": "recruiter"}', '118.69.3.20', 'Mozilla/5.0'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '2026-04-01', '2026-04-01 09:30:00', uuid(), 'post_job', '33333333A3333-3333-3333-3333-333333333336', 'job', '{"title": ".NET Developer (Fresher/Junior)", "status": "active"}', '118.69.3.20', 'Mozilla/5.0'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '2026-04-23', '2026-04-23 11:30:00', uuid(), 'view_candidate', '11111111-1111-1111-1111-111111111112', 'candidate', '{"duration_seconds": 120}', '118.69.3.20', 'Mozilla/5.0'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '2026-04-23', '2026-04-23 11:45:00', uuid(), 'search', NULL, NULL, '{"query": ".NET fresher", "filters": {"location": "hanoi"}}', '118.69.3.20', 'Mozilla/5.0'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '2026-04-23', '2026-04-23 12:00:00', uuid(), 'schedule_interview', '55555555A555-5555-5555-5555-555555555555', 'interview', '{"candidate": "Văn Thị E", "job": ".NET Developer"}', '118.69.3.20', 'Mozilla/5.0');

-- ─── SEARCH HISTORY ───────────────────────────────────────────
-- Search queries for AI recommendation improvement

-- User 1 search history
INSERT INTO search_history (user_id, search_date, searched_at, search_id, query, filters, result_count, clicked_ids) VALUES
('11111111-1111-1111-1111-111111111111', '2026-04-16', '2026-04-16 10:15:00', uuid(),
 'react developer',
 '{"location": "hanoi", "salary_min": 30000000, "experience": "senior"}',
 15,
 ['33333333-3333-3333-3333-333333333331', '33333333-3333-3333-3333-333333333337']);

-- User 2 search history
INSERT INTO search_history (user_id, search_date, searched_at, search_id, query, filters, result_count, clicked_ids) VALUES
('22222222-2222-2222-2222-222222222222', '2026-04-15', '2026-04-15 14:00:00', uuid(),
 'data scientist remote',
 '{"work_mode": "remote", "salary_min": 25000000, "skills": ["python", "machine learning"]}',
 8,
 ['33333333-3333-3333-3333-333333333332', '33333333-3333-3333-3333-333333333330']),
('22222222-2222-2222-2222-222222222222', '2026-04-18', '2026-04-18 16:30:00', uuid(),
 'machine learning engineer',
 '{"location": "hcm", "experience": "senior", "salary_min": 35000000}',
 12,
 ['33333333-3333-3333-3333-333333333330']);

-- User 3 search history
INSERT INTO search_history (user_id, search_date, searched_at, search_id, query, filters, result_count, clicked_ids) VALUES
('33333333-3333-3333-3333-333333333333', '2026-04-14', '2026-04-14 08:45:00', uuid(),
 'devops engineer kubernetes',
 '{"location": "danang", "salary_min": 40000000, "skills": ["aws", "docker", "kubernetes"]}',
 6,
 ['33333333-3333-3333-3333-333333333334', '33333333-3333-3333-3333-333333333331']),
('33333333-3333-3333-3333-333333333333', '2026-04-19', '2026-04-19 11:00:00', uuid(),
 'senior devops',
 '{"work_mode": "remote", "salary_min": 45000000, "experience": "5+"}',
 9,
 ['33333333-3333-3333-3333-333333333334', '33333333-3333-3333-3333-333333333339']);

-- User 5 search history
INSERT INTO search_history (user_id, search_date, searched_at, search_id, query, filters, result_count, clicked_ids) VALUES
('55555555-5555-5555-5555-555555555555', '2026-04-21', '2026-04-21 10:00:00', uuid(),
 '.NET fresher',
 '{"location": "hanoi", "job_type": "full-time", "experience": "fresher"}',
 5,
 ['33333333-3333-3333-3333-333333333336', '33333333-3333-3333-3333-333333333335']),
('55555555-5555-5555-5555-555555555555', '2026-04-22', '2026-04-22 13:45:00', uuid(),
 'junior developer training',
 '{"experience": "fresher", "salary_min": 10000000, "skills": ["csharp", "dotnet"]}',
 7,
 ['33333333-3333-3333-3333-333333333336']);

-- Recruiter search history
INSERT INTO search_history (user_id, search_date, searched_at, search_id, query, filters, result_count, clicked_ids) VALUES
('66666666-6666-6666-6666-666666666666', '2026-04-17', '2026-04-17 11:00:00', uuid(),
 'react senior',
 '{"experience": "5+", "location": "hanoi", "skills": ["react", "nodejs", "typescript"]}',
 8,
 ['cccccccc-cccc-cccc-cccc-cccccccccccc', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee']),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '2026-04-23', '2026-04-23 11:45:00', uuid(),
 '.NET fresher',
 '{"location": "hanoi", "experience": "0-2", "skills": ["csharp", "dotnet"]}',
 15,
 ['11111111-1111-1111-1111-111111111112', 'dddddddd-dddd-dddd-dddd-dddddddddddd']);

-- ─── NOTIFICATION LOG ─────────────────────────────────────────
-- Notification data for user engagement tracking

-- Notifications for User 1
INSERT INTO notification_log (user_id, notif_date, sent_at, notif_id, type, title, body, is_read, channel) VALUES
('11111111-1111-1111-1111-111111111111', '2026-04-17', '2026-04-17 10:00:00', uuid(),
 'app_update',
 'Ứng dụng của bạn đã được cập nhật trạng thái',
 'Hồ sơ ứng tuyển cho vị trí Senior Full-stack Developer đã chuyển sang vòng phỏng vấn.',
 true,
 'email'),
('11111111-1111-1111-1111-111111111111', '2026-04-22', '2026-04-22 09:30:00', uuid(),
 'new_job',
 'Có công việc mới phù hợp với bạn',
 'Tuyển dụng Senior QA Automation Engineer tại TP.HCM - Lương: 32-48 triệu.',
 false,
 'push'),
('11111111-1111-1111-1111-111111111111', '2026-04-24', '2026-04-24 08:00:00', uuid(),
 'interview_reminder',
 'Nhắc nhở buổi phỏng vấn',
 'Bạn có buổi phỏng vấn với TechViet vào 14:00 ngày 25/04. Địa điểm: Online.',
 false,
 'sms');

-- Notifications for User 2
INSERT INTO notification_log (user_id, notif_date, sent_at, notif_id, type, title, body, is_read, channel) VALUES
('22222222-2222-2222-2222-222222222222', '2026-04-18', '2026-04-18 09:15:00', uuid(),
 'app_update',
 'Chúc mừng! Bạn đã được mời phỏng vấn',
 'TechViet đã mời bạn phỏng vấn cho vị trí Data Scientist. Vui lòng xác nhận lịch.',
 true,
 'email'),
('22222222-2222-2222-2222-222222222222', '2026-04-19', '2026-04-19 10:30:00', uuid(),
 'app_update',
 'Chúc mừng! Bạn đã nhận được Offer',
 'TechViet đã gửi Offer cho vị trí Data Scientist. Vui lòng xem chi tiết và phản hồi trong 7 ngày.',
 true,
 'push'),
('22222222-2222-2222-2222-222222222222', '2026-04-26', '2026-04-26 09:00:00', uuid(),
 'interview_reminder',
 'Nhắc nhở buổi phỏng vấn vòng 2',
 'Bạn có buổi phỏng vấn vòng 2 với TechViet vào 15:30 ngày 02/05. Địa điểm: Online.',
 false,
 'push');

-- Notifications for User 5
INSERT INTO notification_log (user_id, notif_date, sent_at, notif_id, type, title, body, is_read, channel) VALUES
('55555555-5555-5555-5555-555555555555', '2026-04-20', '2026-04-20 08:05:00', uuid(),
 'welcome',
 'Chào mừng bạn đến với Smart Recruitment System',
 'Cảm ơn bạn đã đăng ký tài khoản. Hãy hoàn thiện hồ sơ để nhận được đề xuất công việc phù hợp.',
 true,
 'email'),
('55555555-5555-5555-5555-555555555555', '2026-04-23', '2026-04-23 10:30:00', uuid(),
 'app_update',
 'Hồ sơ của bạn đang được xem xét',
 'FPT Software đang xem xét hồ sơ của bạn cho vị trí .NET Developer (Fresher/Junior).',
 true,
 'push'),
('55555555-5555-5555-5555-555555555555', '2026-05-02', '2026-05-02 12:00:00', uuid(),
 'interview_reminder',
 'Nhắc nhở buổi phỏng vấn',
 'Bạn có buổi phỏng vấn với FPT Software vào 13:00 ngày 03/05. Địa điểm: Online.',
 false,
 'sms');

-- ─── SEED COMPLETION ─────────────────────────────────────────
-- Note: We don't seed counter tables as they need UPDATE statements
SELECT '✅ Cassandra seed data inserted successfully!' AS completion_message,
       COUNT(*) AS user_activity_log_count FROM user_activity_log;

SELECT COUNT(*) AS search_history_count FROM search_history;

SELECT COUNT(*) AS notification_log_count FROM notification_log;