import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaCopyright } from "react-icons/fa";

export default function Footer() {
    return (
        <div>
         
         
         <footer className="border-t border-t-gray-200 py-8">
            <div className='container mx-auto px-4'>
                <div className='flex flex-col md:flex-row justify-between items-center'>
                    <div className='mb-4 md:mb-0'>
                        <h2 className='text-xl font-bold'>Job Hunt</h2>
                        <p className='text-sm'><span ><FaCopyright className='inline-block text-lg'/></span> 2024 Your Company. All rights reserved</p>
                    </div>
                    <div className='flex space-x-4 mt-4 md:mt-0'>
                        <a href="https://facebook.com" className='hover:text-gray-400' aria-label='Facebook'>
                        <FaFacebook  size={30}/>
                        </a>
                        <a href="https://twitter.com" className='hover:text-gray-400' aria-label='Twitter'>
                        <FaSquareXTwitter  size={30}/>
                        </a>
                        <a href="https://linkedin.com" className='hover:text-gray-400 ' aria-label='LinkedIn'>
                        <FaLinkedin  size={30} />
                        </a>
                    </div>
               </div>
           </div>
        </footer> 
         
           

        </div>
    )
}
