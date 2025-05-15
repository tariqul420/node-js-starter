import { Router } from 'express';
import {
  createUser,
  getUserRole,
  updateUser,
} from '../controllers/userController.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

// Create a new user
router.post('/create', createUser);

// Update user
router.patch('/:email', updateUser);

// Get user role
router.get('/role/:email', verifyToken, getUserRole);

export default router;
