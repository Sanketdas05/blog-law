import express from 'express';
import { login, register, getMe } from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/login', login);
router.post('/register', register);

// Protected route
router.get('/me', auth, getMe);

export default router;
