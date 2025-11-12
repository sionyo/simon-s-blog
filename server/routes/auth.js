const express = require('express');
const router = express.Router();
const { loginAdmin, getCurrentAdmin, initializeAdmin} = require('../controllers/authController');
const auth = require('../middleware/auth');

initializeAdmin();

router.post('/login', loginAdmin);
router.get('/me', auth, getCurrentAdmin);

module.exports = router;