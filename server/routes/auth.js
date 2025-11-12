import express from 'express';
import authController from '../controllers/authController.js';
import auth from '../middleware/auth.js';
const router = express.Router();



router.post('/login', authController.loginAdmin);
router.get('/me', auth, authController.getCurrentAdmin  );

export default router;