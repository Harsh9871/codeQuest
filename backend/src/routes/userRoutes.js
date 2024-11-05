import express from 'express';
const userRouter = express.Router();
import { getUserById, getUserBySignupToken } from '../services/userServices.js';
import { register, login, verifyEmail } from '../controller/userController.js';

// Redirect to user profile
userRouter.get('/', (_req, res) => {
    res.redirect('/user/profile');
});

// User login
userRouter.post('/login', login);

// Get user by userName
userRouter.get('/:userName', async (req, res) => {
    try {
        const user = await getUserById(req.params.userName);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user); // Send user data as response
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get user profile
userRouter.get('/profile', async (req, res) => {
    try {
        const user = await getUserBySignupToken(req.headers.authorization);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        return res.status(200).json(user); // Send user profile as response
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Verify email
userRouter.get('/verifyEmail/:token', verifyEmail);

// User registration
userRouter.post('/register', register);

export { userRouter };
