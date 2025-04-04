import mongoose from "mongoose";
const userschema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["recruiter","student"],
        required:true,
    },
    profile:{
        bio:{
            type:String,
        },
        skills:[
           {type:String,} 
        ],
        resume:{
            type:String,//url for resume file
        },
        resumeOriginalName:{
            type:String,
        },
        company:{
           type:mongoose.Schema.Types.ObjectId,
           ref:'company', //only for student
        },
        profilePhoto:{
            type:String,
            default:"",
        }
    }
},{timestamps:true});

const user=mongoose.model("user",userschema);
export default user;