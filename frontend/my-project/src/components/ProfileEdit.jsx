import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from './ui/button'

import store from '@/redux/store'
import { Loader2 } from 'lucide-react'
import { setLoading, setUser } from '@/redux/authSlice'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'


export default function ProfileEdit({ open, setOpen }) {
    //  const {loading}=useSelector(store=>store.auth);
    const [loading,setLoading]=useState(false);
    const dispatch=useDispatch();
    const {user}=useSelector(store=>store.auth);
    const [input,setInput]=useState({
        fullname:user?.fullname||"",
        email:user?.email||"",
        phoneNumber:user?.phoneNumber||"",
        skills:user?.profile?.skills?.map(skill=>skill)||"",
        bio:user?.profile?.bio||"",
        file:user?.profile?.resume||"",
    });
    const handleInput=(event)=>{
        setInput({...input,[event.target.name]:event.target.value});
    };
    const handleFile=(event)=>{
        setInput({...input,file:event.target.files?.[0]})
       
    };
    const handleSubmite=async(event)=>{
        event.preventDefault();
        const formData=new FormData();
        formData.append("fullname",input.fullname);
        formData.append("email",input.email);
        formData.append("phoneNumber",input.phoneNumber);
        formData.append("skills",input.skills);
        formData.append("bio",input.bio);
        if(input.file){
            formData.append("file",input.file);
        }
        try{
           
           setLoading(true);
            const res=await axios.post(`${USER_API_END_POINT}/profile/update`,formData,
            {
                      headers:{
                        "Content-Type":"multipart/form-data",
                      },
                      withCredentials:true,
            });
            if(res.data.success){
                
                dispatch(setUser(res.data.user1));
                toast.success(res.data.message);
            }
          
        }
        catch(error){
            console.log(error);
            toast.error(error);
        }
        finally{
            setOpen(false);
            console.log(input);
            setLoading(false);
        }
        
        
    }

    return (
        <div>
            <Dialog open={open}>
                <DialogContent className="max-w-[425px]" onInteractOutside={()=>setOpen(false)}>

                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmite}>
                        <div className='grid gap-4 py-4 '>
                            <div className='grid grid-cols-4 items-center'>
                                <Label htmlFor="name" className="text-right" >Name</Label>
                                <Input id="name" className="col-span-3" name="fullname" type="text" value={input.fullname} onChange={handleInput}></Input>
                            </div>
                            <div className='grid grid-cols-4 items-center'>
                                <Label htmlFor="email" className="text-right" >email</Label>
                                <Input id="email" className="col-span-3" name="email" type="text" value={input.email} onChange={handleInput}></Input>
                            </div>
                            <div className='grid grid-cols-4 items-center'>
                                <Label htmlFor="phoneNumber" className="text-right" >Phone No.</Label>
                                <Input id="phoneNumber" className="col-span-3" name="phoneNumber" type="number" value={input.phoneNumber} onChange={handleInput}></Input>
                            </div>
                            <div className='grid grid-cols-4 items-center'>
                                <Label htmlFor="bio" className="text-right" >Bio</Label>
                                <Input id="bio" className="col-span-3" name="bio" type="text" value={input.bio} onChange={handleInput}></Input>
                            </div>
                            <div className='grid grid-cols-4 items-center'>
                                <Label htmlFor="skill" className="text-right" >Skills</Label>
                                <Input id="skill" className="col-span-3" name="skills" type="text" value={input.skills} onChange={handleInput}></Input>
                            </div>
                            <div className='grid grid-cols-4 items-center'>
                                <Label htmlFor="file" className="text-right"  accept="application/pdf">Resume</Label>
                                <Input id="file"  className="col-span-3" name="file" type="file"  onChange={handleFile} accept="application/pdf"></Input>
                            </div>

                        </div>
                        <DialogFooter>
                       
                    {
                        loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animated-spin' />Please wait</Button>: <Button type="submite" className="w-full my-4">Update</Button>
                    }
                   
                    
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
