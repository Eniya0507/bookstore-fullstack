const express = require('express');
const router = express.Router();
// IMPORTANT: Check this path. It must go UP (..) to controllers
const { registerUser, authUser } = require('../controllers/userController');

router.post('/', registerUser);
router.post('/login', authUser);

module.exports = router;