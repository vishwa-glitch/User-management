const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected routes (token required)
router.use(authMiddleware.protect); // Apply authentication to all routes below

router.get('/me', userController.getMe);
router.patch('/update-me', userController.updateMe);
router.delete('/deactivate', userController.deactivateAccount);

module.exports = router; 