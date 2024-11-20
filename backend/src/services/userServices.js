import User from '../models/userModel.js';
import UserDetail from '../models/userDetailsModel.js';
import bcrypt from 'bcrypt';
const getUserBySignupToken = async (token) => {
    return await User.findOne({ signUpVerifyToken: token });
};

const passwordCompare = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};
const createUser = async (data) => {
    const salt = await bcrypt.genSalt(10); // Ensure this is awaited
    const hash = await bcrypt.hash(data.password, salt);
    
    
    try {
        const user = new User({
            username: data.userName,
            email: data.email,
            password: hash,
            role: data.role ? data.role : 'user'
        })
        await user.save();
        return ({
            status: 200,
            message: 'User created successfully',
            user: user
        });
        
    } catch (error) {
        console.error('Error creating user:', error.message);
        return ({
            error: error.message,
            status: 500,
            message: 'Internal Server Error'
        });
    }
};

const getUserById = async (userName) =>{
    return await User.findOne({username:userName});
}
const getUserByEmail = async (email) =>{
    return await User.findOne({email:email});
}

const getUserDetailsById = async (id) =>{
    return await UserDetail.findOne({user:id});
}
const createUserDetails = async (data) =>{
    try{
        const userDetail = new UserDetail({
            user:data.user,
            profileUrl:data.profileUrl,
            description:data.description,
            currentlyEmployedAt:data.currentlyEmployedAt,
            location:data.location,
            education:data.education,
            publicProfileUrl:data.publicProfileUrl,
            githubUrl:data.githubUrl,
            linkedinUrl:data.linkedinUrl,
            technologies:data.technologies,
            skills:data.skills,
            projects:data.projects
        })
    await userDetail.save();
    return ({
        status: 200,
        message: 'User details created successfully',
        userDetail: userDetail
    });
    }catch(error){
        console.error('Error creating user details:', error.message);
        return ({
            error: error.message,
            status: 500,
            message: 'Internal Server Error'
        });
    }
}
export {
    createUser,
    getUserById,
    getUserBySignupToken,
    getUserByEmail,
    passwordCompare,
    getUserDetailsById,
    createUserDetails
}