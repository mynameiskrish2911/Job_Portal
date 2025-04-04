import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux'
import store from '@/redux/store'



export default function AppliedJobTable() {
    const {userJobs}=useSelector(store=>store.job);
  return (
    <div>
        <Table>
            <TableCaption>
                 A List of Your applied jobs
            </TableCaption>
            <TableHeader>
                <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Job Role</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                 {
                      userJobs.length>0?
                          
                      userJobs.map((item,index)=>(
                        <TableRow key={index}> 
                            <TableCell>{item?.createdAt?.split('T')[0]}</TableCell>
                            <TableCell>{item?.job?.title}</TableCell>
                            <TableCell>{item?.job?.company?.name}</TableCell>
                            <TableCell className="text-right"><Badge className={`${item?.status=="rejected"?"bg-red-400":item?.status=="pending"?"bg-gray-400":"bg-green-400"}`}>{item?.status.toUpperCase()}</Badge></TableCell>
                        </TableRow>
                    ))
                      
                      
                     :
                      <div>No Applied Jobs</div>





                    
                 }
            </TableBody>
        </Table>
    </div>
  )
}
