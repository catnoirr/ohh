"use client";
import React from 'react';
import { FaCheck } from 'react-icons/fa';
import  { useState } from "react";



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

  return (
    
    <div className="flex flex-col items-center md:pl-8 theme md:p-40 p-6">



      <div className="  p-6 rounded-lg w-full  ">
        <h1 className="md:text-4xl text-3xl font-bold text-white mb-4">
          Making Out-of-Home Advertising Engaging, Measurable, and Rewarding
        </h1>
        <p className="md:text-lg text-md text-white mb-6">
          Oohpoint is an innovative out-of-home (OOH) advertising start-up.  
          <span id="dots">... </span><span id="more" style={{ display: "none" }}>
            targeted, impactful ad campaigns that reach audiences in real-world settings, from local vendor shops to high-traffic areas. We provide a seamless way for users to engage with brand advertisements while enjoying rewards and discounts.
          </span>
          <button onClick={() => {
            const dots = document.getElementById("dots");
            const moreText = document.getElementById("more");
            const readMoreButton = document.querySelector('.text-oohpoint-primary-3');
            if (dots.style.display === "none") {
              dots.style.display = "inline";
              moreText.style.display = "none";
              readMoreButton.style.display = "inline";
            } else {
              dots.style.display = "none";
              moreText.style.display = "inline";
              readMoreButton.style.display = "none";
            }
          }} className='text-oohpoint-primary-3'>Read more</button>
        </p>
        <div className="flex  sm:flex-row md:justify-start justify-between gap-4">
          <button className="bg-[#341266] text-white md:py-4 md:px-6 px-3 py-3 rounded-lg shadow-md hover:bg-purple-900" >
            Advertise Now
          </button>
          <button className="border border-purtle-200 text-white md:py-2 md:px-6 px-3 py-3 rounded-lg shadow-md" onClick={handleButtonClick}>
            Watch a Demo
          </button>
                {/* Video popup modal */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-100 flex justify-center items-center z-50">
          <div className="rounded-lg  bg-white p-4 relative flex justify-center">
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
             
              src="/default.mp4"
              className="max-w-md max-h-[500px] rounded-lg video"
              controls
              autoPlay
            />
          </div>
        </div>
      )}
        </div>
        <div className="flex justify-start gap-2 mt-4 md:text-sm text-xs text-white">
          <div className='flex items-center gap-2'><FaCheck className='bg-blue-600 text-white p-1 rounded-full'/> Boost Event Buzz</div>
          <div className='flex items-center gap-2'><FaCheck className='bg-blue-600 text-white p-1 rounded-full'/>  Boost Event Buzz</div>
          <div className='flex items-center gap-2'><FaCheck className='bg-blue-600 text-white p-1 rounded-full'/> Boost Event Buzz</div>
        </div>
      </div>
      
      {/* <div className=" top-2 right-2 flex gap-2">
        <button className="bg-purple-100 text-purple-700 py-1 px-3 rounded-md shadow">Site Status</button>
        <button className="bg-purple-100 text-purple-700 py-1 px-3 rounded-md shadow">Site Vendors</button>
        <button className="bg-purple-100 text-purple-700 py-1 px-3 rounded-md shadow">Site Auction</button>
      </div> */}
    </div>
  );
};

export default AdvertisingBanner;
