import React from 'react';
import Logo from "../assets/Logo.png"
import { Link } from "react-router-dom"
import { FaTelegram } from "react-icons/fa";


export default function Home() {
  return (
    <div className='px-3 max-w-[1300px] mx-auto  min-h-[100vh] flex flex-col '>
      <div className=' flex items-center justify-between py-3 '>
        <div>
          <img src={Logo} alt="" className=' w-[15rem] object-cover ' />
        </div>
        <div className=' text-[1.3rem] bg-blue-600 text-[#fff] flex items-center justify-center px-8 py-1 rounded-md hover:bg-[#313131] transition duration-300 ease-in-out   '>
          <Link to={"/signin"} >Sign In</Link>
        </div>
      </div>
       
      <div className=' flex flex-col justify-between flex-1 '>
        <div>
       <div className=' text-[2.5rem] leading-tight font-bold flex flex-col items-center text-center mt-5 '>
       <h2>Monetize Every</h2>
       <h2 className=' text-blue-600 '>Task</h2>
       </div>
       <div className=' text-center max-w-[800px] mx-auto text-[#5a5a5a] mt-5 '>
        <p>If you want to work as a publisher with Team Work, then this is a good network for you, because here you don't have to promote any offer link to anyone, here you are a traffic, daily task and can earn a fixed amount of income, also you can double your income by buying the premium package and there is also the opportunity to earn by referring.

        </p>

       </div>
       <div className=' flex justify-center mt-8 '>
        <Link to={"/signin"} className=' bg-blue-600 text-[#fff] px-6 py-1 rounded-md text-xl ' >Start Earning</Link>
       </div>
       </div>
       <div>
       <div className=' flex justify-end font-semibold text-[1.6rem] border-b pb-3 border-blue-500 '>
        <h3>Contact Us</h3>
       </div>
       <div className=' text-[#5a5a5a] mt-5 text-xl flex flex-col items-center gap-2 justify-center mb-5 '>
        <p>Join our Team Work official telegram channel</p>
        <Link to={"https://t.me/team_work_official"} target='_blank'>
        <FaTelegram className=' text-blue-600 text-[2rem] ' />
        </Link>
        <p>@ 2024 Team Work. All Right Reserved</p>
       </div>
      </div>
       </div>

    </div>
  );
}
