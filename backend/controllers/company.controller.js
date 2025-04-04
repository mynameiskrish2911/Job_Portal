import company from "../models/company.models.js";
import cloudinary from "../utils/cloudinary.js";
import getdatauri from "../utils/datauri.js";



export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                messsage: "Comapny name is required",
                success: false,
            })
        };
        let newcompany = await company.findOne({ name: companyName });
        if (newcompany) {
            return res.status(400).json({
                message: "Comapny Name is Already Exist, so can't register",
                success: false,
            })
        };
        newcompany = await company.create({
            name: companyName,
            userId: req.id,
        });
        return res.status(201).json({
            success: true,
            message: "Company Registered successfully",
            newcompany,
        })
    } catch (error) {
        console.log(error);
    }
};


export const getCompany = async (req, res) => {
    try {
        const userId = req.id;//logged in
        const companies = await company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "company not found",
                success: false,
            })
        }
        return res.status(200).json({
            companies,
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
};



export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;//logged in
        const newcompany = await company.findById(companyId);
        if (!newcompany) {
            return res.status(404).json({
                message: "company not found",
                success: false,
            })
        }
        //  console.log(newcompany[0]);
        return res.status(200).json({
            newcompany,
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        
            const file = req.file;
            //cloudinary
            const fileuri = getdatauri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileuri.content);
            const updateData = {
                name,
                description,
                website,
                location,
                logo: cloudResponse.secure_url
            };
            const newcompany = await company.findByIdAndUpdate(req.params.id, updateData, { new: true });
            if (!newcompany) {
                return res.status(404).json({
                    message: "company not found",
                    success: false,
                })
            };  
        return res.status(200).json({
            message: "company information updated",
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}


