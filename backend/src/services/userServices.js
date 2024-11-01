import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import  { decodeToken } from '../services/jwtServices.js';

const getUserByToken = (token) =>{
    const data = decodeToken(token);
    return getUserById(data.userName);
}

const createUser = async (data) => {
    const salt = await bcrypt.genSalt(10); // Ensure this is awaited
    const hash = await bcrypt.hash(data.password, salt);
    console.log(`userName ${data.userName} email ${data.email} hash ${hash} role ${data.role}`);
    
    try {
        await new User({
            username: data.userName,
            email: data.email,
            password: hash,
            role: data.role ? data.role : 'user'
        }).save().then(
            console.log('User created successfully')
        )
        return ({
            status: 200,
            message: 'User created successfully'
        });
        
    } catch (error) {
        console.error('Error creating user:', error.message);
        return ({
            error: error.message,
            status: 500,
            message: 'Internal Server Error'
        });
    }
};

const getUserById = async (userName) =>{
    return await User.findOne({userName:userName});
}
const getUserByEmail = async (email) =>{
    return await User.findOne({email:email});
}
export {
    createUser,
    getUserById,
    getUserByToken,
    getUserByEmail
}