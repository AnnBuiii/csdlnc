const { validationResult } = require('express-validator');
const { badRequest } = require('../utils/response');

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return badRequest(res, 'Dữ liệu không hợp lệ.', errors.array());
  }
  next();
}

module.exports = validate;
