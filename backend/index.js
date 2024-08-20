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


//router for test routing 
const testRoute = require("./routes/test.js")
app.use("/test",testRoute)


//router for signup
const signUp = require("./routes/signup.js") 
app.use("/signup",signUp)


const login = require("./routes/login.js")
app.use("/login",login)

//Otp router 
const otpRoute = require("./routes/sendOtp.js")
app.use("/otp",otpRoute)
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
