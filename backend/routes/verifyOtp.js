const express = require('express');
const router = express.Router();

// Import your Mongoose model correctly
const otpModule = require('../Modules/otp.js'); // Adjust the path as needed
const users = require('../Modules/users.js')
// Handle invalid GET requests
router.get('/', (req, res) => {
    res.status(404).json({ error: "Bad request" });
});

// Handle OTP verification
router.post('/', async (req, res) => {
    const { email, otp } = req.body;

    // Validate input fields
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }
    if (!otp) {
        return res.status(400).json({ error: 'OTP is required' });
    }

    try {
        // Find the user by email
        const user = await otpModule.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Unknown email' });
        }

        // Debugging: log the OTPs being compared
        console.log('Stored OTP:', user.otp);
        console.log('Provided OTP:', otp);

        // Check if OTP matches
        if (user.otp !== otp) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        // Check if OTP has expired (10 minutes validity)
        const otpExpiryTime = new Date(user.createdAt).getTime() + 10 * 60 * 1000;
        if (Date.now() > otpExpiryTime) {
            return res.status(400).json({ error: 'OTP expired' });
        }
        const newUser  = await users.findOne({email:email})
        // OTP is valid
        res.status(200).json({
            message: 'OTP verified successfully',
            token: newUser.authToken
         });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
