import user from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getdatauri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


export const register=async(req,res)=>{
     try{
         const {fullname,email,phoneNumber,role,password}=req.body;
         if(!fullname||!email||!phoneNumber||!role||!password){
               return res.status(400).json({
                message:"something is missing",
                success:false,
               });
         }

         const file=req.file;
         const fileuri=getdatauri(file);
         const cloudResponse=await cloudinary.uploader.upload(fileuri.content);

         const newuser = await user.findOne({email});
         if(newuser){
            return res.status(400).json({
                message:"user already exist with this email",
                success:false,
               });
         }

         const hashedPassword =await bcrypt.hash(password,10);
         console.log("in databse");
         console.log(cloudResponse);
         await user.create({
            fullname,
            email,
            phoneNumber,
            role,
            password:hashedPassword,
            profile:{
                profilePhoto: cloudResponse.secure_url,
            }
         });
         return res.status(200).json({
            message:"Account created successfully",
            success:true,
         })
     }
     catch(error){
        console.log(error);

     }
};

export const login=async(req,res)=>{
     try{
          const {email,password,role}=req.body;
              if(!email||!role||!password){
                  return res.status(400).json({
                  message:"something is missing",
                  success:false,
                });
              }
            const newuser=await user.findOne({email});
            if(!newuser){
                return res.status(400).json({
                    message:"email does not exist",
                    success:false,
                  });
            }
            const isPasswordMatch=await bcrypt.compare(password,newuser.password);
           if(!isPasswordMatch){
            return res.status(400).json({
                message:"wrong password",
                success:false,
              });
           }
           if(role!=newuser.role){
               return res.status(400).json({
                   message:"Account of this role does not match.",
                   success:false,
              });
           }

           const tokenData={
               userId:newuser._id
           }
          const token=await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});
           
        //    let user={
        //     _id:newuser._id,
        //     fullname:newuser.fullname,
        //     phoneNumber:newuser.phoneNumber,
        //     role:newuser.role,
        //     profile:newuser.profile,
        //    }    
           
           return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpsOnly:true,sameSite:'strict'}).json({
              message:`welcome back ${newuser.fullname}`,
              newuser,
              success:true,
           })
     }
     catch(err){
        console.log(err);
     }
};


export const logout=async(req,res)=>{
     try{
         return res.status(200).cookie("token","",{maxAge:0}).json({
             message:"Logged Out succesfully",
             success:true,
         })
     }catch(err){
        console.log(err);
     }
}


export const updateProfile=async(req,res)=>{
    try {
        const{fullname,email,phoneNumber,bio,skills}=req.body;
        //console.log(fullname,email,phoneNumber,bio,skills);
        const file=req.file;
       
        // if(!fullname||!email||!phoneNumber||!bio||!skills){
        //     return res.status(400).json({
        //        message:"something is missing",
        //        success:false,
        //     });
        // };

        //cloudinary setup
        const fileuri=getdatauri(file);
        const cloudResponse=await cloudinary.uploader.upload(fileuri.content);
        let skillsArray;
        if(skills){
             skillsArray=skills.split(",");
        }
        const userId=req.id; //middleware authentication
        let newuser=await user.findById(userId);

        if(!newuser){
            return res.status(200).json({
                message:"user not found",
                success:false,
             });
        }
       //updating data
       if(fullname){
          newuser.fullname=fullname;
       }
       if(phoneNumber){
         newuser.phoneNumber=phoneNumber;
       }
       if(bio){
         newuser.profile.bio=bio;
       }
       if(skills){
         newuser.profile.skills=skillsArray;
       }
       if(email){
        newuser.email=email;
       }
       if(cloudResponse){
          newuser.profile.resume=cloudResponse.secure_url ;//save the cloudinary url
          newuser.profile.resumeOriginalName=file.originalname;// save the original name
       }
       
    
          //resume
          //photo 
          
        let user1=await newuser.save();
        
        // let user1={
        //     _id:newuser._id,
        //     fullname:newuser.fullname,
        //     email:newuser.email,
        //     phoneNumber:newuser.phoneNumber,
        //     role:newuser.role,
        //     profile:newuser.profile,
        // } 
        return res.status(200).json({
            message:"profile updated successfully",
            user1,
            success:true,
        })

    } catch (error) {
        console.log(error);
    }
}