import express from 'express';
const userRouter = express.Router();
import { register, login, verifyEmail , userProfile , userByName} from '../controller/userController.js';
// Redirect to user profile
userRouter.get('/', (_req, res) => {
    res.redirect('/user/profile');
});

// User login
userRouter.post('/login', login);

// Get user by userName

// Get user profile
userRouter.get('/profile',userProfile);

userRouter.get('/:userName',userByName);
// Verify email
userRouter.get('/verifyEmail/:token', verifyEmail);

// User registration
userRouter.post('/register', register);

export { userRouter };
