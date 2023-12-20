// models/user.js z
const bcrypt = require('bcrypt');
const db = require('../config/db');
const { sanitize_strings, sanitize_nums } = require('../utils/sanitize');

class User {
  static async create(email, password, name) {
    try{
      sanitize_strings(email);
      sanitize_strings(password);
      sanitize_strings(name);
    } catch (error) {
      throw new Error('Invalid input');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertQuery = 'INSERT INTO users (email, password, name) VALUES (?, ?, ?)';
    await db.promise().query(insertQuery, [email, hashedPassword, name]);
  }

  static async findByEmail(email) {
    try{
      sanitize_strings(email);
    }
    catch (error) {
      throw new Error('Invalid input');
    }
    const query = 'SELECT * FROM users WHERE email = ?';
    const [user] = await db.promise().query(query, [email]);
    return user.length ? user[0] : null;
  }

  static async findById(id) {
    try{
      sanitize_nums(id);
    }
    catch (error) {
      throw new Error('Invalid input');
    }
    const query = 'SELECT * FROM users WHERE id = ?';
    const [user] = await db.promise().query(query, [id]);
    return user.length ? user[0] : null;
  }

  static async createSession(userId, token, tokenExpiration, deviceFingerprint) {
    try{
      sanitize_nums(userId);
      sanitize_strings(deviceFingerprint);
    }
    catch (error) {
      throw new Error('Invalid input');
    }
    const sessionQuery = 'INSERT INTO sessions (user_id, token, last_activity, token_expiration, device_fingerprint) VALUES (?, ?, NOW(), ?, ?)';
    await db.promise().query(sessionQuery, [userId, token, tokenExpiration, deviceFingerprint]);
  }

  // Other useful methods for user management can be added here
}

module.exports = User;

