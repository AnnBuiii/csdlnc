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

echo "🖥️  Khởi động frontend..."
docker compose up -d frontend

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

wait_port backend  3000 60
wait_port frontend 5173 90

echo ""
echo "✅ Hệ thống đã khởi động!"
echo ""
echo "📌 Các endpoint:"
echo "   Frontend       : http://localhost:5173"
echo "   API Backend    : http://localhost:3000"
echo "   Neo4j Browser  : http://localhost:7474  (user: neo4j)"
echo "   PostgreSQL     : localhost:5432"
echo "   MongoDB        : localhost:27017"
echo "   Redis          : localhost:6379"
echo "   Cassandra      : localhost:9042"
echo ""
echo "📋 Lệnh hữu ích:"
echo "   docker compose logs -f frontend    # Xem log frontend"
echo "   docker compose logs -f backend     # Xem log backend"
echo "   docker compose ps                  # Kiểm tra trạng thái"
echo "   docker compose down                # Dừng tất cả"
echo "   docker compose down -v             # Dừng và xóa data"
