import mongoose from 'mongoose';
import { questionTemplate } from '../utils/questionTemplate';

// Define the structure for the questionTemplate
const questionSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId(), // Automatically generate a new ObjectId
        },
        language: {
            type: String,
            default: "",
        },
        title: {
            type: String,
            default: "",
        },
        description: {
            type: String,
            default: "",
        },
        imageUrl: {
            type: String,
            default: "",
        },
        defaultCode: {
            type: String,
            default: "",
        }, // User side code
        code: {
            type: [
                {
                    default: { type: String, default: `` },
                    result: { type: String, default: "" },
                },
            ],
            default: [],
        },
    },
    { _id: false } // Disable _id only if you don't need it
);

const teacherDetailsModel = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        profileUrl: {
            type: String,
            default: 'http://localhost:5173/default.png',
        },
        description: {
            type: String,
            default: '...',
        },
        location: {
            type: String,
            default: 'Hidden',
        },
        education: {
            type: String,
            default: 'Hidden',
        },
        githubUrl: {
            type: String,
            default: 'Hidden',
        },
        linkedinUrl: {
            type: String,
            default: 'Hidden',
        },
        questions: {
            type: [questionSchema], // Array of objects conforming to questionSchema
            default: [questionTemplate], // Start with a single template question
            validate: {
                validator: function (questions) {
                    return questions.every((question) =>
                        Object.keys(questionTemplate).every((key) => key in question)
                    );
                },
                message: 'Each question must conform to the question template.',
            },
        },
    },
    { timestamps: true }
);

const TeacherDetails = mongoose.model('TeacherDetails', teacherDetailsModel);
export default TeacherDetails;
