import React from 'react';
import { FaAward } from "react-icons/fa";


const Hero = () => {
  return (
    <section className="flex flex-col md:flex-row  items-center justify-between bg-white py-6 px-6">
      {/* Left Side - Images and Statistics */}
      <div className="flex gap-4">
        {/* Image 1 */}
        <div className="relative">
          <img src="/circle1.png" alt="Workplace" className="w-full" />
          <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-3 bg-[#B77DC4] text-white rounded-3xl">Get Sponsership</button>
        </div>
        
        {/* Statistics Boxes */}
        <div className='flex flex-col gap-4 '>

        
      </div>
      </div>

      {/* Right Side - Content */}
      <div className="mt-8 md:mt-0 md:ml-16 space-y-10">
      <div className="flex items-center mb-4  bg-[#9267D16B]   rounded-xl shadow p-2 w-64 sm:w-72">
            <i> <FaAward className="text-4xl text-red-800" /></i>
            <p className="ml-2 text-sm sm:text-base">Your Gateway to success</p>
          </div>
          
                  <h2 className="text-3xl font-bold text-gray-900 mt-2">Why Partner with Oohpoint?</h2>
        <p className="text-gray-700 mt-4">
          Gain valuable insights into your digital campaigns with our comprehensive data analytics and reporting feature.
        </p>
        <ul className="mt-4 space-y-2">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Tailored Sponsorship Packages
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Maximized Footfall Engagement
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Diverse Event Types
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Boost Event Buzz
          </li>
        </ul>
        <button className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-purple-900">
          Get Sponsership
        </button>
      </div>
    </section>
  );
};

export default Hero;
