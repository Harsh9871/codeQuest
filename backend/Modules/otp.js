const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, required: true }
});

const CurrentOtpStored = mongoose.model('otpHistory', userSchema);

module.exports = CurrentOtpStored;
