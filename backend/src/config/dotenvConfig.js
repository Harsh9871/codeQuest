import 'dotenv/config'; 

const emailUser = process.env.EMAIL;
const emailPass = process.env.EMAIL_PASSWORD;
const port = process.env.PORT || 8081;
const mongoURI = process.env.MONGODB_URI;
const JWT_SECRET=process.env.JWT_SECRET;


export {
    emailUser,
    emailPass,
    port,
    mongoURI,
    JWT_SECRET
};
