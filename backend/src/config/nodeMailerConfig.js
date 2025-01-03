// utils/nodeMailerUtil.js
import nodemailer from 'nodemailer';
import { emailUser , emailPass } from './dotenvConfig.js';
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailUser,
        pass: emailPass
    }
});

// Verify connection configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('Error setting up transporter:', error);
    } else {
        console.log('Mailer transporter is ready' , success);
    }
});

export {transporter};
