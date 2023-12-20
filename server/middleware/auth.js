// middleware/auth.js
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Adjust the path as needed
const { JWT_SECRET } = require('../config/env');

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).send('Access denied. No token provided.');
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    // Check if token exists in the sessions table
    const query = 'SELECT * FROM sessions WHERE token = ?';
    const [session] = await db.promise().query(query, [token]);

    if (session.length === 0) {
      return res.status(401).send('Invalid token.');
    }

    next();
  } catch (error) {
    res.status(401).send('Invalid token.');
  }
};

module.exports = authenticate;
