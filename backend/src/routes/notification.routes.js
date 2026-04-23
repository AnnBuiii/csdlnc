const router = require('express').Router();
const { authenticate } = require('../middlewares/auth.middleware');
const notificationService = require('../services/notification.service');
const { success } = require('../utils/response');

// GET /api/notifications – Lấy thông báo
router.get('/', authenticate, async (req, res, next) => {
  try {
    const notifications = await notificationService.getAll(req.user.userId);
    success(res, notifications);
  } catch (err) { next(err); }
});

// GET /api/notifications/count – Đếm chưa đọc
router.get('/count', authenticate, async (req, res, next) => {
  try {
    const count = await notificationService.getUnreadCount(req.user.userId);
    success(res, { count });
  } catch (err) { next(err); }
});

// DELETE /api/notifications – Đánh dấu tất cả đã đọc
router.delete('/', authenticate, async (req, res, next) => {
  try {
    await notificationService.markAllRead(req.user.userId);
    success(res, null, 'Đã đọc tất cả thông báo.');
  } catch (err) { next(err); }
});

module.exports = router;
