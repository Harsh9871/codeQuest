const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

dotenv.config();

const newUser = require('../../Modules/users.js');
const otpModule = require('../../Modules/otp.js');

// Function to generate a random OTP
const generateOtp = (length = 8) => {
    // Generate a random buffer
    const buffer = crypto.randomBytes(Math.ceil(length * 0.5));
    
    // Convert buffer to a hexadecimal string
    const otp = buffer.toString('hex').slice(0, length);

    // Ensure the OTP has the required length
    return otp.toUpperCase().padStart(length, '0');
};

// Handle invalid routes
router.get('/', (_req, res) => {
    res.status(404).json({ error: "Invalid route" });
});

// Handle OTP generation and email sending
router.post('/', async (req, res) => {
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    // Check if email exists in the database
    const user = await newUser.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: 'Unknown email' });
    }
    const otpRecordofUser = await otpModule.findOne({ email });
    

    // Generate OTP
    const otp = generateOtp();

    if(otpRecordofUser){
        otpRecordofUser.otp = otp;
        otpRecordofUser.createdAt = Date.now()+10*60*1000
        await otpRecordofUser.save();
        res.status(200).json({ message: 'OTP sent successfully' });
    }
    else{
    // Setup email options
    const mailOptions = {
        from: process.env.OTP_EMAIL,
        to: email,
        subject: "OTP for password reset (valid for 10 minutes)",
        text: `Your OTP is ${otp}`
    };

    // Create a transporter object
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.OTP_EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    try {
        // Send email
        await transporter.sendMail(mailOptions);

        // Save OTP to the database
        const otpHistory = new otpModule({
            email: email,
            otp: otp,
            createdAt: Date.now()+10*60*1000
        });
        await otpHistory.save();

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send OTP' });
    }}
});

module.exports = router;
