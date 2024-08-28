const express = require('express');
const router = express.Router();
const sideBarDetails = require('../../Modules/sideBar.js');
// GET request
router.get('/', (req, res) => {
    console.log("Body of /sideBar "+req.body);
    res.send('Welcome to the Home Page!');
});

// POST request
router.post('/', async (req, res) => {
    const { email } = req.body;
    if(!email) {
        return res.status(400).json({ error: 'Email is required' });
    }
    const data = await sideBarDetails.findOne({email:email});
    if (!data) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    const response = {
        email: data?.email || "",
        profilePicture: data?.profilePicture || "",
        bio: data?.bio || "",
        education: data?.education || "",
        skills: data?.skills || "",
        location: data?.location || "",
        linkedIn: data?.linkedIn || "",
        github: data?.github || "",
        projects: data?.projects || "",
    };

    res.json(response);
});

module.exports = router;
