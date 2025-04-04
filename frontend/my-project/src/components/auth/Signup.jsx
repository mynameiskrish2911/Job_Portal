import React, { useEffect, useState } from 'react'
import Navbar from '../shared/navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'


export default function Signup() {
    const [input,setInput]=useState({
        fullname:"",
        email:"",
        phoneNumber:"",
        password:"",
        role:"",
        file:"",
    }); 
    const navigate= useNavigate(); 
    const {loading,user}=useSelector(store=>store.auth);
    const dispatch=useDispatch();
    const changeEventHandler=(event)=>{
        setInput({...input,[event.target.name]:event.target.value})
    };


    const changeFilerHandler=(event)=>{
        setInput({...input,file:event.target.files?.[0]});
    };

    const submiteHandle =async(event)=>{
         event.preventDefault();
         
         const formData= new FormData();
         formData.append("fullname",input.fullname);
         formData.append("email",input.email);
         formData.append("phoneNumber",input.phoneNumber);
         formData.append("password",input.password);
         formData.append("role",input.role);
         if(input.file){
            formData.append("file",input.file);
         }
        try {
            dispatch(setLoading(true));
            console.log(input);
            const res =await axios.post(`${USER_API_END_POINT}/register`,formData,{
                headers:{
                         "Content-Type":"multipart/form-data",
                },
                withCredentials:true,
            });
            if(res.data.success){
                navigate("/login");
                toast.success(res.data.message);
            }
           
        } catch (error) {
            console.log(error);
            toast(error.response.data.message)
        }
        finally{
            dispatch(setLoading(false));
        }
        
         
    }
    useEffect(()=>{
            if(user){
                navigate("/");
            }
    },[]);
    
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto '>
                <form action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10' onSubmit={submiteHandle}>
                    <h1 className='font-bold text-xl mb-5'>SignUp</h1>
                    <div className='my-2'>
                        <Label>FullName</Label>
                        <Input type="text" placeholder="name" name="fullname" value={input.fullname} onChange={changeEventHandler}></Input>
                    </div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input type="email" placeholder="email" name="email" value={input.email} onChange={changeEventHandler}></Input>
        
                    </div>
                    <div className='my-2'>
                        <Label>PhoneNumber</Label>
                        <Input type="number" placeholder="Phone Number" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler}></Input>
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input type="password" placeholder="password" name="password" value={input.password} onChange={changeEventHandler}></Input>
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-4">
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="recruiter" id="r1" checked={input.role=='recruiter'} className="cursor-pointer" onChange={changeEventHandler}/>
                                <Label htmlFor="r1">Recruiter</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                            <Input type="radio" name="role" value="student" id="r2" className="cursor-pointer" checked={input.role=='student'} onChange={changeEventHandler}/>
                                <Label htmlFor="r2">Student</Label>
                            </div>
                            
                        </RadioGroup>
                        <div className='flex items-center gap-2'>
                                    <Label>Profile</Label>
                                    <Input accept="image/*" type="file" className="cursor-pointer"  onChange={changeFilerHandler}  />
                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animated-spin'/>Please Wait</Button>: <Button type="submite" className="w-full my-4">SignUp</Button>
                    }
                    <span className='text-sm'>Already have an account <Link to="/login" className='text-blue-600'>Login</Link> </span>
                </form>
            </div>
        </div>
    )
}
