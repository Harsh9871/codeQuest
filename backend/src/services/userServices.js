import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
const getUserBySignupToken = async (token) => {
    return await User.findOne({ signUpVerifyToken: token });
};

const passwordCompare = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};
const createUser = async (data) => {
    const salt = await bcrypt.genSalt(10); // Ensure this is awaited
    const hash = await bcrypt.hash(data.password, salt);
    
    
    try {
        const user = new User({
            username: data.userName,
            email: data.email,
            password: hash,
            role: data.role ? data.role : 'user'
        })
        await user.save();
        return ({
            status: 200,
            message: 'User created successfully',
            user: user
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
    return await User.findOne({username:userName});
}
const getUserByEmail = async (email) =>{
    return await User.findOne({email:email});
}


export {
    createUser,
    getUserById,
    getUserBySignupToken,
    getUserByEmail,
    passwordCompare,
}