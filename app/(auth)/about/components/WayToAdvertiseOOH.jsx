import React from 'react';
import { FaFileAlt, FaStar, FaBookmark } from 'react-icons/fa';


const StorySection = () => {
  return (
    <div className="flex flex-col md:flex-row  items-center p-8 py-20 theme gap-10">
    

      {/* Promotional Offer Section */}
      <div className="flex flex-col items-start lg:items-center max-w-2xl  mt-8 ">
        
 <div className="text-left ">
        <h1 className="text-5xl font-medium  mb-8 text-white">A New way to Advertise OOH</h1>
        <p className=" mb-8 text-white">
        Oohpoint offers a unique approach to offline advertising that addresses the limitations of traditional ads. We give brands
        </p>
      </div>
        {/* Guiding Principles */}
        <div className="w-full ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex  space-x-4">
            <div className="bg-blue-600 p-3 h-12 w-12 rounded-lg flex items-center justify-center">
                <FaFileAlt className="text-white text-xl sm:text-2xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Real-Time Analytics</h3>
                <p className=" text-sm text-gray-800"> Know exactly how your campaign is performing with real-time data and insights.</p>
              </div>
            </div>
            <div className="flex  space-x-4">
            <div className="bg-blue-600 p-3 h-12 w-12 rounded-lg flex items-center justify-center">
                <FaFileAlt className="text-white text-xl sm:text-2xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Engagement & Reward</h3>
                <p className=" text-sm text-gray-800">Make every interaction count by offering users discounts and incentives, creating more </p>
              </div>
            </div>
            <div className="flex  space-x-4">
            <div className="bg-purple-400 p-3 h-12 w-12 rounded-lg flex items-center justify-center">
                <FaStar className="text-white text-xl sm:text-2xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">User-Centricity</h3>
                <p className=" text-sm text-gray-800">We prioritize the experience of both the brands we serve and the consumers who engage with the ads.</p>
              </div>
            </div>
            <div className="flex  space-x-4">
            <div className="bg-purple-400 p-3 h-12 w-12 rounded-lg flex items-center justify-center">
                <FaBookmark className="text-white text-xl sm:text-2xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Collaboration</h3>
                <p className=" text-sm text-gray-800">Building strong partnerships with vendors, brands, and users to create a cohesive advertising ecosystem.</p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <div className="  flex flex-col justify-between mb-8  w-full  md:mt-20 theme">
          <img src="qrscanner.png" alt="advertising pic" />
        </div>
    </div>
  );
};

export default StorySection;
