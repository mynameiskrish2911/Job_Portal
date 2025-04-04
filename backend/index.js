
import express from "express";
const app=express();
import dotenv from "dotenv";
dotenv.config({});
import cookieParser from "cookie-parser";
import cors from "cors";
import main from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRouter from "./routes/company.route.js";
import jobRouter from "./routes/job.route.js";
import applicationRouter from "./routes/application.route.js";

 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions={
    origin:'http://localhost:5173',
    credentials:true,
}
app.use(cors(corsOptions));


app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRouter);
app.use("/api/v1/job",jobRouter);
app.use("/api/v1/applications",applicationRouter);

// app.get("/home",(req,res)=>{
//     // res.send("hello");
//     return res.status(200).json({
//         message:"i am coming form backend",
//         success:true,
//     })
// })
const port=8000;
app.listen(port,(req,res)=>{
    main();
    console.log(`port ${port} is listed`);
});