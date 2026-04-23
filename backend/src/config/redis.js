const Redis = require('ioredis');
const logger = require('./logger');

let redis;

async function connectRedis() {
  redis = new Redis({
    host:     process.env.REDIS_HOST || 'redis',
    port:     parseInt(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
    lazyConnect: false,
  });

  await redis.ping();
  logger.info('✅ Redis connected');

  redis.on('error', (err) => logger.error('Redis error:', err));
}

function getRedis() {
  if (!redis) throw new Error('Redis not initialized');
  return redis;
}

// ── Helpers theo thiết kế Redis Data Model (mục 3.4) ──────────

const TTL = {
  SESSION:      3600,       // 1 giờ
  REFRESH:      604800,     // 7 ngày
  OTP:          300,        // 5 phút
  CACHE_SEARCH: 60,         // 1 phút
  CACHE_RECOMMEND: 300,     // 5 phút
  RATE_LIMIT:   60,         // 1 phút
  NOTIFICATION: 86400,      // 24 giờ
};

async function setSession(userId, sessionData) {
  const r = getRedis();
  await r.hset(`session:${userId}`, sessionData);
  await r.expire(`session:${userId}`, TTL.SESSION);
}

async function getSession(userId) {
  return getRedis().hgetall(`session:${userId}`);
}

async function deleteSession(userId) {
  return getRedis().del(`session:${userId}`);
}

async function setRefreshToken(token, userId) {
  return getRedis().set(`refresh_token:${token}`, userId, 'EX', TTL.REFRESH);
}

async function getRefreshToken(token) {
  return getRedis().get(`refresh_token:${token}`);
}

async function deleteRefreshToken(token) {
  return getRedis().del(`refresh_token:${token}`);
}

async function setCache(key, data, ttl = TTL.CACHE_SEARCH) {
  return getRedis().set(key, JSON.stringify(data), 'EX', ttl);
}

async function getCache(key) {
  const val = await getRedis().get(key);
  return val ? JSON.parse(val) : null;
}

async function invalidateCache(pattern) {
  const keys = await getRedis().keys(pattern);
  if (keys.length > 0) await getRedis().del(...keys);
}

async function pushNotification(userId, notification) {
  const r = getRedis();
  await r.lpush(`notifications:${userId}`, JSON.stringify(notification));
  await r.ltrim(`notifications:${userId}`, 0, 49); // Giữ tối đa 50 thông báo
  await r.expire(`notifications:${userId}`, TTL.NOTIFICATION);
}

async function getNotifications(userId) {
  const items = await getRedis().lrange(`notifications:${userId}`, 0, -1);
  return items.map((i) => JSON.parse(i));
}

async function incrJobView(jobId) {
  return getRedis().incr(`job_view_count:${jobId}`);
}

async function checkRateLimit(ip, limit = 100) {
  const r = getRedis();
  const key = `rate_limit:${ip}`;
  const count = await r.incr(key);
  if (count === 1) await r.expire(key, TTL.RATE_LIMIT);
  return count <= limit;
}

module.exports = {
  connectRedis, getRedis, TTL,
  setSession, getSession, deleteSession,
  setRefreshToken, getRefreshToken, deleteRefreshToken,
  setCache, getCache, invalidateCache,
  pushNotification, getNotifications,
  incrJobView, checkRateLimit,
};
