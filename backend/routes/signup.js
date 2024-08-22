const express = require('express');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/codeQuest").then(()=> console.log("Connected to database")).catch((err)=> console.log(err));

const newUser = require('../Modules/users.js');

router.get('/', (req, res) => {
    res.json({ message: 'Wrong Route method' });
    res.statusCode(404);
});


router.post('/' ,async (req,res)=>{
    const {name,email,password,confirmPassword,catagory} = req.body

    const existingUser = await newUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "authentication error" });
    }


    if(password !== confirmPassword){
        res.status(400).json({error:"authentication error"})
    }
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    
    const token = jwt.sign({email},process.env.JWT_SECRET)
    let userData = new newUser({
        name:name,
        email:email,
        passwd:hashedPassword,
        authToken:token,
        password:password,
        catagory:catagory
    }); 
    await userData.save();
    res.json({authToken:token})
})

module.exports = router;