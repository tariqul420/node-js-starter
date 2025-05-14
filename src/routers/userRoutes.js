import express from 'express';
import {
  createUser,
  getUserRole,
  updateUser,
} from '../controllers/userController.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Create a new user
router.post('/', createUser);

// Update user
router.patch('/:email', updateUser);

// Get user role
router.get('/role/:email', verifyToken, getUserRole);

export default router;
