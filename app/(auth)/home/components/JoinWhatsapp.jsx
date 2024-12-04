import React from 'react';
import { IoLogoWhatsapp } from 'react-icons/io';

const SubscriptionSection = () => {
  return (
    <div className="mission text-white py-28 px-6 ">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">
          Don't miss out - millions have joined Mizzle!
        </h2>
        <p className="text-lg mb-6">
          Join the Mizzle revolution today and be part of the millions who've already embraced a brighter future!
        </p>
        <div className="flex md:flex-row items-center gap-8   py-4 max-w-[550px] bg-white justify-center rounded-md">
          <input
            type="email"
            placeholder="Your email address"
            className="md:w-64 w-40 px-4 py-2 rounded-l-md text-gray-900  "
          />
          <button className="bg-green-600 px-6 gap-1 flex items-center py-2 rounded-md hover:bg-green-500">
           
            <IoLogoWhatsapp/>
            Join 
          </button>
        </div>
      </div>
      {/* <div className="flex justify-center mt-8 space-x-8">
        <img src="greenish-logo-url" alt="Greenish" className="h-6" />
        <img src="sitemark-logo-url" alt="Sitemark" className="h-6" />
        <img src="logolipsum-url" alt="Logoipsum" className="h-6" />
        <img src="pinpoint-logo-url" alt="PinPoint" className="h-6" />
      </div> */}
    </div>
  );
};

export default SubscriptionSection;
