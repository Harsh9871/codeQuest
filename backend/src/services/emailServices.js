import {transporter} from '../config/nodeMailerConfig.js';
import {emailUser} from '../config/dotenvConfig.js';
const sendMail = async ({to, subject, text, html}) => {
    
    
    try {
        const info = await transporter.sendMail({
            from: emailUser,
            to,
            subject,
            text,
            html
        });
        return { status: 200, message: 'Email sent successfully', info };
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
        return { status: 500, message: 'Failed to send email', error: error.message };
    }
};

export { sendMail };