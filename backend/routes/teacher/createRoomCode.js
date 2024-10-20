const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

router.post('/',async (req, res) => {
    const {email,code} = req.body;
    if(!email){
        res.status(400).json({'message':'Email is required'});
    }
    if(!code){
        res.status(400).json({'message':'Code is required'});
    }
    //check if email already exists
    
    const roomCode = require('../../Modules/roomCode.js');
    const checkEmail = await roomCode.findOne({email});
    if(checkEmail){
        // update code hear 
        checkEmail.code = code;
        await checkEmail.save();
        res.status(200).json({'message':'code Updated successfully'});
    }else{
        const roomCodeData = new roomCode({email,code});
        await roomCodeData.save();
        res.json({'message':'Room code created successfully'});
    }
})
module.exports = router;