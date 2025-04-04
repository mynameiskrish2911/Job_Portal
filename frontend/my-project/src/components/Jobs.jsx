import React, { useEffect, useState } from 'react'
import Navbar from './shared/navbar'
import Footer from './auth/Footer'
import FilterCard from './auth/FilterCard'
import { motion } from 'framer-motion'
import JobCard from './auth/JobCard'
import {  useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'


const jobarr = [1, 2, 3, 4, 5, 6, 7, 8,3, 4, 5, 6, 7, 8];

export default function Jobs() {
    const {allJobs,filterJob}=useSelector(store=>store.job);
    const {user}=useSelector(store=>store.auth);
    const [filJob,setFilJob]=useState(allJobs);
    const dispatch=useDispatch();
    const navigate=useNavigate()
    useEffect(()=>{
                  if(user){
                    const fetch=allJobs.length>0&&allJobs.filter((job)=>{
                        if(filterJob===""||filterJob===null){
                            return true;
                        }
                        return ((job?.title?.toLowerCase()?.replace(/[^a-zA-Z0-9]/g, '')?.includes(filterJob?.toLowerCase()?.replace(/[^a-zA-Z0-9]/g, '')))||
                                (job?.location?.toLowerCase()?.replace(/[^a-zA-Z0-9]/g, '')?.includes(filterJob?.toLowerCase()?.replace(/[^a-zA-Z0-9]/g, ''))));
                    });
                    setFilJob(fetch);   
                  }
                  else{
                     navigate("/login");
                  }
               
        
    },[filterJob,allJobs]);
    // const showJobs=()=>{
    //     dispatch(setFilJob(allJobs));
    // };
    return (
        <div>
            <Navbar />
             <div className='max-w-7xl mx-auto '>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                        {/* <Button onClick={showJobs}>Show All Jobs</Button> */}
                    </div>
                    {
                        filJob.length <= 0
                            ? <span>Job not found</span>
                            : (
                                <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                    <div className='grid grid-cols-3 gap-4'>
                                        {
                                            filJob.lenght<=0?<span>No Job Found</span>:filJob?.map((job) =>
                                                <motion.div
                                                initial={{opacity:0,x:100}}
                                                animate={{opacity:1,x:0}}
                                                transition={{duration:0.3}}
                                                exit={{opacity:0,x:-100}}
                                                key={job?._id}> 
                                                    <JobCard  job={job} />
                                                </motion.div>)
                                        }
                                    </div>
                                </div>
                            )
                    }
                     
                </div>
               
            </div>
            {/* <Footer /> */}

        </div>
    )
}
