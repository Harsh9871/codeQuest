import 'dotenv/config'; 

const emailUser = process.env.EMAIL;
const emailPass = process.env.EMAIL_PASSWORD;
const port = process.env.PORT || 8081;
const mongoURI = process.env.MONGODB_URI;

export {
    emailUser,
    emailPass,
    port,
    mongoURI
};
