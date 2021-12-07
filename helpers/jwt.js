const jwt = require('jsonwebtoken');

if(process.env.NODE_ENV != "production") {
  require('dotenv').config();
}

function generateToken(payload) {
  return jwt.sign(payload, 'blackpink');
}

function verifyToken(token) {
  return jwt.verify(token, 'blackpink');
}

module.exports = {
  generateToken,
  verifyToken,
}