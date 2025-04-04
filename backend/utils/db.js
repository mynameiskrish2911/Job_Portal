import mongoose from "mongoose";


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/job-portal");
 }
 main().then(()=>{
     console.log("job-portal database connected");
 })
 .catch((err)=>{
     console.log(err);
 });


export default main;