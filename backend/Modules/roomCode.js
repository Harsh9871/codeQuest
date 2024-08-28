const mongoose = require('mongoose');

const roomCodeModule = new mongoose.Schema({
    email: {type: String,required: true},
    code:{type: String,required: true}
});

const roomCode = mongoose.model('roomCodes', roomCodeModule);

module.exports = roomCode;
