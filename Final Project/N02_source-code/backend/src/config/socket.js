const { Server } = require('socket.io');
const { verifyToken } = require('../utils/jwt');
const { getRedis } = require('./redis');
const logger = require('./logger');

let io;

function initSocketIO(server) {
  io = new Server(server, {
    cors: { origin: process.env.CORS_ORIGIN || '*', credentials: true },
    transports: ['websocket', 'polling'],
  });

  // Middleware xác thực JWT cho socket
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error('Unauthorized'));
      const payload = verifyToken(token);
      socket.userId = payload.userId;
      socket.role   = payload.role;
      next();
    } catch {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', async (socket) => {
    const { userId } = socket;
    logger.info(`Socket connected: ${userId}`);

    // Đánh dấu user online
    await getRedis().sadd('online_users', userId);
    socket.join(`user:${userId}`);

    // Gửi thông báo còn tồn trong queue (NV08)
    const pending = await getRedis().lrange(`notifications:${userId}`, 0, -1);
    if (pending.length) {
      socket.emit('notifications:pending', pending.map((n) => JSON.parse(n)));
    }

    socket.on('disconnect', async () => {
      await getRedis().srem('online_users', userId);
      logger.info(`Socket disconnected: ${userId}`);
    });
  });

  logger.info('✅ Socket.IO initialized');
}

// Phát thông báo đến một user cụ thể
function emitToUser(userId, event, data) {
  if (io) io.to(`user:${userId}`).emit(event, data);
}

// Phát broadcast cho toàn bộ user (ví dụ: tin hệ thống)
function broadcast(event, data) {
  if (io) io.emit(event, data);
}

module.exports = { initSocketIO, emitToUser, broadcast };
