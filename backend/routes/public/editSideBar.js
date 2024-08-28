const express = require('express');
const router = express.Router();
const sideBar = require("../../Modules/sideBar")
router.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});


router.post('/', async (req, res) => {
    const { email, profilePicture, bio, education, skills, location, linkedIn, github, projects } = req.body;
    if (!email) {
        res.status(400).json({
            message: 'Email is required',
        });
    } else {


        const user = await sideBar.findOne({ email: email });
        if (!user) {
            res.status(404).json({
                message: 'User not found',
            });
        }
        try {
            user.profilePicture = profilePicture
            user.bio = bio;
            user.education = education;
            user.skills = skills;
            user.location = location;
            user.linkedIn = linkedIn;
            user.github = github;
            user.projects = projects;
            await user.save();
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Error storing user data',
            });
        }
        res.status(200).json({
            message: 'User data stored successfully',
        });
    }
});
module.exports = router;