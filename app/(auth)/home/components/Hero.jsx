"use client";
import React from 'react';
import { FaCheck } from 'react-icons/fa';
import  { useRouter } from 'next/navigation';
import  { useState } from "react";
import { FaPlay } from 'react-icons/fa';
import VideoDialog from '../../components/VideoDialog';

const AdvertisingBanner = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleButtonClick = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    const videoElement = document.getElementById("popupVideo");
    if (videoElement) {
      videoElement.pause(); // Pause the video when closing
      videoElement.currentTime = 0; // Reset video to the start
    }
  };
  const router = useRouter();
  return (
    
    <div className="flex flex-col  p-4  theme " >


       <div className='flex justify-between md:flex-row flex-col md:py-16 py-6  ' >
      <div className=" md:p-16  rounded-lg md:w-8/12 custome ">
        <h1 className="md:text-5xl text-5xl font-bold text-white mb-4">
        Scan, Engage, and Get Rewarded!       </h1>
        <p className="md:text-lg text-md text-white mb-6">
        At Oohpoint, we are passionate about partnering with events of all types—college fests, corporate <span id="readMore" onClick={() => { document.getElementById('moreText').style.display = 'inline'; document.getElementById('readMore').style.display = 'none'; }} style={{color: '#341266', cursor: 'pointer'}}>read more...</span><span id="moreText" style={{display: 'none'}}> gatherings, competitions, and more. Whether it's a small or large event, we sponsorship to ensure your attendees get the most out of your occasion.</span>
        </p>
        <div className="flex  sm:flex-row md:justify-start  gap-4">
          <button className="bg-oohpoint-primary-3 text-white md:py-4 md:px-6 px-3 py-3 rounded-lg shadow-md " onClick={() => router.push('/sign-up')}>
            Get Started
          </button>
          <button className=" text-white md:py-2 md:px-6 px-3 py-3 rounded-lg flex items-center " onClick={handleButtonClick}>
            <FaPlay className="mr-2 border text-4xl p-2 rounded-full" />
            Hows it works
          </button>
           {/* Video popup modal */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-3xl p-4 relative">
            <button
              onClick={handleClosePopup}
              className="absolute -top-6 right-1 text-white hover:text-gray-800 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <video
              id="popupVideo"
              src="/video.mp4"
              className="w-full h-auto rounded-lg"
              controls
              autoPlay
            />
          </div>
        </div>
      )}
        </div>
        <div className="flex justify-start items-center gap-2 mt-4 md:text-sm text-xs text-white">
          <div className='flex items-center gap-2'>
            <img src="Googlelogo.png" alt="" />
          </div>
          <div className='flex items-center gap-2 text-4xl'> 4.6</div>
          <div className='flex items-center flex-col gap-2 pl-8'>
            <p>⭐⭐⭐⭐⭐</p>
            <p>(2.5k+ users reviews)</p>
          </div>
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
