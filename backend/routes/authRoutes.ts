import express from 'express';
import { register, login } from '../controllers/authController';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
// This file defines the authentication routes for user registration and login.