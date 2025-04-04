import { setUserJobs } from "@/redux/jobSlice"
import { APPLICATION_API_END_POINT } from "@/utils/constant"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetAllAppliedJobs=()=>{
    const dispatch=useDispatch();
    useEffect(()=>{
       const fetchAllJobs=async()=>{
             try {
                const res=await axios.get(`${APPLICATION_API_END_POINT}/get`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setUserJobs(res.data.allApplication));
                    console.log("success");
                }
                
             } catch (error) {
                console.log(error);
             }
       }
       fetchAllJobs();
    },[])
}

export default useGetAllAppliedJobs;