const CustomError = require('./Error');
const { hash, compare } = require('./bcrypt');
const { generateToken, extractToken } = require('./jwt');

module.exports = {
  CustomError,
  generateToken,
  extractToken,
  hash,
  compare,
};
