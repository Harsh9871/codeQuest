import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'teacher'],
        default: 'user',
    },
    forgetPasswordToken: {type: String, default:null},
    forgetPasswordTokenExpiry: {type:Date , default: null},
    signUpVerifyToken: {type: String, default:null},
    signUpVerifyTokenExpiry: {type:Date , default: Date.now()+ 24 * 60 * 60 * 1000}, 
}, { timestamps: true });

const User = mongoose.model('User', userSchema);    
export default User;
