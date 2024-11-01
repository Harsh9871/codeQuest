import express from 'express';
const userRouter = express.Router();
import { getUserById,getUserByToken } from '../services/userServices.js';
import {register , login} from '../controller/userController.js';
userRouter.get('/', (_req, res) => {
    res.redirect('/user/profile');
});

userRouter.get('/:userName',async(req,res)=>{
    return await getUserById(req.params.userName)
});

userRouter.get('/profile', async(req, res) => {
    return await getUserByToken(req.headers.authorization)
});

userRouter.post('/register',register)

export default userRouter;