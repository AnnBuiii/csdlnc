#!/usr/bin/env bash
# =============================================================
# start.sh – Khởi động Smart Recruitment System
# =============================================================
set -e

echo "🚀 Smart Recruitment System – Khởi động..."

# 1. Tạo file .env nếu chưa có
if [ ! -f .env ]; then
    echo "📋 Tạo file .env từ .env.example..."
    cp .env.example .env
    echo "⚠️  Hãy chỉnh sửa .env trước khi chạy production!"
fi

# 2. Tạo thư mục cần thiết
mkdir -p db/postgres/init db/mongo/init db/cassandra/init db/neo4j/init nginx

# 3. Khởi động databases trước
echo "🗄️  Khởi động databases..."
docker compose up -d postgres mongo redis neo4j cassandra

# 4. Chờ databases healthy
for db in postgres mongo redis cassandra; do
    count=0
    until sudo docker compose exec -T $db sh -c 'echo "ok"' > /dev/null 2>&1;
    do
        sleep 2
        count=$((count+2))
        if [ $count -ge 120 ]; then
            echo "❌ Database $db không sẵn sàng sau 120 giây"
            exit 1
        fi
        printf "\r   Đang chờ $db... %ds" $count
    done
    echo ""
done

# 5. Khởi động backend
echo "⚙️  Khởi động backend..."
docker compose up -d backend

echo ""
echo "✅ Hệ thống đã khởi động!"
echo ""
echo "📌 Các endpoint:"
echo "   API Backend  : http://localhost:3000"
echo "   Neo4j Browser: http://localhost:7474  (user: neo4j)"
echo "   PostgreSQL   : localhost:5432"
echo "   MongoDB      : localhost:27017"
echo "   Redis        : localhost:6379"
echo "   Cassandra    : localhost:9042"
echo ""
echo "📋 Lệnh hữu ích:"
echo "   docker compose logs -f backend     # Xem log backend"
echo "   docker compose ps                  # Kiểm tra trạng thái"
echo "   docker compose down                # Dừng tất cả"
echo "   docker compose down -v             # Dừng và xóa data"
