import React, { useEffect, useState } from 'react'
import Navbar from './shared/navbar'
import JobCard from './auth/JobCard';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import { useNavigate } from 'react-router-dom';



const randomJobs = [1, 2, 3];

export default function Browse() {
    useGetAllJobs();
    
    const { searchQuery, allJobs } = useSelector(store => store.job);
    const {user}=useSelector(store=>store.auth);
    const [filJob, setFilJob] = useState(allJobs);
    const navigate=useNavigate();
    useEffect(() => {
        if(user){
            const fetchjob = allJobs.length>0&&allJobs.filter((job) => {
                if (searchQuery === "" || searchQuery === null) {
                    return false;
                }
                return ((job?.title?.toLowerCase()?.replace(/[^a-zA-Z0-9]/g, '')?.includes(searchQuery?.toLowerCase()?.replace(/[^a-zA-Z0-9]/g, ''))) ||
                       ( job?.location?.toLowerCase()?.replace(/[^a-zA-Z0-9]/g, '')?.includes(searchQuery?.toLowerCase()?.replace(/[^a-zA-Z0-9]/g, ''))) || 
                       (job?.jobType?.toLowerCase()?.replace(/[^a-zA-Z0-9]/g, '')?.includes(searchQuery?.toLowerCase()?.replace(/[^a-zA-Z0-9]/g, ''))) || 
                       (job?.company?.name.toLowerCase()?.replace(/[^a-zA-Z0-9]/g, '')?.includes(searchQuery?.toLowerCase()?.replace(/[^a-zA-Z0-9]/g, ''))) || 
                       (job?.company?.website.toLowerCase()?.replace(/[^a-zA-Z0-9]/g, '')?.includes(searchQuery?.toLowerCase()?.replace(/[^a-zA-Z0-9]/g, ''))))||
                       ( job?.requirements?.some((item)=>item?.toLowerCase()?.replace(/[^a-zA-Z0-9]/g, '')?.includes(searchQuery?.toLowerCase()?.replace(/[^a-zA-Z0-9]/g, '')))) ;
            });
            setFilJob(fetchjob);
        }
        else{
            navigate("/login");
        }
    }, [searchQuery, allJobs]);
   
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 '>
                <h1 className='font-bold my-10 text-xl'>Search Results ({filJob.length})</h1>
                <div className='grid grid-cols-3 gap-4 '>
                    {filJob.length <= 0
                        ? 
                          <div>
                           <strong><h2 className='text-3xl'>There is Nothing to search.</h2></strong>
                            <p>Enter Something to search</p>
                        </div>
                        : filJob?.map((item, index) => {
                            return (
                                <JobCard job={item} key={index} />
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}
