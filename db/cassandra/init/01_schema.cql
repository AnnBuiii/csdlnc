-- =============================================================
-- Cassandra Init Script – Smart Recruitment System
-- Keyspace: srs_events
-- Tables: user_activity_log, job_daily_stats, search_history
-- =============================================================

-- Tạo keyspace với replication factor 1 (dev)
-- Production: thay 'replication_factor': 3
CREATE KEYSPACE IF NOT EXISTS srs_events
WITH replication = {
    'class': 'SimpleStrategy',
    'replication_factor': 1
}
AND durable_writes = true;

USE srs_events;

-- =============================================================
-- TABLE: user_activity_log (NV10)
-- Ghi lại toàn bộ hành vi người dùng theo thời gian
-- Partition key: (user_id, event_date) – tránh hot partition
-- =============================================================
CREATE TABLE IF NOT EXISTS user_activity_log (
    user_id     TEXT,
    event_date  DATE,
    event_time  TIMESTAMP,
    event_id    UUID,
    event_type  TEXT,       -- 'view_job', 'apply', 'search', 'click', 'login'
    entity_id   TEXT,       -- ID của job/candidate/company liên quan
    entity_type TEXT,       -- 'job', 'candidate', 'company'
    metadata    TEXT,       -- JSON string chứa thêm thông tin
    ip_address  TEXT,
    user_agent  TEXT,
    PRIMARY KEY ((user_id, event_date), event_time, event_id)
) WITH CLUSTERING ORDER BY (event_time DESC, event_id ASC)
  AND compaction = {
      'class': 'TimeWindowCompactionStrategy',
      'compaction_window_unit': 'DAYS',
      'compaction_window_size': 1
  }
  AND default_time_to_live = 7776000;  -- TTL: 90 ngày

-- =============================================================
-- TABLE: job_daily_stats (NV10)
-- Thống kê lượt xem tin tuyển dụng theo ngày
-- Partition: (job_id, stat_date)
-- =============================================================
CREATE TABLE IF NOT EXISTS job_daily_stats (
    job_id      TEXT,
    stat_date   DATE,
    hour        INT,
    view_count  COUNTER,
    apply_count COUNTER,
    PRIMARY KEY ((job_id, stat_date), hour)
) WITH CLUSTERING ORDER BY (hour ASC);

-- =============================================================
-- TABLE: search_history (NV04, NV06)
-- Lịch sử tìm kiếm để cải thiện gợi ý AI
-- =============================================================
CREATE TABLE IF NOT EXISTS search_history (
    user_id     TEXT,
    search_date DATE,
    searched_at TIMESTAMP,
    search_id   UUID,
    query       TEXT,
    filters     TEXT,       -- JSON: {location, salary, skills, ...}
    result_count INT,
    clicked_ids LIST<TEXT>, -- Danh sách job_id đã click
    PRIMARY KEY ((user_id, search_date), searched_at, search_id)
) WITH CLUSTERING ORDER BY (searched_at DESC, search_id ASC)
  AND default_time_to_live = 2592000;  -- TTL: 30 ngày

-- =============================================================
-- TABLE: notification_log (NV08)
-- Log các thông báo đã gửi
-- =============================================================
CREATE TABLE IF NOT EXISTS notification_log (
    user_id     TEXT,
    notif_date  DATE,
    sent_at     TIMESTAMP,
    notif_id    UUID,
    type        TEXT,       -- 'new_job', 'app_update', 'interview_reminder'
    title       TEXT,
    body        TEXT,
    is_read     BOOLEAN,
    channel     TEXT,       -- 'push', 'email', 'sms'
    PRIMARY KEY ((user_id, notif_date), sent_at, notif_id)
) WITH CLUSTERING ORDER BY (sent_at DESC, notif_id ASC)
  AND default_time_to_live = 604800;   -- TTL: 7 ngày
