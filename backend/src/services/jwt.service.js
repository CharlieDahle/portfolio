const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '24h';

class JWTService {
  static generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  static extractTokenFromHeader(req) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return null;
    
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) return null;
    
    return token;
  }
}

module.exports = JWTService;