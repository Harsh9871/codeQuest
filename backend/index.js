const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000 ;
console.log(PORT);

const express = require('express');
const app = express();

app.use(express.json());

app.use(express.static('public'));
// Root route
app.get('/', (req, res) => {
    console.log("Body of /"+req.body);
    res.send('Hello World!');
});

//router for signup
const signUp = require("./routes/user/signup.js") 
app.use("/signup",signUp)


const login = require("./routes/user/login.js")
app.use("/login",login)


const forgetPassword = require("./routes/user/forgetPassword.js")
app.use("/forgetPassword",forgetPassword)


const verifyOtp = require("./routes/user/verifyOtp.js")
app.use("/verifyOtp",verifyOtp)


const setNewPassowrd = require("./routes/user/setNewPassword.js")
app.use("/setNewPassword",setNewPassowrd)

//public preview of profile / dashboard

const dashBoardView = require("./routes/public/profile.js")
app.use("/in/:slug",dashBoardView)


//sidebar details 
const sideBar = require("./routes/public/sidebar.js")
app.use("/sidebar",sideBar)

const  editSideBar = require("./routes/public/editSideBar.js")
app.use("/editSideBar",editSideBar)

//create roomCodeForTeacher
const roomCodeForTeacher = require('./routes/teacher/createRoomCode.js')
app.use("/createRoomCode",roomCodeForTeacher);


//uploadImage 
const uploadImage = require('./services/uploadImage.js')
app.use('/uploadImage',uploadImage)

//create Questions 
const questions = require("./routes/teacher/quesitons.js");
app.use("/createQuestion",questions);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
