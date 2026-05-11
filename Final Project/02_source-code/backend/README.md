# 🚀 Smart Recruitment System – Docker Setup

Hệ thống tuyển dụng thông minh với kiến trúc **Polyglot Persistence** gồm 5 database.

## 📦 Kiến trúc Database

| Database     | Cổng  | Dùng cho (Nghiệp vụ)                          |
|-------------|-------|-----------------------------------------------|
| PostgreSQL  | 5432  | NV01 (Tài khoản), NV05 (Ứng tuyển), NV07 (Lịch phỏng vấn) |
| MongoDB     | 27017 | NV02 (Hồ sơ CV), NV03 (Tin tuyển dụng), NV04 (Tìm kiếm), NV09 (Đánh giá) |
| Redis       | 6379  | NV08 (Session, Cache, Pub/Sub thông báo)       |
| Neo4j       | 7474/7687 | NV06 (AI Matching – Gợi ý thông minh)     |
| Cassandra   | 9042  | NV10 (Event log, Thống kê hành vi)             |

## 🗂️ Cấu trúc thư mục

```
smart-recruitment/
├── docker-compose.yml          # Orchestration tất cả services
├── .env.example                # Biến môi trường mẫu
├── start.sh                    # Script khởi động nhanh
├── backend/src/
│    ├── index.js                  # Entry point, bootstrap tất cả DB
│    ├── app.js                    # Express app, middlewares, routes
│    │
│    ├── config/
│    │   ├── postgres.js           # Pool + withTransaction helper
│    │   ├── mongo.js              # Mongoose connect
│    │   ├── redis.js              # ioredis + helpers (session, cache, pub/sub)
│    │   ├── neo4j.js              # Driver + runCypher helper
│    │   ├── cassandra.js          # Client + execute helper
│    │   ├── socket.js             # Socket.IO realtime (NV08)
│    │   └── logger.js             # Winston logger
│    │
│    ├── middlewares/
│    │   ├── auth.middleware.js    # JWT verify + Redis session check
│    │   ├── errorHandler.js       # Global error handler
│    │   └── validate.js           # express-validator helper
│    │
│    ├── models/
│    │   ├── candidateProfile.model.js  # Mongoose – candidate_profiles
│    │   ├── job.model.js               # Mongoose – job_postings
│    │   └── review.model.js            # Mongoose – company_reviews
│    │
│    ├── services/
│    │   ├── auth.service.js       # NV01: register, login, refresh, logout
│    │   ├── candidate.service.js  # NV02: hồ sơ CV, kỹ năng, tìm kiếm
│    │   ├── company.service.js    # Profile công ty
│    │   ├── job.service.js        # NV03/NV04: tạo tin, tìm kiếm, cache
│    │   ├── application.service.js # NV05: nộp đơn, pipeline, thống kê
│    │   ├── interview.service.js  # NV07: lên lịch, kết quả, đổi lịch
│    │   ├── recommend.service.js  # NV06: AI matching Neo4j + Redis cache
│    │   ├── notification.service.js # NV08: Redis + Socket.IO
│    │   ├── review.service.js     # NV09: đánh giá công ty MongoDB
│    │   └── analytics.service.js  # NV10: dashboard, Cassandra event log
│    │
│    ├── routes/
│    │   ├── auth.routes.js        # POST /register, /login, /logout, /refresh
│    │   ├── candidate.routes.js   # GET/PUT /profile, search ứng viên
│    │   ├── company.routes.js     # GET/PUT profile công ty
│    │   ├── job.routes.js         # CRUD tin tuyển dụng
│    │   ├── application.routes.js # Nộp đơn, pipeline management
│    │   ├── interview.routes.js   # Lên lịch, kết quả phỏng vấn
│    │   ├── recommend.routes.js   # AI job/candidate recommendations
│    │   ├── review.routes.js      # Đánh giá công ty
│    │   ├── analytics.routes.js   # Dashboard HR/Admin
│    │   └── notification.routes.js # Thông báo realtime
│    │
│    └── utils/
│        ├── jwt.js                # sign / verify token
│        ├── response.js           # Chuẩn hoá API response
│        └── pagination.js         # Parse page/limit/offset
│
├── frontend/
│   └── Dockerfile              # (Tự thêm)
├── nginx/
│   └── nginx.conf              # Reverse proxy
└── db/
    ├── postgres/init/
    │   └── 01_schema.sql       # DDL: users, candidates, companies...
    ├── mongo/init/
    │   └── 01_init.js          # Collections + indexes
    ├── cassandra/init/
    │   └── 01_schema.cql       # Keyspace + tables
    └── neo4j/init/
        └── 01_init.cypher      # Constraints + indexes + seed data
```

## ⚡ Khởi động nhanh

```bash
# 1. Clone và di chuyển vào thư mục
cd smart-recruitment

# 2. Tạo .env
cp .env.example .env

# 3. Khởi động tất cả (databases + backend)
chmod +x start.sh && ./start.sh

# Hoặc thủ công:
docker compose up -d
```

## 🔧 Lệnh thường dùng

```bash
# Khởi động toàn bộ
docker compose up -d

# Chỉ khởi động databases
docker compose up -d postgres mongo redis neo4j cassandra

# Xem log realtime
docker compose logs -f backend
docker compose logs -f postgres

# Kiểm tra trạng thái health
docker compose ps

# Kết nối vào database
docker exec -it srs_postgres psql -U srs_user -d srs_db
docker exec -it srs_mongo mongosh -u srs_admin -p srs_mongo_pass
docker exec -it srs_redis redis-cli -a srs_redis_pass
docker exec -it srs_cassandra cqlsh -u cassandra

# Khởi động với profile frontend + nginx (production)
docker compose --profile frontend --profile production up -d

# Dừng tất cả
docker compose down

# Dừng và xóa toàn bộ data (CẢNH BÁO: không thể hoàn tác)
docker compose down -v
```

## 🌐 Truy cập

| Service       | URL                          | Thông tin đăng nhập              |
|--------------|------------------------------|----------------------------------|
| API Backend  | http://localhost:3000        |                                  |
| Neo4j Browser| http://localhost:7474        | neo4j / srs_neo4j_pass           |
| PostgreSQL   | localhost:5432               | srs_user / srs_password          |
| MongoDB      | localhost:27017              | srs_admin / srs_mongo_pass       |
| Redis        | localhost:6379               | password: srs_redis_pass         |
| Cassandra    | localhost:9042               | cassandra / cassandra            |

## 🔒 Production checklist

- [ ] Thay tất cả mật khẩu mặc định trong `.env`
- [ ] Đặt `NODE_ENV=production`
- [ ] Cấu hình SSL/TLS cho Nginx
- [ ] Tăng `replication_factor` Cassandra lên 3
- [ ] Bật authentication Cassandra (PasswordAuthenticator đã được cấu hình)
- [ ] Cấu hình backup định kỳ cho PostgreSQL và MongoDB
- [ ] Giới hạn cổng databases (không expose ra internet)
