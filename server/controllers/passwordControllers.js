// controllers/passwordsController.js
const Passwords = require('../models/Passwords');

exports.getPasswordNames = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is stored in req.user
    const passwords = await Passwords.getPasswordNamesByUserId(userId);
    res.status(200).json(passwords);
  } catch (error) {
    // res.status(500).send('Error retrieving password names');
    res.status(500).send(error.message);
  }
};

exports.getPasswordById = async (req, res) => {
  try {
    const passwordId = req.params.id;
    const password = await Passwords.getPasswordById(passwordId);
    if (password) {
      res.status(200).json(password);
    } else {
      res.status(404).send('Password not found');
    }
  } catch (error) {
    // res.status(500).send('Error retrieving password');
    res.status(500).send(error.message);
  }
};

exports.addPassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { password_name, encryptedPassword, notes } = req.body;
    await Passwords.addPassword(userId, password_name, encryptedPassword, notes);
    res.status(201).send('Password added successfully');
  } catch (error) {
    // res.status(500).send('Error adding password');
    res.status(500).send(error.message);
  }
};

exports.deletePasswordById = async (req, res) => {
  try {
    const passwordId = req.params.id;
    await Passwords.deletePasswordById(passwordId);
    res.status(200).send('Password deleted successfully');
  } catch (error) {
    // res.status(500).send('Error deleting password');
    res.status(500).send(error.message);
  }
};

exports.sharePassword = async (req, res) => {
  try {
    const { passwordId, shareWithUserId } = req.body;
    const sharedByUserId = req.user.id; 
    await Passwords.sharePassword(passwordId, sharedByUserId, shareWithUserId);
    res.status(200).send('Password shared successfully');
  } catch (error) {
    // res.status(500).send('Error sharing password');
    res.status(500).send(error.message);
  }
};
   
exports.getSharedPasswords = async (req, res) => {
   try {
    const userId = req.user.id;
    const sharedPasswords = await Passwords.getSharedPasswords(userId);
    res.status(200).json(sharedPasswords);
  } catch (error) {
    // res.status(500).send('Error retrieving shared passwords');
    res.status(500).send(error.message);
  }
};
  
exports.revokeSharedPassword = async (req, res) => {
    try {
    const { sharedPasswordId } = req.body;
    const ownerId = req.user.id;
    await Passwords.revokeSharedPassword(sharedPasswordId, ownerId);
    res.status(200).send('Shared password access revoked');
  } catch (error) {
    // res.status(500).send('Error revoking shared password access');
    res.status(500).send(error.message);
  }
};