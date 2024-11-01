import {createUser,getUserById,getUserByEmail} from '../services/userServices.js';
import {createToken} from '../services/jwtServices.js';
const register = async (req, res) => {
    const { userName, email, password, confirmPassword, role } = req.body;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    console.log(req.body); // Log incoming request body
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
    

    return res.status(200).json({ message: result.message });
};


const login = async (req, res) => {
    const { userName, password } = req.body;
    const user = await getUserById(userName);
    if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
    }
    const isPasswordValid = await bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
    }
    const token = createToken({username:user.userName,email:user.email,role:user.role});
    return res.status(200).json({ message: 'Login successful', token });
};

export { register, login };