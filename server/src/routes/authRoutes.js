import express from 'express';
import { deleteUser, getProfile, getUsers, loginUser, registerUser } from '../controllers/authController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.get('/users', protect, admin, getUsers);
router.delete('/users/:id', protect, admin, deleteUser);

export default router;
