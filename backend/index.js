const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000 ;
console.log(PORT);

const express = require('express');
const app = express();

app.use(express.json());


// Root route
app.get('/', (req, res) => {
    console.log("Body of /"+req.body);
    res.send('Hello World!');
});



//router for signup
const signUp = require("./routes/signup/signup.js") 
app.use("/signup",signUp)


const login = require("./routes/signup/login.js")
app.use("/login",login)


const forgetPassword = require("./routes/signup/forgetPassword.js")
app.use("/forgetPassword",forgetPassword)


const verifyOtp = require("./routes/signup/verifyOtp.js")
app.use("/verifyOtp",verifyOtp)


const setNewPassowrd = require("./routes/signup/setNewPassword.js")
app.use("/setNewPassword",setNewPassowrd)

//public preview of profile / dashboard

const dashBoardView = require("./routes/public/profile.js")
app.use("/in/:slug",dashBoardView)


//sidebar details 
const sideBar = require("./routes/public/sidebar.js")
app.use("/sidebar",sideBar)
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
