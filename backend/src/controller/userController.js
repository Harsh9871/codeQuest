import {createUser,getUserById,getUserByEmail ,getUserBySignupToken} from '../services/userServices.js';
import { createToken } from '../services/jwtServices.js';
import {sendMail} from '../services/emailServices.js'
import { port } from '../config/dotenvConfig.js';
const register = async (req, res) => {
    const { userName, email, password, confirmPassword, role } = req.body;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
    if (!userName || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    //match email to regx 
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return res.status(400).json({ message: 'email already exists' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Password and confirm password do not match' });
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.'
        });
    }
    const userNameRegex = /^[a-zA-Z0-9_]+$/;
    if (!userNameRegex.test(userName)) {
        return res.status(400).json({
            message: 'userName can only contain letters (a-z), numbers (0-9), and underscores (_).'
        });
    }
    const user = await getUserById(userName);
    if (user) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const result = await createUser({ userName,email, password,  role });
    if (result.status !== 200) {
        console.error('User creation failed:', result.error); // Log any errors
        return res.status(result.status).json({ message: result.error });
    }
    const signUpToken = createToken({ _id: result.user._id, username: userName, email: email, role: role });
    result.user.signUpVerifyToken = signUpToken;
    result.user.signUpVerifyTokenExpiry = Date.now() + 24 * 60 * 60 * 1000;
    await result.user.save();
    // Sending the verification email
    try {
        await sendMail({
            to: email, // Should be defined correctly
            subject: 'Verify your email',
            html: `<h1>Verify your email</h1>
            <p>Click <a href="http://localhost:${port}/user/verifyEmail/${signUpToken}">here</a> to verify your email</p>`
        });
        return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Failed to send verification email:', error);
        return res.status(500).json({ message: 'Error sending verification email' });
    }
};


const login = async (req, res) => {
    const { userName, password } = req.body;
    const user = await getUserById(userName);
    if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
    }
    const isPasswordValid = await bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid user name or password' });
    }
    const token = createToken({username:user.username,email:user.email,role:user.role});
    return res.status(200).json({ message: 'Login successful', token });
};

const verifyEmail = async (req, res) => {
    const {token} = req.params;
    console.log(token);
    
    // Find the user by sign-up verification token
    const user = await getUserBySignupToken(token);
    console.log(user);
    if (!user) {
        return res.status(400).json({ message: 'User does not exist or invalid token' });
    }

    // Check if token matches and if it hasn't expired
    if (user.signUpVerifyToken !== token || user.signUpVerifyTokenExpiry < Date.now()) {
        return res.status(400).json({ message: 'Token expired or invalid' });
    }

    // Update user status to verified and clear the token fields
    user.signUpVerifyToken = null;
    user.signUpVerifyTokenExpiry = null;
    await user.save();
    let responseToken = createToken({username:user.username,email:user.email,role:user.role},'7d');;
    return res.status(200).json({ message: 'Email verified successfully' , token:responseToken  });
};

export { register, login , verifyEmail };