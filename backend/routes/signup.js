const express = require('express');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

router.get('/', (req, res) => {
    res.json({ message: 'Wrong Route method' });
    res.statusCode(404);
});


router.post('/' ,async (req,res)=>{
    const {name,email,password,confirmPassword} = req.body
    if(!password === confirmPassword){
        res.status(400).json({error:"password does not match"})
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const user = {
        name,
        email
    }
    const token = jwt.sign({user},process.env.JWT_SECRET)
    res.json({authToken:token})
})

module.exports = router;