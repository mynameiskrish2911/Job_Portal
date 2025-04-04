import React, { useState } from 'react'
import Navbar from '../shared/navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { Toaster } from '../ui/sonner';
import { toast } from 'sonner';

const companyarr = [];

export default function AdminJobCreate() {
    const [input, setInput] = useState({
        title: "",
        description: "",
        salary: 0,
        requirements: "",
        location: "",
        position: 0,
        experienceLevel: 0,
        jobType: "",
        companyId: ""
    });
    const { companies } = useSelector(store => store.company)
    const navigate = useNavigate();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };
    // const selectChangeHandler=(value)=>{
    //     const selectedCompany=companies.find((company)=>company.name.toLowerCase()==value);
    //     setInput({...input,companyId:selectedCompany._id});
    // }
    const onsubmithandler = async (event) => {
        event.preventDefault();
        console.log(input);
        try {
            // setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            if (res.data.success) {

                toast.success(res.data.message);
                navigate("/admin/jobs");
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        finally {
            //setLoading(false);
        }

    }

    return (
        <div>
            <Navbar />

            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={onsubmithandler} className='p-8 max-w-4xl border-gray-200 shadow-lg rounded-md'>
                    <Button className="w-full mb-6" onClick={() => navigate(`/admin/jobs`)}>Back</Button>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input name="title" type="text" value={input.title} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input name="description" type="text" value={input.description} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input name="salary" type="number" value={input.salary} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>No of Position</Label>
                            <Input name="position" type="number" value={input.position} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input name="requirements" type="text" value={input.requirements} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input name="location" type="text" value={input.location} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Experience</Label>
                            <Input name="experienceLevel" type="number" value={input.experience} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Job-Type</Label>
                            <Input name="jobType" type="text" value={input.jobType} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                    </div>
                    {
                        companies.length >= 0 && (
                            // <Select onChange={changeEventHandler} name="companyId">
                            //     <SelectTrigger >
                            //         <SelectValue placeholder={"Select a company"} />
                            //     </SelectTrigger>
                            //     <SelectContent>
                            //         <SelectGroup>
                            //             <SelectLabel>Company</SelectLabel>
                            //             {
                            //                 companies.map((company)=>{
                            //                     return (
                            //                 <SelectItem  value={company?._id} >{company.name}</SelectItem>
                            //               )})
                            //             }
                            //         </SelectGroup>
                            //     </SelectContent>
                            // </Select>
                            <select name="companyId" onChange={changeEventHandler}  >
                                <option>select a company</option>
                                     {
                                            companies.map((company)=>{
                                                 return (
                                               <option value={company._id}>{company.name}</option>
                                             )})
                                         }      
                            </select>
                        )
                    }
                    <Button className="w-full mt-4">Post New Job</Button>
                    {
                        companies.length == 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>Please register company first before posting a job</p>
                    }
                </form>
            </div>

        </div>
    )
}
