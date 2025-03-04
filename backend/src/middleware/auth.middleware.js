// src/middleware/auth.middleware.js
const JWTService = require('../services/jwt.service');

const authenticateToken = (req, res, next) => {
  try {
    const token = JWTService.extractTokenFromHeader(req);
    if (!token) {
      return res.status(401).json({ 
        error: 'Authentication required' 
      });
    }

    const decoded = JWTService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ 
      error: 'Invalid token' 
    });
  }
};

module.exports = {
  authenticateToken
};