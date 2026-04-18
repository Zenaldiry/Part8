const jwt = require('jsonwebtoken');
const User = require('../models/user');

const getUserFromAuthHeader = async (auth) => {
  if (!auth || !auth.startsWith('Bearer ')) {
    return null;
  }
  const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
  const user = await User.findById(decodedToken.id);
  return user;
};

module.exports = getUserFromAuthHeader;
