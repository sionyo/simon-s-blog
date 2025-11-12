import express from 'express';
import { loginAdmin, getCurrentAdmin, initializeAdmin } from '../controllers/authController.js';
import auth from '../middleware/auth.js';
const router = express.Router();


initializeAdmin();

router.post('/login', loginAdmin);
router.get('/me', auth, getCurrentAdmin);

export default router;