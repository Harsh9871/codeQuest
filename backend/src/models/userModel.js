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
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin','teacher'],
        default: 'user',
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    signUpVerifyToken: String,
    signUpVerifyTokenExpiry: Date, 
},{timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;
