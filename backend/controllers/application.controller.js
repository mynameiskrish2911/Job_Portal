import { application } from "express";
import application1 from "../models/application.model.js";
import job from "../models/job.model.js";


export const applyjob = async (req, res) => {
    try {
        const userId = req.id;
        const { id: jobId } = req.params;
        if (!jobId) {
            return response.status(400).json({
                message: "JobId is required",
                success: false,
            });
        };
        //check is the user has already apply for the job
        const existingApplication = await application1.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "you have already applied for this job",
                success: false,
            });
        };
      
        //check if the job is exist
        const jobexist = await job.findById(jobId);
        if (!jobexist) {
            return res.status(400).json({
                message: "job not found",
                success: false,
            });

        };
        
        // create a new application
        const newapplication = await application1.create({
            job: jobId,
            applicant: userId,
        });
        jobexist.applications.push(newapplication._id);
        await jobexist.save();
        return res.status(200).json({
            message: "New Appilcation Registered.",
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
};

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const allApplication = await application1.find({ applicant: userId })
            .sort({ createdAt: -1 }).
            populate({
                path: 'job',
                options: {
                    sort: {
                        createdAt: -1
                    }
                },
                populate: {
                    path: "company",
                    options: {
                        sort: {
                            createdAt: -1
                        }
                    },
                },
            });
        if (!allApplication) {
            return res.status(404).json({
                message: "No Application",
                success: false,
            });
        };
        return res.status(200).json({
            allApplication,
            success: true,
        })

    } catch (error) {
        console.log(error);
    }
};


//for admin
export const getApplicants = async (req, res) => {
    try {
        const { id: jobId } = req.params;
        const jobApplications = await job.findById(jobId).populate({
                     path:'applications',
                     options:{sort:{createdAt:-1}},
                     populate:{
                        path:'applicant',
                     },
        });
        if(!jobApplications){
            return res.status(404).json({
                message:"Appications Not Found",
                message:false,
            });
        };
        return res.status(200).json({
            jobApplications,
            success:true,
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateStatus=async(req,res)=>{
    try {
        const {status}=req.body;
        const applicationId=req.params.id;
        if(!status){
            return res.status(404).json({
                message:"status is required",
                success:false,
            });
        };
        const upapplication=await application1.findOne({_id:applicationId});
        if(!upapplication){
            return res.status(404).json({
                message:"application not found",
                success:false,
            });
        };
        // update status 
         upapplication.status=status.toLowerCase();
         await upapplication.save();
         return res.status(200).json({
            message:"status updated successfully",
            success:true,
         });
    } catch (error) {
        console.log(error);
    }
}