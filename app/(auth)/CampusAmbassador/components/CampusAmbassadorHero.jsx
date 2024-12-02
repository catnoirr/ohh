import React from 'react';
import Stats from "./Stats"

const CampusAmbassadorProgram = () => {
  return (
    <div className="flex flex-col items-center  p-4 md:p-10 theme md:py-20  ">
      {/* Main container with left and right content */}
      <div className="flex flex-col lg:flex-row items-center w-full  gap-20 space-y-8 lg:space-y-0 lg:space-x-8">
        
        {/* Left content */}
        <div className="lg:w-[70%]  lg:text-left lg:pr-8 px-4">
          <h1 className="text-4xl sm:text-4xl lg:text-6xl font-semibold text-white mb-4 pb-4">
          Maximize Engagement at Your Next Big Event!          </h1>
          <p className="text-white mb-6 pb-4 text-base sm:text-md">
          Explore our focused communities designed to cater to diverse professional needs, offering tailored resources, networking opportunities, and expert insights to help you thrive in your career.        </p>
          <div className='flex gap-5'>
          <button className="bg-oohpoint-primary-3 text-white py-2 px-4 sm:py-3 sm:px-6 rounded  hover:bg-purple-900 text-xs sm:text-sm">
            Apply for Campus Ambassador
          </button>
          <button className=" text-white border py-2 px-4 sm:py-3 sm:px-6 rounded hover:border hover:border-blue-600 text-xs sm:text-sm ">
            Learn More
          </button>
          </div>
        </div>
        
        {/* Right content (Image) */}
        <div className=" flex items-center  justify-end ">
        
          <img
            src="campusimage-1.png" // replace with the actual path to the illustration image
            alt="Illustration"
            className="w-full max-w-md ax-auto  object-contain"
          />
        </div>
      </div>
      
      
      {/* Bottom content */}
      
    </div>
  );
};

export default CampusAmbassadorProgram;
