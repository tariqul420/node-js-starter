import express from 'express';
import { createToken, logout } from '../controllers/jwtController.js';

const router = express.Router();

// Create JWT token
router.post('/create', createToken);

// Logout
router.post('/remove', logout);

export default router;
