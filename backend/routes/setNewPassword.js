const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // For hashing passwords
const UserModel = require('../Modules/users.js'); // Adjust the path as needed

// Handle invalid GET requests
router.get('/', (req, res) => {
    res.status(404).json({ error: "Invalid route" });
});

// Handle password update
router.post('/', async (req, res) => {
    const { email,authToken, password, confirmPassword } = req.body;

    // Validate input fields
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }
    if (!password || !confirmPassword) {
        return res.status(400).json({ error: 'Password and confirm password are required' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
        // Find the user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if(authToken != user.authToken){
            return res.status(404).json({ error: 'Unverified token' });
        }
        
        // Hash the new password
        const saltRounds = 10; // Number of salt rounds
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Update the user's password
        user.passwd = hashedPassword;
        user.password = password;

        // Save the updated user document
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
