import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilterJob, setSearchQuery } from '@/redux/jobSlice';




const filterData = [
  {
    filterType: "Location",
    arr: ["Delhi", "Banglore", "Hydrabad", "Surat", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    arr: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Science"],
  },
  {
    filterType: "salary",
    arr: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];


export default function FilterCard() {
  const [selected,setSelected]=useState("");
  const {filterJob}=useSelector(store=>store.job);
const dispatch=useDispatch();
const navigate=useNavigate();
const searchJobHandler=(value)=>{
      setSelected(value);
  }
  useEffect(()=>{
    dispatch(setFilterJob(selected));
  },[selected]);

  
  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg '>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup value={selected} onValueChange={searchJobHandler}  >
        {
          filterData.map((data, index) => (
            <div>
              <h1 className='font-bold text-lg' >{data.filterType}</h1>
              {
                data.arr.map((item, index) => {
                  return (
                    <div className='flex items-center space-x-2 my-2' onClick={()=>searchJobHandler(item)}>
                      <RadioGroupItem value={item} />
                      <Label>{item}</Label>
                    </div>
                  );
                })
              }
            </div>
          ))
        }
      </RadioGroup>
      
    </div>
  )
}
