import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import store from '@/redux/store';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AdminJobsTable() {
    const navigate=useNavigate();
    const { companies,searchCompanyByText } = useSelector(store => store.company);
    const {allAdminJobs,searchJobByText}=useSelector(store=>store.job);
    const [filterJobs,setFilterJobs]=useState(allAdminJobs);
    useEffect(()=>{
           const filteredJobs=allAdminJobs.length>=0&&allAdminJobs.filter((job)=>{
               if(!searchJobByText){
                   return true;
               }
               return (job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())||job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())||job?.jobType?.toLowerCase().includes(searchJobByText.toLowerCase()));
           });
           setFilterJobs(filteredJobs);
    },[allAdminJobs,searchJobByText])
  return (
    <div>
        <Table>
            <TableCaption>A List of your recent posted Jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
          <TableBody>
            {
                filterJobs?.map((job)=>(
                     <tr>
                    <TableCell>{job?.company?.name}</TableCell>
                    <TableCell>{job?.title}</TableCell>
                    <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                    <TableCell className="text-right cursor-pointer">
                           <Popover>
                               <PopoverTrigger>
                                   <MoreHorizontal/>
                               </PopoverTrigger>
                               <PopoverContent className="w-32">
                                    <div className='flex gap-2 items-center w-fit cursor-pointer' onClick={()=>navigate(``)}>
                                        <Edit2 className='w-4'></Edit2>
                                        <span>Edit</span>
                                    </div>
                                    <div className='flex items-center w-fit gap-2 mt-2 cursor-pointer' onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)}>
                                        <Eye className='w-4'/>
                                        <span>Applicants</span>
                                    </div>
                               </PopoverContent>
                           </Popover>
                    </TableCell>
                
                     </tr>
                ))
            }
          

          </TableBody>
        </Table>
    </div>
  )
}
