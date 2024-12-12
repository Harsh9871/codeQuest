import mongoose from 'mongoose';
import { questionTemplate } from '../utils/questionsClass';
const teacherDetailsModel = new mongoose.Schema({   
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
    description:{
        type: String,
        default: '...',
    },
    location:{
        type: String,
        default: 'Hidden',
    },
    education:{
        type: String,
        default: 'Hidden',
    },githubUrl:{
        type: String,
        default: 'Hidden',
    },
    linkedinUrl:{
        type: String,
        default: 'Hidden',
    },
    questionss:{
        type: Array,
        default:[questionTemplate],
    }
}, { timestamps: true });

const TeacherDetails = mongoose.model('TeacherDetails', teacherDetailsModel);    
export default TeacherDetails;
