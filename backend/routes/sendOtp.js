const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const newUser = require('../Modules/users.js');

dotenv.config();

router.get('/', (req, res) => {
    res.status(404).json({ error: "No data" });
});

const generateOtp = (length = 8) => {
    // Generate a random buffer
    const buffer = crypto.randomBytes(Math.ceil(length * 0.5));
    
    // Convert buffer to a hexadecimal string
    const otp = buffer.toString('hex').slice(0, length);

    // Ensure the OTP has the required length
    return otp.toUpperCase().padStart(length, '0');
};
router.post('/', async (req, res) => {
    const { email } = req.body;
    // Check if email is provided is in database or not
    const user = await newUser.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: 'Unknown email' });
    }
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    // Generate the OTP
    const otp = generateOtp();
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.OTP_EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // Setting up the mail options
    const mailOptions = {
        from: process.env.OTP_EMAIL,
        to: email,
        subject: "OTP for signup",
        text: `Your OTP is ${otp}`
    };

    try {
        // Using a promise-based approach for sending the email
        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully ${otp}`);        
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send OTP' });
    }
});

module.exports = router;
