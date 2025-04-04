import React, { useEffect } from 'react'
import Navbar from './shared/navbar'
import HeroSection from './auth/HeroSection'
import CategoryCarousel from './auth/CategoryCarousel'
import LatestJobs from './auth/LatestJobs'
import Footer from './auth/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { useNavigate } from 'react-router-dom'
import { setSearchQuery } from '@/redux/jobSlice'



export default function Home() {
  useGetAllJobs();
  const navigate =useNavigate();
  const {user}=useSelector(store=>store.auth);
 
  useEffect(()=>{
       
       if(user?.role=="recruiter"){
           navigate("/admin/companies");
       }
  },[]);
  return (
    <div>
      
        <Navbar/>
        <HeroSection/>
        <CategoryCarousel/>
        <LatestJobs/>
        <Footer/>

    </div>
  )
}
