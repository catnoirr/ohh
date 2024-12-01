"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
// import { FaAward } from "react-icons/fa";
export default function Home() {
  const router = useRouter();
  return (
    <div className="md:px-8 grad  ">
      <div className="flex flex-col  md:flex-row justify-between items-center gap-16 sm:gap-20 p-6 md:py-20 ">
        <div className="md:flex-1">
         
          <h1 className="text-5xl sm:text-5xl font-semibold  py-4 text-white">
          Scan, Engage, and Get Rewarded!          </h1>
          <p className="text-white mb-4 text-md  ">
          At Oohpoint, we are passionate about partnering with events of all types—college fests, corporate gatherings, competitions, and more. Whether it's a small or large event, we sponsorshipto ensure your attendees get the most out of your occasion.

          </p>
          <div >
            
            <button className='  p-4 rounded-xl bg-[#341266] text-white' onClick={() => router.push('/sign-up')}>Get Started</button>
            
            </div>

         
         
        </div>
        

        <div className="flex justify-center items-center md:flex-1  md:w-auto">
          <img src="/advertise-hero.png" alt="" />
        
        </div>
      </div>
  



    </div>
  );
}
