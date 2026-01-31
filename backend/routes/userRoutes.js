const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
// IMPORTANT: Check this path. It must go UP (..) to controllers
const { registerUser, authUser, updateUserProfile } = require('../controllers/userController');

router.post('/', registerUser);
router.post('/login', authUser);
router.put('/profile', protect, updateUserProfile);

module.exports = router;