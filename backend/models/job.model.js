import { application } from "express";
import mongoose, { Types } from "mongoose";
const jobschema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    requirements:[{
        type:String,
    }],
    salary:{
        type:Number,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    jobType:{
        type:String,
        required:true,
    },
    experienceLevel:{
        type:Number,
        required:true,
    },
    position:{
        type:Number,
        required:true,
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'company',
        required:true,
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    },
    applications:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'application',
      }
   ]
},{timestamps:true});

const job=mongoose.model("job",jobschema);
export default job;