import ComapanyCreate from '@/components/admin/ComapanyCreate'
import { setSingleCompany } from '@/redux/companySlice'
import { setAllJobs } from '@/redux/jobSlice'
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = (CompanyId) => {
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchSingleCompany=async()=>{
            try {
                 const res=await axios.get(`${COMPANY_API_END_POINT}/get/${CompanyId}`,{withCredentials:true});
                 if(res.data.success){
                      dispatch(setSingleCompany(res.data.newcompany));
                 }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleCompany();
    },[CompanyId,dispatch])
}

export default useGetCompanyById