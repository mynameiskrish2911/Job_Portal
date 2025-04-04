import React, { useEffect, useState } from 'react'
import Navbar from '../shared/navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { Description } from '@radix-ui/react-dialog'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast, Toaster } from 'sonner'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import useGetCompanyById from '@/hooks/useGetCompanyById'

export default function CompanySetup() {
  const params = useParams();
  const companyId = params.id;
  
  useGetCompanyById(companyId);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  
  const {singleCompany}=useSelector(store=>store.company);
 

  const navigate=useNavigate();
  const [loading, setLoading] = useState(false);
  const inputHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };
  const fileHandler = (event) => {
    setInput({ ...input, file: event.target.files?.[0] });
  }
  const submiteHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {

          setLoading(true);
           const res = await axios.put(`${COMPANY_API_END_POINT}/update/${companyId}`, formData, {
           headers: {
                'Content-Type': 'multipart/form-data',
                    },
           withCredentials: true,
           });
           if(res.data.success){

               toast.success(res.data.message);
               navigate("/admin/companies");
           }

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    finally{
         setLoading(false);
    }
  }

  useEffect(()=>{
      setInput({
        name:singleCompany.name||"",
        description: singleCompany.description||"",
        website:singleCompany.website|| "",
        location: singleCompany.location||"",
        file: singleCompany.file||"",
      })
  },[singleCompany]);

  return (
    <div>
      <Navbar />
      <div className='max-w-xl mx-auto my-10'>
        <form action="" onSubmit={submiteHandler}>
          <div className='flex items-center gap-5 p-8'>
            <Link to="/admin/companies"><Button variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
              <ArrowLeft />
              <span>Back</span>
            </Button>
            </Link>
            <h1 className='font-bold text-xl'>Company Setup</h1>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label>Company Name</Label>
              <Input type="text" name="name" value={input.name} onChange={inputHandler} />
            </div>
            <div>
              <Label>Description</Label>
              <Input type="text" name="description" value={input.description} onChange={inputHandler} />
            </div>
            <div>
              <Label>Website</Label>
              <Input type="text" name="website" value={input.website} onChange={inputHandler} />
            </div>
            <div>
              <Label>Location</Label>
              <Input type="text" name="location" value={input.location} onChange={inputHandler} />
            </div>
            <div>
              <Label>Logo</Label>
              <Input type="file" accept="image/*"  onChange={fileHandler} />
            </div>

          </div>
          {
             loading ? <Button className="w-full my-8"><Loader2 className='mr-2 h-4 w-4 animated-spin' />Please wait</Button>: <Button type="submite" className="w-full my-8">update</Button>
          }

        </form>

      </div>
    </div>
  )
}
