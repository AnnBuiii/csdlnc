const { getNotifications, getRedis } = require('../config/redis');

class NotificationService {
  // ── NV08: Lấy tất cả thông báo ───────────────────────────────
  async getAll(userId) {
    const notifications = await getNotifications(userId);
    return notifications;
  }

  // ── NV08: Đếm thông báo chưa đọc ──────────────────────────────
  async getUnreadCount(userId) {
    const r = getRedis();
    const count = await r.get(`notifications:unread:${userId}`);
    return parseInt(count) || 0;
  }

  // ── NV08: Đánh dấu tất cả đã đọc ─────────────────────────────
  async markAllRead(userId) {
    const r = getRedis();
    await r.set(`notifications:unread:${userId}`, '0');
  }
}

module.exports = new NotificationService();