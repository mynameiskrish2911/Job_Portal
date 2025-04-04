import React, { useEffect } from 'react'
import Navbar from '../shared/navbar'
import AppicantsTable from './smallComponent/AppicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { setApplicants } from '@/redux/applicationSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function JobApplicants() {
    const jobid=useParams().id;
    const dispatch=useDispatch();
    const {applicants}=useSelector(store=>store.application)
    useEffect(()=>{
        const fetchAllApplicants=async()=>{
            try {
                 const res=await axios.get(`${APPLICATION_API_END_POINT}/${jobid}/applicants`,{
                    withCredentials:true,
                 });
                 if(res.data.success)
                 {
                    dispatch(setApplicants(res.data.jobApplications));
                 }
            } catch (error) {
                 console.log(error); 
            }
        }
        fetchAllApplicants();
    },[],dispatch,jobid);
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto '>
              <h1 className='font-bold text-xl my-5'>Applicants ({applicants?.applications?.length})</h1>

              <AppicantsTable/>
        </div>
    </div>
  )
}
