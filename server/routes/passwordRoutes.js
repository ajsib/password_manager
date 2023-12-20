// routes/passwordRoutes.js
const express = require('express');
const passwordsController = require('../controllers/passwordControllers');
const auth = require('../middleware/auth'); // Assuming you have authentication middleware
const router = express.Router();
const refreshToken = require('../middleware/refreshToken');

// passwords
router.get('/', auth, passwordsController.getPasswordNames);
router.get('/:id', auth, passwordsController.getPasswordById);
router.post('/', auth, passwordsController.addPassword);
router.delete('/:id', auth, passwordsController.deletePasswordById);

// shared passwords
router.post('/:id/share', auth, passwordsController.sharePassword);
router.get('/shared', auth, passwordsController.getSharedPasswords);
router.delete('/shared/:id', auth, passwordsController.revokeSharedPassword);

router.use(refreshToken);

module.exports = router;
