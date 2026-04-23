/**
 * Parse và validate pagination params từ query string
 */
function parsePagination(query) {
  const page  = Math.max(1, parseInt(query.page)  || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 20));
  const offset = (page - 1) * limit;
  return { page, limit, offset };
}

/**
 * Tạo ORDER BY clause an toàn (chống SQL injection)
 */
function buildOrderBy(sortBy, allowedFields, defaultField = 'created_at') {
  const field = allowedFields.includes(sortBy) ? sortBy : defaultField;
  return field;
}

module.exports = { parsePagination, buildOrderBy };
