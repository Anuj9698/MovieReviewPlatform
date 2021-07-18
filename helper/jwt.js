var JWT = require('jsonwebtoken');
const { jwt } = require('../config/dev');
const { v4: uuidv4 } = require('uuid');
const CustomError = require('../helper/Error');
const { User } = require('../models');
const { findOne } = require('../utils/crud');

module.exports = {
  generateToken: (obj) => {
    const token = JWT.sign(obj, jwt.secret, {
      algorithm: jwt.algorithms[0],
      expiresIn: jwt.expiry,
      jwtid: uuidv4(),
    });

    return `${token}`;
  },

  extractToken: (req) => {
    let token = req.headers.authorization || req.query.authorization;

    if (token && token.startsWith('Bearer ')) {
      token = token.substring(7, token.length);
      return token;
    } else if (req.query && req.query.token) {
      return req.query.token;
    }

    throw new CustomError('Unauthorized', 401);
  },
};
