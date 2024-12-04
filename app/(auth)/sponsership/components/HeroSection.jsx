"use client"
import React from 'react';
// import Sidebar from "./Sidebar";
import Image from 'next/image';
import { FaAward } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
export default function Home() {
  return (
    <div className="bg-white overflow-hidden ">
      

    

      <main className="flex flex-col theme   justify-between items-center gap-8  p-6 py-16  ">
        <div className='w-full md:flex justify-end pr-10 hidden  '>
          <button className='border rounded p-2 text-white '>Apply for Schlorship</button>
          </div>
          <div className='flex  justify-between gap-40 flex-col md:flex-row px-20'>
        <div className="md:flex-1 ">
          <div className="flex items-center mb-4  bg-oohpoint-primary-3  rounded-xl shadow p-2 max-w-96">
            <i> <FaAward className="text-2xl text-yellow-200" /></i>
            <p className="ml-2 text-sm sm:text-base text-white">An Innovative OOH Advertising Company </p>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-4 text-white">
            Maximize Engagement at Your Next Big Event!
          </h1>
          <p className=" mb-8 text-sm sm:text-base text-white">
            At Oohpoint, we are passionate about partnering with events of all types—college fests, corporate gatherings, competitions, and more. <span id="readMore" onClick={() => { document.getElementById('moreText').style.display = 'inline'; document.getElementById('readMore').style.display = 'none'; }} style={{ color: '#341266', cursor: 'pointer' }}>read more...</span><span id="moreText" style={{ display: 'none' }}> Whether it's a small or large event, we can provide the perfect sponsorship to ensure your attendees get the most out of your occasion.</span>
          </p>
          <div>
            <button className='text-white rounded p-3 bg-oohpoint-primary-3'>Apply for Schlorship</button>
          </div>
         
          <div className='flex md:gap-20 mt-8 w-full'>
            <div className='flex items-center gap-3'>
              <div><FaGlobe className="text-4xl text-blue-600" /></div>
              <div>
                <h1 className='text-sm md:text-lg font-bold text-white'>24/7 Support</h1>
                <p className='text-white'>We are always here to help</p>
          
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <div><FaAward className="text-4xl text-blue-600" /></div>
              <div>
               <h1 className='text-sm md:text-lg font-bold text-white'>Award Winning Agency</h1>
               <p className='text-white'>Your are in safe hand</p>

              </div>
            </div>
          </div>
        </div>
         <div>
          <img src="/sponser.png" alt="" className='md:max-w-md max-w-sm' />
         </div>
        </div>
        

       
      </main>
      <div className="flex flex-wrap justify-between items-center py-4 px-4  gap-4">
 
 
</div>



    </div>
  );
}
