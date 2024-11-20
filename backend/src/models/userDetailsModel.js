import mongoose from 'mongoose';

const userDetailSchema = new mongoose.Schema({   
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    profileUrl:{
        type: String,
        default: 'http://localhost:5173/default.png',

    },
    points:{
        type: Number,
        default: 0,
    },
    description:{
        type: String,
        default: '...',
    },
    currentlyEmployedAt:{
        type: String,
        default: 'Hidden',
    },
    location:{
        type: String,
        default: 'Hidden',
    },
    education:{
        type: String,
        default: 'Hidden',
    },
    publicProfileUrl:{
        type: String,
        default: 'Hidden',
    },
    githubUrl:{
        type: String,
        default: 'Hidden',
    },
    linkedinUrl:{
        type: String,
        default: 'Hidden',
    },
    technologies:{  
        type: [String],
        default: [],
    },
    skills:{
        type: [String],
        default: [],
    },
    projects:{
        type: [String],
        default: [],
    },
    achievements:{
        type: [String],
        default: [],
    }
    

});

const UserDetail = mongoose.model('UserDetail', userDetailSchema);    
export default UserDetail;
