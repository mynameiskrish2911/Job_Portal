import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import store from '@/redux/store'

import { Edit2, MoreHorizontal } from 'lucide-react'

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ComapniesTable() {
    const navigate=useNavigate();
    const { companies,searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany,setFilterCompany]=useState(companies);
    useEffect(()=>{
           const filteredCompany=companies.length>=0&&companies.filter((company)=>{
               if(!searchCompanyByText){
                   return true;
               }
               return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
           });
           setFilterCompany(filteredCompany);
    },[companies,searchCompanyByText])
    return (
        <div>
            <Table>
                <TableCaption>
                    A list of your recent register comapany
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.map((company) => (
                           
                         <TableRow>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={company?.logo} />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{company.name}</TableCell>
                                    <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                 <div className='flex items-center gap-2 w-fit cursor-pointer' onClick={()=>navigate(`/admin/companies/${company?._id}`)}>
                                                    <Edit2 />
                                                    <span>Edit</span>
                                                </div>
                                               
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                    </TableRow>
                               
                            
                        ))
                    }


                </TableBody>
            </Table>
        </div>
    )
}

export default ComapniesTable