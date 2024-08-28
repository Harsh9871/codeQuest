const mongoose = require('mongoose');

const sideBarData = new mongoose.Schema({
    email: { type: String, required: true },
    profilePicture: { type: String },
    bio: { type: String },
    education: { type: String },
    skills: { type: Array },
    location: { type: String },
    linkedIn: { type: String },
    github: { type: String },
    projects: { type: Array },
});

const sideBarDetails = mongoose.model('sideBarDetails', sideBarData);

module.exports = sideBarDetails;
