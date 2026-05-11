/**
 * Chuẩn hoá response format toàn hệ thống
 */

function success(res, data = null, message = 'Thành công', statusCode = 200) {
  return res.status(statusCode).json({ success: true, message, data });
}

function created(res, data, message = 'Tạo thành công') {
  return success(res, data, message, 201);
}

function paginated(res, data, meta) {
  return res.status(200).json({
    success: true,
    data,
    meta: {
      total:    meta.total,
      page:     meta.page,
      limit:    meta.limit,
      totalPages: Math.ceil(meta.total / meta.limit),
    },
  });
}

function error(res, message = 'Lỗi server', statusCode = 500, errors = null) {
  const body = { success: false, message };
  if (errors) body.errors = errors;
  return res.status(statusCode).json(body);
}

function notFound(res, message = 'Không tìm thấy') {
  return error(res, message, 404);
}

function badRequest(res, message = 'Dữ liệu không hợp lệ', errors = null) {
  return error(res, message, 400, errors);
}

function unauthorized(res, message = 'Chưa xác thực') {
  return error(res, message, 401);
}

function forbidden(res, message = 'Không có quyền truy cập') {
  return error(res, message, 403);
}

module.exports = { success, created, paginated, error, notFound, badRequest, unauthorized, forbidden };
