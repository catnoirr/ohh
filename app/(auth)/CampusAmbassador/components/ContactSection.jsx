import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactSection = () => {
  return (
    <div className="flex justify-center  px-4 md:px-20 py-8 ">
      <div className="bg-purtle-700 text-white  md:pl-32  flex  md:flex-row items-center justify-between w-full  space-y-8 md:space-y-0 md:space-x-8  mission rounded-3xl relative top-14">
        
        {/* Left section - Heading and input box */}
        <div className="flex-1 max-w-md text-center md:text-left p-10 md:p-0">
          <h2 className="text-xl md:text-3xl font-base   mb-4">Are you Looking for Sponsership</h2>
          <div className="flex flex-col md:flex-row items-center  overflow-hidden  p-2">
           
            <button className="bg-oohpoint-primary-3 text-white px-6 py-3  w-full md:w-auto mt-2 md:mt-0 rounded-md">
              Apply Now
            </button>
          </div>
        </div>

        {/* Right section - Contact info */}
        <div className="text-gray-300  text-center md:text-left">
         <img src="/net.png" alt="" className='max-w-xs hidden md:block'/>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
