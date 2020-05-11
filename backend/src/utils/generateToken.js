const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = function generateToken(params = {}) {
  return jwt.sign(params, process.env.TOKEN_SECRET, {
    expiresIn: 86400 * 7, // 7 dias
  });
};
