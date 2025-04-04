import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';


export default function HeroSection() {
  const[query,setQuery]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const searchJobHandler=(e)=>{
    e.preventDefault();
      dispatch(setSearchQuery(query));
        navigate(`/browse`);
  }
  return (
    <div className='text-center '>
        <div className='flex flex-col gap-5 my-10'>
                  <span className='px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium mx-auto'>No. 1 Job Hunt Website</span>
                  <h1 className='text-5xl font-bold'>Search, Apply & <br/>
                   Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                   <p>Lorem ipsum,  lore dkefv wjcnj dolor sit amet const first = useContext second</p>
                   <div className='flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                       <input  name="query" value={query} 
                               type="text" 
                               onChange={(e)=>setQuery(e.target.value)}
                               placeholder='Find Your Dream Destination' 
                               className='outline-none border-none w-full ' />
                       <Button className="rounded-r-full bg-[#6A38C2]" onClick={searchJobHandler}><Search className='h-5 w-5'/></Button>
                  </div>
        </div>
    </div>
  )
}
