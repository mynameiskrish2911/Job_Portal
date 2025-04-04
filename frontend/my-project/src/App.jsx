import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Login from './components/auth/login';
import Signup from './components/auth/Signup';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import ProfileEdit from './components/ProfileEdit';
import Companies from './components/admin/Companies';
import ComapanyCreate from './components/admin/ComapanyCreate';
import CompanySetup from './components/admin/CompanySetup';
import JobAdmin from './components/admin/jobadmin';
import AdminJobCreate from './components/admin/AdminJobCreate';
import JobApplicants from './components/admin/JobApplicants';
import ProtectedRoute from './components/admin/ProtectedRoute';
const appRouter=createBrowserRouter([
   {
      path:'/',
      element:<Home/>,
   },
   {
    path:'/login',
    element:<Login/>
   },
   {
      path:'/signup',
      element:<Signup/>,
   },
   {
       path:'/jobs',
       element:<Jobs/>
   },
   {
    path:'/browse',
    element:<Browse/>
   },
   {
    path:'/profile',
    element:<Profile/>
   },
   {
    path:"/description/:id",
    element:<JobDescription/>,
   },
   // for admin
   {
    path:"/admin/companies",
     element:<ProtectedRoute><Companies/></ProtectedRoute>
   } ,
   {
    path:"/admin/companies/create",
     element:<ProtectedRoute><ComapanyCreate/></ProtectedRoute>
    } ,
    { 
    path:"/admin/companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute>
   },
   { 
    path:"/admin/jobs",
    element:<ProtectedRoute><JobAdmin/></ProtectedRoute>
   },
   { 
    path:"/admin/jobs/create",
    element:<ProtectedRoute><AdminJobCreate/></ProtectedRoute>
   },
   { 
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><JobApplicants/></ProtectedRoute>
   },
   
   
]);

function App() {
  
  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
