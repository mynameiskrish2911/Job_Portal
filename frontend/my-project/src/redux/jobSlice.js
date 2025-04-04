import { createSlice } from "@reduxjs/toolkit";


const jobSlice=createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminJobs:[],
        singleJob:null,
        searchJobByText:"",
        userJobs:[],
        searchQuery:"",
        filterJob:"",
        
    },
    reducers:{
        //actions
        setAllJobs:(state,action)=>{
            state.allJobs=action.payload;
        },
        setSingleJobs:(state,action)=>{
            state.singleJob=action.payload;
        },
        setAllAdminJobs:(state,action)=>{
            state.allAdminJobs=action.payload;
        },
        setSearchJobByText:(state,action)=>{
            state.searchJobByText=action.payload;
        },
        setUserJobs:(state,action)=>{
            state.userJobs=action.payload;
        },
        setSearchQuery:(state,action)=>{
            state.searchQuery=action.payload;
        },
        setFilterJob:(state,action)=>{
            state.filterJob=action.payload;
        }

       
        
    }

});

export const { setAllJobs,
               setSingleJobs,
               setAllAdminJobs,
               setSearchJobByText,
               setUserJobs, 
               setSearchQuery,setFilterJob}=jobSlice.actions;
export default jobSlice.reducer;