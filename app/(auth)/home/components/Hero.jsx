"use client";
import React from 'react';
import { FaCheck } from 'react-icons/fa';
import  { useRouter } from 'next/navigation';


const AdvertisingBanner = () => {
  const router = useRouter();
  return (
    
    <div className="flex flex-col  p-4  theme ">


       <div className='flex justify-between md:flex-row flex-col md:py-16 py-6  ' >
      <div className=" md:p-16  rounded-lg md:w-8/12 custome ">
        <h1 className="md:text-5xl text-5xl font-bold text-white mb-4">
        Scan, Engage, and Get Rewarded!       </h1>
        <p className="md:text-lg text-md text-white mb-6">
        At Oohpoint, we are passionate about partnering with events of all types—college fests, corporate gatherings, competitions, and more. Whether it's a small or large event, we sponsorshipto ensure your attendees get the most out of your occasion.
        </p>
        <div className="flex  sm:flex-row md:justify-start  gap-4">
          <button className="bg-oohpoint-primary-3 text-white md:py-4 md:px-6 px-3 py-3 rounded-lg shadow-md " onClick={() => router.push('/sign-up')}>
            Get Started
          </button>
          <button className="border text-white md:py-2 md:px-6 px-3 py-3 rounded-lg ">
            Hows it works
          </button>
        </div>
        <div className="flex justify-start gap-2 mt-4 md:text-sm text-xs text-white">
          <div className='flex items-center gap-2'><FaCheck className='bg-green-800 text-white p-1 rounded-full'/> Boost Event Buzz</div>
          <div className='flex items-center gap-2'><FaCheck className='bg-green-800 text-white p-1 rounded-full'/>  Boost Event Buzz</div>
          <div className='flex items-center gap-2'><FaCheck className='bg-green-800 text-white p-1 rounded-full'/> Boost Event Buzz</div>
        </div>
      </div>
      <div className=' flex justify-center items-center  p-5  '>
        <img src="/home-hero.png" alt="" />
      </div>
      </div>
      
     
    </div>
  );
};

export default AdvertisingBanner;
