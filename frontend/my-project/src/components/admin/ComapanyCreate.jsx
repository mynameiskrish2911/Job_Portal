import React, { useState } from 'react'
import Navbar from '../shared/navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'

function ComapanyCreate() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [companyName,setCompanyName]=useState();

    const registerNewCompany=async()=>{
        try {
            const res=await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName},{
                headers:{
                    'Content-Type':'application/json',
                },
                withCredentials:true,
            });
             if(res?.data?.success){
                 toast.success(res.data.message);
                 dispatch(setSingleCompany(res.data.newcompany));
                 const companyId=res.data.newcompany._id;
                 navigate(`/admin/companies/${companyId}`);
             } 
        }catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Comapany Name</h1>
                    <p className='text-gray-500'>what would you like to give your comapany name? you can change this latter </p>
                </div>

                <Label>Comapany Name</Label>
                <Input type="text" className="my-2"  placeholder="JobHunt, Microsoft etc" onChange={(e)=>setCompanyName(e.target.value)} />

                <div className='flex items-center gap-2 my-10'>
                     <Link to="/admin/companies"><Button variant="outline">Cancel</Button></Link>
                     <Button onClick={registerNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default ComapanyCreate