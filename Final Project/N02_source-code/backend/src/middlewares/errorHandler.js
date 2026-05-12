const logger = require('../config/logger');

function errorHandler(err, req, res, next) {
  logger.error(`${req.method} ${req.url} – ${err.message}`, {
    stack: err.stack,
    body:  req.body,
  });

  // PostgreSQL errors
  if (err.code === '23505') {
    return res.status(409).json({ success: false, message: 'Dữ liệu đã tồn tại (duplicate).', detail: err.detail });
  }
  if (err.code === '23503') {
    return res.status(400).json({ success: false, message: 'Dữ liệu liên kết không tồn tại.' });
  }

  // Mongoose validation
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ.', errors });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({ success: false, message: 'Token không hợp lệ hoặc đã hết hạn.' });
  }

  // Multer file size
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ success: false, message: `File quá lớn. Tối đa ${process.env.MAX_FILE_SIZE_MB || 10}MB.` });
  }

  const statusCode = err.statusCode || err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Lỗi hệ thống, vui lòng thử lại.',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
}

module.exports = errorHandler;
