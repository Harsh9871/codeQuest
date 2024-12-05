import { createUser, getUserById, getUserByEmail, getUserBySignupToken, passwordCompare, getUserDetailsById ,createUserDetails} from '../services/userServices.js';
import { createToken, getDataFromToken } from '../services/jwtServices.js';
import { sendMail } from '../services/emailServices.js'
import { port } from '../config/dotenvConfig.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
const register = async (req, res) => {
    const { userName, email, password, confirmPassword, role } = req.body;
    
    if (!userName || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    
    //match email to regx 
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#])[A-Za-z\d@$!%*?&_#]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.',
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
    const result = await createUser({ userName, email, password, role });
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
            <p>Click <a href="http://localhost:${port}/user/verifyEmail/${signUpToken}">here</a> to verify your email</p>
            <p>Click <a href="http://localhost:${5173}/verifyEmail/${signUpToken}">here</a> to verify your email by front end</p>`
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
    const isPasswordValid = await passwordCompare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid user name or password' });
    }
    const token = createToken({ username: user.username, email: user.email, role: user.role }, '7d');
    return res.status(200).json({ message: 'Login successful', token });
};

const verifyEmail = async (req, res) => {
    const { token } = req.params;
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
    let responseToken = createToken({ username: user.username, email: user.email, role: user.role }, '7d');;
    return res.status(200).json({ message: 'Email verified successfully', token: responseToken , role: user.role });
};

const userProfile = async (req, res) => {
    try {

        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }
        const data = getDataFromToken(token);
        if (!data) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        const user = await getUserById(data.username);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }
        return res.status(200).json({ name: user.username, email: user.email });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const userByName = async (req, res) => {
    try {
        const user = await getUserById(req.params.userName);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ username: user.username, email: user.email });
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getUserDetails = async (req, res) => {
    try {
        // Ensure user is authenticated (user data should be available in req.user due to the authMiddleware)
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        // Fetch the user's detailed profile data
        const userDetails = await getUserDetailsById(user._id);
        if (!userDetails) {
            return res.status(404).json({ message: 'User details not found' });
        }

        return res.status(200).json({
            profileUrl: userDetails.profileUrl,
            points: userDetails.points,
            description: userDetails.description,
            currentlyEmployedAt: userDetails.currentlyEmployedAt,
            location: userDetails.location,
            education: userDetails.education,
            publicProfileUrl: userDetails.publicProfileUrl,
            githubUrl: userDetails.githubUrl,
            linkedinUrl: userDetails.linkedinUrl,
            technologies: userDetails.technologies,
            skills: userDetails.skills,
            projects: userDetails.projects,
            achievements: userDetails.achievements,
        });
    } catch (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const userDetails = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        const {
            profileUrl,
            description,
            currentlyEmployedAt,
            location,
            education,
            publicProfileUrl,
            githubUrl,
            linkedinUrl,
            technologies,
            skills,
            projects,
        } = req.body;

        const createDetails =await createUserDetails({
            user: user._id,
            profileUrl,
            description,
            currentlyEmployedAt,
            location,
            education,
            publicProfileUrl,
            githubUrl,
            linkedinUrl,
            technologies,
            skills,
            projects,
        });
        if (!createDetails) {
            return res.status(400).json({ message: 'Failed to create user details' });
        }
        
        return res.status(200).json({ message: 'User details created successfully' });
    } catch (error) {
        console.error('Error updating user details:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};



// Directory setup for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../asset/images')); // Store images in the asset/images folder
    },
    filename: (req, file, cb) => {
        const username = req.user?.username || 'default_user'; // Use req.user.username or fallback
        const ext = path.extname(file.originalname);
        cb(null, `${username}.jpg`); // Save file as {username}.{extension}
    }
});

// File filter to accept only image files
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

// Initialize multer
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
});

// Controller function
const uploadImage = (req, res) => {
    console.log('Received image upload request');
    
    upload.single('image')(req, res, (err) => {
        if (err) {
            console.error('Multer error: ', err);
            return res.status(400).json({ error: err.message });
        }
        if (!req.file) {
            console.log('No file found in request');
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const imageUrl = `http://localhost:8080/asset/images/${req.file.filename}`;
        res.status(200).json({ 
            message: 'Image uploaded successfully', 
            imageUrl: imageUrl 
        });
    });
};

export { register, login, verifyEmail, userProfile, userByName, getUserDetails , userDetails ,uploadImage};