#!/usr/bin/env bash
# =============================================================
# start.sh – Khởi động Smart Recruitment System
# =============================================================
set -e
echo "🚀 Smart Recruitment System – Khởi động..."

if [ ! -f .env ]; then
    echo "📋 Tạo file .env từ .env.example..."
    cp .env.example .env
    echo "⚠️  Hãy chỉnh sửa .env trước khi chạy production!"
fi

echo "🗄️  Khởi động databases..."
docker compose up -d postgres mongo redis neo4j cassandra

wait_healthy() {
    local service=$1
    local timeout=${2:-120}
    local count=0
    echo -n "   Đang chờ $service..."
    until [ "$(docker inspect --format='{{.State.Health.Status}}' "srs_$service" 2>/dev/null)" = "healthy" ]; do
        sleep 2
        count=$((count+2))
        if [ $count -ge $timeout ]; then
            echo ""
            echo "❌ $service không sẵn sàng sau ${timeout}s"
            exit 1
        fi
        printf "\r   Đang chờ $service... %ds" $count
    done
    echo " ✓"
}

wait_healthy postgres 60
wait_healthy mongo 60
wait_healthy redis 60
wait_healthy neo4j 120
wait_healthy cassandra 180

echo "⚙️  Khởi động backend..."
docker compose up -d backend

echo "🖥️  Khởi động UI tools..."
docker compose up -d pgadmin mongo-express redisinsight cassandra-web

wait_port() {
    local service=$1
    local port=$2
    local timeout=${3:-60}
    local count=0
    echo -n "   Đang chờ $service (port $port)..."
    until nc -z localhost $port 2>/dev/null; do
        sleep 2
        count=$((count+2))
        if [ $count -ge $timeout ]; then
            echo ""
            echo "⚠️  $service chưa sẵn sàng sau ${timeout}s, tiếp tục..."
            return 0
        fi
        printf "\r   Đang chờ $service (port $port)... %ds" $count
    done
    echo " ✓"
}

wait_port pgadmin        5050 60
wait_port mongo-express  8081 60
wait_port redisinsight   5540 60
wait_port cassandra-web  8888 60

echo ""
echo "✅ Hệ thống đã khởi động!"
echo ""
echo "📌 Các endpoint:"
echo "   API Backend    : http://localhost:3000"
echo "   Neo4j Browser  : http://localhost:7474  (user: neo4j)"
echo "   pgAdmin        : http://localhost:5050  (PostgreSQL UI)"
echo "   Mongo Express  : http://localhost:8081  (MongoDB UI)"
echo "   RedisInsight   : http://localhost:5540  (Redis UI)"
echo "   Cassandra Web  : http://localhost:8888  (Cassandra UI)"
echo "   PostgreSQL     : localhost:5432"
echo "   MongoDB        : localhost:27017"
echo "   Redis          : localhost:6379"
echo "   Cassandra      : localhost:9042"
echo ""
echo "📋 Lệnh hữu ích:"
echo "   docker compose logs -f backend     # Xem log backend"
echo "   docker compose ps                  # Kiểm tra trạng thái"
echo "   docker compose down                # Dừng tất cả"
echo "   docker compose down -v             # Dừng và xóa data"
