import express from 'express';
import {
    register,
    login,
    verifyEmail,
    userProfile,
    userByName,
    getUserDetails,
    userDetails,
    uploadImage,
} from '../controller/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

// Authentication Routes
userRouter.post('/register', register); // User Registration
userRouter.post('/login', login); // User Login
userRouter.post('/verifyEmail/:token', verifyEmail); // Verify Email

// User Details and Profile
userRouter.get('/details', authMiddleware, getUserDetails); // Get User Details
userRouter.get('/:userName', userByName); // Get User by Username
userRouter.post('/details', authMiddleware, userDetails); // Add/Edit User Details
userRouter.post('/profile', userProfile); // User Profile

// Upload Routes
userRouter.post('/uploadImage', authMiddleware, uploadImage); // Upload Image

export { userRouter };
