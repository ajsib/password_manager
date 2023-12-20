// models/Passwords.js
const db = require('../config/db');

class Passwords {
  static async getPasswordNamesByUserId(userId) {
    const query = 'SELECT id, password_name FROM passwords WHERE user_id = ?';
    const [passwords] = await db.promise().query(query, [userId]);
    return passwords;
  }

  static async getPasswordById(passwordId) {
    const query = 'SELECT * FROM passwords WHERE id = ?';
    const [password] = await db.promise().query(query, [passwordId]);
    return password.length ? password[0] : null;
  }

  static async addPassword(userId, password_name, encryptedPassword, notes) {
    const insertQuery = 'INSERT INTO passwords (user_id, password_name, encrypted_password, notes) VALUES (?, ?, ?, ?)';
    await db.promise().query(insertQuery, [userId, password_name, encryptedPassword, notes]);
  }

  static async deletePasswordById(passwordId) {
    const deleteQuery = 'DELETE FROM passwords WHERE id = ?';
    await db.promise().query(deleteQuery, [passwordId]);
  }

  static async sharePassword(passwordId, sharedByUserId, shareWithUserId) {
    // Insert a record into shared_passwords table
    const sharePasswordQuery = 'INSERT INTO shared_passwords (password_id, shared_by_user_id, shared_at) VALUES (?, ?, NOW())';
    const [sharedPasswordResult] = await db.promise().query(sharePasswordQuery, [passwordId, sharedByUserId]);

    // Update the 'shared' column in the passwords table to indicate it's shared
    const updatePasswordQuery = 'UPDATE passwords SET shared = 1 WHERE id = ?';
    await db.promise().query(updatePasswordQuery, [passwordId]);

    // Insert a record into user_shared_passwords table
    const userSharePasswordQuery = 'INSERT INTO user_shared_passwords (user_id, shared_password_id) VALUES (?, ?)';
    await db.promise().query(userSharePasswordQuery, [shareWithUserId, sharedPasswordResult.insertId]);
  }

  static async getSharedPasswords(userId) {
    // Select all passwords that meet the criteria
    const sharedPasswordsQuery = `
      SELECT DISTINCT p.id, p.password_name, p.username, p.notes, p.created_at, p.updated_at
      FROM passwords p
      LEFT JOIN shared_passwords sp ON p.id = sp.password_id
      LEFT JOIN user_shared_passwords usp ON sp.id = usp.shared_password_id
      WHERE (p.user_id = ? OR usp.user_id = ?) AND p.shared = 1;
    `;
    const [sharedPasswords] = await db.promise().query(sharedPasswordsQuery, [userId, userId]);
    return sharedPasswords;
  }


  static async revokeSharedPassword(sharedPasswordId, ownerId) {
    // Delete a shared password record only if it was shared by the owner
    const revokeShareQuery = `
        DELETE sp, usp
        FROM shared_passwords sp
        JOIN user_shared_passwords usp ON sp.id = usp.shared_password_id
        WHERE sp.id = ? AND sp.shared_by_user_id = ?;
    `;
    await db.promise().query(revokeShareQuery, [sharedPasswordId, ownerId]);

    // Check if there are still shared records for this password
    const checkSharedQuery = 'SELECT COUNT(*) AS shared_count FROM shared_passwords WHERE password_id = ?';
    const [sharedCountResult] = await db.promise().query(checkSharedQuery, [sharedPasswordId]);

    if (sharedCountResult[0].shared_count === 0) {
        // If there are no more shared records, update the 'shared' column in the passwords table to 0
        const updatePasswordQuery = 'UPDATE passwords SET shared = 0 WHERE id = ?';
        await db.promise().query(updatePasswordQuery, [sharedPasswordId]);
    }
  }
}

module.exports = Passwords;
