const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000 ;
console.log(PORT);

const express = require('express');
const app = express();

app.use(express.json());


// Root route
app.get('/', (req, res) => {
    res.send('Hello World!');
});



//router for signup
const signUp = require("./routes/signup.js") 
app.use("/signup",signUp)


const login = require("./routes/login.js")
app.use("/login",login)


const forgetPassword = require("./routes/forgetPassword.js")
app.use("/forgetPassword",forgetPassword)


const verifyOtp = require("./routes/verifyOtp.js")
app.use("/verifyOtp",verifyOtp)


const setNewPassowrd = require("./routes/setNewPassword.js")
app.use("/setNewPassword",setNewPassowrd)
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
