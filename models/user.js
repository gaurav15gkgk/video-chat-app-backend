//importing libraries
import mongoose from "mongoose";

//user schema
const userSchema = new mongoose.Schema({
    name :{
        type: String,
        required : true
    },
    userName : {
        type : String, 
        required : true,
        unique : true
    },
    email : {
        type: String, 
        required : true,
        unique : true
    },
    emailVerified: {
        type: Boolean, 
        default: false
    },
    password: {
        type: String, 
        required: true
    }
},  {timestamps: true})

const userModel = mongoose.model('user', userSchema)

export default userModel
