import React from 'react';

const EventEngagementBanner = () => {
  return (
    <div className=" text-white  text-center  flex items-center justify-center">
      <div className='py-12 px-4'>
        <h1 className="text-3xl font-bold mb-4">
          Maximize Engagement at Your Next Big Event!
        </h1>
        <p className="text-lg mb-6 ">
          Explore our focused communities designed to cater to different professional needs
        </p>
        <div className="flex justify-center space-x-4  items-center flex-wrap gap-3">
          <button className="bg-white text-black px-6 py-4 rounded-md font-medium hover:bg-gray-100 transition">
            Apply for sponsorship
          </button>
          <button className=" text-white px-6 py-4 border border-gray-400 rounded-md font-medium hover:bg-purple-700 transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventEngagementBanner;
