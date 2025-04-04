import React, { useState } from 'react'
import Navbar from './shared/navbar'

import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact2Icon, ContactIcon, MailIcon, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './auth/AppliedJobTable'
import { Link } from 'react-router-dom'
import ProfileEdit from './ProfileEdit'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import useGetAllAppliedJobs from '@/hooks/useGetAllAppliedJobs'



const skills = ["html", "css", "javascript", "react.js"];
export default function Profile() {
    useGetAllAppliedJobs();
    const isResume = true;
    const {user}=useSelector(store=>store.auth);
    const [open,setOpen]=useState(false);
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 '>
                <div className='flex justify-between '>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button className="text-right" variant="outline" onClick={()=>setOpen(true)}><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <MailIcon />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact2Icon />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills.length != 0
                                ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
                                : <p>NA</p>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="test-md font-bold">Resume</Label>
                    {
                        isResume
                            ? <a target="blank" href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a>
                            : <span>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobTable/>

            </div>
            <ProfileEdit open={open} setOpen={setOpen}/>
        </div>
    )
}
