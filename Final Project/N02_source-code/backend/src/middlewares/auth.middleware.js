const { verifyToken }   = require('../utils/jwt');
const { getSession }    = require('../config/redis');
const { unauthorized, forbidden } = require('../utils/response');

// Xác thực JWT token
async function authenticate(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      return unauthorized(res);
    }

    const token = header.split(' ')[1];
    const payload = verifyToken(token);

    // Kiểm tra session còn tồn tại trong Redis
    const session = await getSession(payload.userId);
    if (!session || Object.keys(session).length === 0) {
      return unauthorized(res, 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.');
    }

    req.user = {
      userId:      payload.userId,
      email:       payload.email,
      role:        payload.role,
      candidateId: session.candidateId || null,
      companyId:   session.companyId   || null,
    };

    next();
  } catch (err) {
    return unauthorized(res, 'Token không hợp lệ.');
  }
}

// Phân quyền theo role
function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) return unauthorized(res);
    if (!roles.includes(req.user.role)) {
      return forbidden(res, `Chỉ dành cho: ${roles.join(', ')}`);
    }
    next();
  };
}

// Tuỳ chọn: cho phép chưa đăng nhập (public route)
async function optionalAuth(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (header?.startsWith('Bearer ')) {
      const token = header.split(' ')[1];
      const payload = verifyToken(token);
      const session = await getSession(payload.userId);
      if (session && Object.keys(session).length > 0) {
        req.user = { userId: payload.userId, role: payload.role, ...session };
      }
    }
  } catch {
    // Bỏ qua lỗi – cho phép truy cập public
  }
  next();
}

module.exports = { authenticate, authorize, optionalAuth };
