const express = require('express');
const router = express.Router();
const User = require("../../Modules/users");

router.get('/', (req, res) => {
    const userName = req.baseUrl.replace("/in/", "");
    console.log("Body of /in/profile : " + userName);
    res.send(`Invalid Route for ${userName}`);
});

router.post('/', async (req, res) => {
    const userName = req.baseUrl.replace("/in/", "");
    
    try {
        // Replace 'email@example.com' with the actual identifier you want to use
        const user = await User.findOne({ name: userName });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const response = {
            name: user.name,
            email: user.email,
            category: user.category
        };
        
        res.json(response);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
