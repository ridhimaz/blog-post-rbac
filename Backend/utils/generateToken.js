const jwt = require('jsonwebtoken');

module.exports = function (user) {
  return jwt.sign({ id: user._id}, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
};
