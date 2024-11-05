// utils/nodeMailerUtil.js
import nodemailer from 'nodemailer';
import { emailUser , emailPass } from './dotenvConfig';
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailUser,             // Your Gmail address
        pass: emailPass
    }
});

// Verify connection configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('Error setting up transporter:', error);
    } else {
        console.log('Mailer transporter is ready');
    }
});

export {transporter};
