# =============================================================
# Dockerfile – Backend Node.js API
# Smart Recruitment System (SRS)
# Multi-stage build: development | production
# =============================================================

# ── Base stage ────────────────────────────────────────────────
FROM node:20-alpine AS base
WORKDIR /app

# Cài các deps hệ thống cần thiết (bcrypt native module, etc.)
RUN apk add --no-cache python3 make g++ libc6-compat

COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force

# ── Development stage ─────────────────────────────────────────
FROM node:20-alpine AS development
WORKDIR /app

RUN apk add --no-cache python3 make g++ libc6-compat

COPY package*.json ./
RUN npm install && npm cache clean --force

COPY . .

EXPOSE 3000

# Hot-reload với nodemon
CMD ["npx", "nodemon", "--watch", "src", "--ext", "js,json", "src/index.js"]

# ── Builder stage ─────────────────────────────────────────────
FROM base AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install && npm cache clean --force

COPY . .

# Build nếu dùng TypeScript/Babel
# RUN npm run build

# ── Production stage ──────────────────────────────────────────
FROM node:20-alpine AS production
WORKDIR /app

# Chạy với user non-root để bảo mật
RUN addgroup -g 1001 -S nodejs && \
    adduser  -S nodejs -u 1001

# Chỉ copy những gì cần thiết
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs . .

USER nodejs

EXPOSE 3000

CMD ["node", "src/index.js"]
