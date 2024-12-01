"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

function EventEngagement() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center  bg-white text-center p-6">
      <h1 className="text-5xl font-bold mb-4">
        Maximize Engagement <br /> at Your Next Big Event!
      </h1>
      <p className="text-lg mb-8">
        Explore our focused communities designed to cater to different professional needs
      </p>
      <div className="flex space-x-4 mb-8">
        <button 
          className="bg-black text-white py-4 px-4 rounded-lg" 
          onClick={() => router.push('/advertise')}
        >
          Advertise Now
        </button>
       
      </div>
    
    </div>
  );
}

export default EventEngagement;
