import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'


export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }


  return (

    <div className='bg-white '>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16 '>
        <div>
          <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>portal</span></h1>
        </div>
        <div className='flex items-center gap-12'>
          {
            user && user.role == "recruiter" ?
              (
                <>
                  <li><Link to="/admin/companies">Companies</Link></li>
                  <li><Link to="/admin/jobs">Jobs</Link></li>
                </>
              )
              :
              (
                <>
                  <ul className='flex font-medium items-center gap-5'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/jobs">Jobs</Link></li>
                    <li><Link to="/browse">Browse</Link></li>
                  </ul>
                </>
              )

          }

          {
            !user ? (
              <div>
                <Link to="/login"><Button variant="outline">Login</Button></Link>
                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">SignUp</Button></Link>

              </div>
            ) : (
              <Popover >
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn"></AvatarImage>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className='gap-4'>
                    <div className='flex gap-2 space-y-2'>
                      <Avatar className="cursor-pointer">
                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn"></AvatarImage>
                      </Avatar>
                      <div>
                        <h4 className='font-medium'>{user.fullname}</h4>
                        <p className='text-sm text-muted-foreground'>{user.profile.bio}</p>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col  text-grey-600'>
                    {
                      user && user.role == "student" ? (
                        <>
                          <div className='flex w-fit items-center gap-2 cursor-pointer'>
                            <User2 />
                            <Button variant="link" className="bg-white"><Link to="/profile">View Profile</Link></Button>
                          </div>
                        </>
                      )
                      :(
                        <>
                        </>
                      )
                    }

                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link" className="bg-white">LogOut</Button>
                    </div>

                  </div>

                </PopoverContent>
              </Popover>

            )
          }
        </div>
      </div>
    </div>




  )
}
