
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import store from '@/redux/store';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { MoreHorizontal } from 'lucide-react';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';



const shortlistingStatus = ["Accepted", "Rejected"];


export default function AppicantsTable() {
    const { applicants } = useSelector(store => store.application);
    // const refreshPage = ()=>{
    //     window.location.reload();
    //  }
    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, {
                withCredentials: true,
            });
            const refreshPage = ()=>{
                window.location.reload();
             }
            if (res.data.success) {
                toast.success(res.data.message);
                refreshPage();

            }
        }
        catch (error) {
            toast.error(error);
        }
    }
    
    return (
        <div>
            <Table>
                <TableCaption>A list of recent Applied users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableCell>FullName</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Contact No.</TableCell>
                        <TableCell>Resume</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell className="text-right">Action</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications.map((item) => (
                            <tr>
                                <TableCell> {item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell className="text-blue-600 cursor-pointer">
                                    {
                                        item.applicant?.profile?.resume ? <a href={item?.applicant?.profile?.resume}>{item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell>{item?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    {
                                        item.status == "pending" ?
                                            <Popover>
                                                <PopoverTrigger>
                                                    <MoreHorizontal />
                                                </PopoverTrigger>
                                                <PopoverContent className="w-32 cursor-pointer">
                                                    {

                                                        shortlistingStatus.map((status, index) => {
                                                            return (
                                                                <div onClick={() => statusHandler(status, item?._id)} key={index} className="flex w-fit my-2  items-center " >
                                                                    <span >{status}</span>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </PopoverContent>
                                            </Popover>
                                            :
                                            <span>{item.status}</span>
                                }

                                </TableCell>
                            </tr>
                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}
