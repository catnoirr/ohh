import React from 'react';
import { FaFileAlt, FaStar, FaBookmark } from 'react-icons/fa';
const StorySection = () => {
  return (
    <div className="flex flex-col  p-4 sm:p-8 bg-white">




      {/* Title and Description */}
      

      {/* Promotional Offer Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-20 pt-20 ">
        <div className="flex flex-col max-w-sm space-y-4 ">
        <h1 className='text-5xl'>Why Join the Oohpoint Community?.</h1>
        <p>As a member of the Oohpoint Community Hub, you’ll gain</p>
       <div>
       <button className='border p-3 px-4 bg-oohpoint-primary-3 text-white rounded-full '>
          Get Started with Ohohpoint
        </button>
       </div>
        </div>

        {/* Guiding Principles */}
        <div className="w-full  ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-12  ">
            {/* Innovation */}
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 p-3 h-12 w-12 rounded-lg flex items-center justify-center">
                <FaFileAlt className="text-white text-xl sm:text-2xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Innovation</h3>
                <p className="text-gray-600 text-sm">
                  Constantly evolving to bring the latest technology and solutions to our clients and users.
                </p>
              </div>
            </div>

            {/* Transparency */}
            <div className="flex items-start space-x-4 ">
              <div className="bg-blue-600 p-3 h-12 w-12 rounded-lg flex items-center justify-center">
                <FaFileAlt className="text-white text-xl sm:text-2xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Transparency</h3>
                <p className="text-gray-600 text-sm">
                  Providing real-time insights and measurable results to ensure brands know the impact of their campaigns.
                </p>
              </div>
            </div>

            {/* User-Centricity */}
            <div className="flex items-start space-x-4">
              <div className="bg-purple-400 p-3 h-12 w-12 rounded-lg flex items-center justify-center">
                <FaStar className="text-white text-xl sm:text-2xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">User-Centricity</h3>
                <p className="text-gray-600 text-sm">
                  We prioritize the experience of both the brands we serve and the consumers who engage with the ads.
                </p>
              </div>
            </div>

            {/* Collaboration */}
            <div className="flex items-start space-x-4">
              <div className="bg-purple-400 p-3 h-12 w-12 rounded-lg flex items-center justify-center">
                <FaBookmark className="text-white text-xl sm:text-2xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Collaboration</h3>
                <p className="text-gray-600 text-sm">
                  Building strong partnerships with vendors, brands, and users to create a cohesive advertising ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorySection;
