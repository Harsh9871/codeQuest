import {createUser,getUserById} from '../services/userServices.js';
import {createToken} from '../services/jwtServices.js';
const register = async (req, res) => {
    const { userName, password,confirmPassword, email, role } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Password and confirm password do not match' });
    }
    const user = await getUserById(userName);
    if (user) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const result = await createUser({ userName, password, email, role });
    if (result.status !== 200){
        return res.status(result.status).json({ message: result.message });
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