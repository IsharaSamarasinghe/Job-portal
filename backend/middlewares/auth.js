const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/errorHandler');

const protect = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorHandler(res, 401, 'No token provided');
    }

    const token = authHeader.replace('Bearer ', '').trim();
    if (!process.env.JWT_SECRET) {
      return errorHandler(res, 500, 'JWT secret is not configured');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return errorHandler(res, 401, 'Invalid token payload');
    }


    req.user = { id: decoded.id }; // Attach user ID to request
    next();
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('JWT Auth Error:', err.message);
    }
    return errorHandler(res, 401, 'Invalid or expired token');
  }
};

module.exports = protect;