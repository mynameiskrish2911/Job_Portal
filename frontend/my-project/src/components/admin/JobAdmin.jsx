import React, { useEffect, useState } from 'react'
import Navbar from '../shared/navbar'

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

import AdminJobsTable from './smallComponent/AdminJobsTable';
import useGetAdminJobs from '@/hooks/useGetAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';

export default function JobAdmin() {
    useGetAdminJobs();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [input,setInput]=useState("");
    useEffect(()=>{
        dispatch(setSearchJobByText(input));
    },[input]);

  return (
     <>
            <div >
               
                <Navbar />
            
                <div className=' max-w-6xl mx-auto my-10 '>
                    <div className='flex items-center justify-between my-5'>
                        <Input className="w-fit" placeholder="filter by name" onChange={(e)=>setInput(e.target.value)}/>
                        <Button onClick={()=>navigate("/admin/jobs/create")}>New Jobs</Button> 
                    </div>
                <AdminJobsTable/>

                </div>
            </div>
        </>
  )
}
