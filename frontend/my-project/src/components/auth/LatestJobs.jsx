import React from 'react'
import LatestJobCard from './LatestJobCard';
import { useSelector } from 'react-redux';
import store from '@/redux/store';
import { useNavigate } from 'react-router-dom';


//const randomjobs = [1, 2, 3, , 5, 6, 7, 8];
export default function LatestJobs() {
  const {allJobs}=useSelector(store=>store.job);
  const navigate=useNavigate();
  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold '><span className='text-[#6A38C2]'>Latest & Top</span>Job Openings</h1>
       <div className='grid grid-cols-3 gap-4 my-5'>
       {
           allJobs.length <=0 ?<span>Job Not found</span>:allJobs?.slice(0,7).map((job) =><LatestJobCard  key={job._id} job={job} />)
        }
       </div>
       
     
    </div>
  )
}
