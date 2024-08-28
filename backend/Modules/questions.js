const mongoose = require('mongoose');

const createdQuestions = new mongoose.Schema({
    image:{type:String},
    title:{type:String},
    description:{type:String},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now},
    createdBy:{type:String},
});

const questionsModule = mongoose.model('createdQuestions', createdQuestions);

module.exports = questionsModule;
