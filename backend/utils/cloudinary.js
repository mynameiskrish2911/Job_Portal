import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
dotenv.config({});
// const { CloudinaryStorage }=require('multer-storage-cloudinary');


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET,
});

export default cloudinary;
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//        folder: 'job-portal-resume',
//        allowerdFormats:["jpg","jpeg","pdf"], // supports promises as well
//     },
//  });

// module.exports={
//     cloudinary,
//     storage,
// }