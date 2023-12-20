const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { JWT_SECRET } = require('../config/env');

const refreshToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return next(); // No token, continue without refreshing
    }

    // Get session from database
    const sessionQuery = 'SELECT * FROM sessions WHERE token = ?';
    const [session] = await db.promise().query(sessionQuery, [token]);

    if (session.length === 0) {
      return next(); // Session not found, continue without refreshing
    }

    const lastActivity = new Date(session[0].last_activity);
    const now = new Date();
    const refreshInterval = 30 * 60 * 1000; // 30 minutes

    // Check if refresh is needed
    if (now - lastActivity > refreshInterval) {
      const userId = session[0].user_id;
      const newToken = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
      const newTokenExpiration = new Date(now.getTime() + (60 * 60 * 1000));

      // Update session in database
      const updateQuery = 'UPDATE sessions SET token = ?, last_activity = NOW(), token_expiration = ? WHERE user_id = ? AND token = ?';
      await db.promise().query(updateQuery, [newToken, newTokenExpiration, userId, token]);

      // Replace the old token with the new one
      req.headers.authorization = `Bearer ${newToken}`;
    }

    next();
  } catch (error) {
    next(); // In case of error, proceed without refreshing
  }
};

module.exports = refreshToken;
