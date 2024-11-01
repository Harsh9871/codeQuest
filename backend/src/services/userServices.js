import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import  { decodeToken } from '../services/jwtServices.js';

const getUserByToken = (token) =>{
    const data = decodeToken(token);
    return getUserById(data.userName);
}

const createUser = async(data) =>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password, salt);
    const myData = {
        userName:data.userName,
        password:hash,
        email:data.email,
        role:data.role ? data.role : 'user'
    }
    const user = new User(myData);
    try {
        await user.save();
        return {
            status:200,
            message:'User Created Successfully',
        }
    } catch (error) {
        return {
            error:error.message,
            status:500,
            message:'Internal Server Error'
        }        
    }
}

const getUserById = (userName) =>{
    return User.findOne({userName:userName});
}

export {
    createUser,
    getUserById,
    getUserByToken
}