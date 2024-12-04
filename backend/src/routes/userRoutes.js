import express from 'express';
const userRouter = express.Router();
import { authMiddleware } from '../middleware/authMiddleware.js';
import { register, login, verifyEmail , userProfile , userByName , getUserDetails  , userDetails , uploadImage} from '../controller/userController.js';


userRouter.post('/login', login);

userRouter.get('/details',authMiddleware, getUserDetails);

userRouter.post('/details',authMiddleware, userDetails);

userRouter.post('/profile',userProfile);

userRouter.get('/:userName',userByName);

userRouter.post('/verifyEmail/:token', verifyEmail);

userRouter.post('/register', register);

userRouter.post('/uploadImage', authMiddleware, uploadImage);

export { userRouter };
