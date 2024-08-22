const mongoose = require('mongoose');

const userScema = new mongoose.Schema({
    name:String,
    email:String,
    passwd:String,
    authToken:String,
    catagory:String || "student",
    password:String
});
 
const User = mongoose.model('users', userScema); // Corrected mongoose spelling

module.exports = User;