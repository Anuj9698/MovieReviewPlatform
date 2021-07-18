const { jwt } = require('../config');
const expressJwt = require('express-jwt');
const { extractToken } = require('../helper');

const jwtExpress = expressJwt({
  secret: jwt.secret,
  algorithms: jwt.algorithms,
  getToken: (req) => {
    return extractToken(req);
  },
  credentialsRequired: true,
});

module.exports = jwtExpress;
