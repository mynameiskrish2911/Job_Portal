import React, { useEffect, useState } from 'react'
import Navbar from '../shared/navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import ComapniesTable from './smallComponent/ComapniesTable'
import { Link, useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'


export default function Companies() {
    useGetAllCompanies();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [input,setInput]=useState("");
    useEffect(()=>{
        dispatch(setSearchCompanyByText(input));
    },[input]);
    return (
        <>
            <div >
                <Navbar />
                <div className=' max-w-6xl mx-auto my-10 '>
                    <div className='flex items-center justify-between my-5'>
                        <Input className="w-fit" placeholder="filter by name" onChange={(e)=>setInput(e.target.value)}/>
                        <Button onClick={()=>navigate("/admin/companies/create")}>New Company</Button> 
                    </div>
                    <ComapniesTable/>

                </div>
            </div>
        </>
    )
}
