import React from 'react';

function EventEngagement() {
  return (
    <div className="flex flex-col items-center justify-center  bg-white text-center p-6">
      <h1 className="text-5xl font-bold mb-4">
        Maximize Engagement <br /> at Your Next Big Event!
      </h1>
      <p className="text-lg mb-8">
        Explore our focused communities designed to cater to different professional needs
      </p>
      <div className="flex space-x-4 mb-8">
        <button className="bg-oohpoint-primary-3 text-white py-2 px-4 rounded">
          Apply for Schlorship
        </button>
        <button className=" text-black py-2 px-4 border rounded">
          Learn More
        </button>
      </div>
    
    </div>
  );
}

export default EventEngagement;
