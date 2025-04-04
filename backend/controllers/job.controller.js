import job from "../models/job.model.js";


export const postjob=async(req,res)=>{
    try {
        
        const{title,description,requirements,salary,location,jobType,experienceLevel,position,companyId}=req.body;
        const userId=req.id;
        console.log(title,description,requirements,salary,location,jobType,experienceLevel,position,companyId);
        if(!title||!description||!requirements||!salary||!location||!jobType||!experienceLevel||!position||!companyId){
            return res.status(400).json({
                message:"something is missing",
                success:false,
            });
        };
        const jobs=await job.create({
            title,
            description,
            requirements:requirements.split(","),
            salary:Number(salary),
            location,
            jobType,
            experienceLevel,
            position,
            company:companyId,
            created_by:userId,
        });
        return res.status(201).json({
            message:"new job created successfully ",
            jobs,
            success:true,
        });
        
    } catch (error) {
        console.log(error);
    }
};

//student
export const  getAlljobs=async(req,res)=>{
    try {
        const keyword=req.query.keyword||"";
        const query={
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}},
            ]
        };
        const jobs=await job.find(query).populate({path:'company'}).sort({createdAt:-1});
        
        if(!jobs){
            return res.status(404).json({
                message:"job not found",
               success:false,
            });
        };
        return res.status(200).json({
            jobs,
            success:true,
        })
    } catch (error) {
        console.log(error);
    }
};


//students
export const getJobById=async(req,res)=>{
    try {
        const jobId=req.params.id;
        const job1=await job.findById(jobId).populate({
              path:"applications",
        });
        if(!job1){
             return res.status(404).json({
                message:"jobs not found",
                success:false,
             });
        };
        return res.status(200).json({
            job1,
            success:true,
        })
    } catch (error) {
        console.log(error);
    }
};



//admin job ketli create kari
export const getAdminJobs=async(req,res)=>{
    try {
        const adminId=req.id;
        const jobs =await job.find({created_by:adminId}).populate({
            path:'company',
            createdAt:-1,
        });
        if(!jobs){
            return res.status(404).json({
                message:"jobs not found",
                success:false,
            });
        };
        return res.status(200).json({
            jobs,
            success:true,
        })

    } catch (error) {
        console.log(error);
    }
}


