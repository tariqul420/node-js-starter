import express from 'express';
import { createToken, logout } from '../controllers/jwtController.js';

const router = express.Router();

// Create JWT token
router.post('/', createToken);

// Logout
router.post('/logout', logout);

export default router;
