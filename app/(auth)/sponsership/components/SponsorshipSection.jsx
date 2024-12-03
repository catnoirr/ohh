import React from 'react';
import { FaUserGraduate, FaChessRook, FaBullseye, FaUsers, FaTheaterMasks } from 'react-icons/fa';
import Features from "../../about/components/Featured"


const SponsorshipSection = () => {
  return (
    <section className="mission py-12 px-6 ml-6 mr-6 rounded-lg">
      <div className=" text-center">
         <div className='flex gap-20 flex-col md:flex-row'> 
        
          
        

        {/* <div className="grid md:grid-cols-2 gap-8"> */}
          {/* Left Side - Sponsorship Image */}
          <div className="flex justify-center items-center ">
            <img src="spondershipgraph.png" alt="Sponsorship" className="rounded-lg shadow-md object-cover h-full w-full " />
          </div>
         

         

          {/* Right Side - Sponsorship Details */}
          <div className='w-full p-3 justify-center flex  '>
          <div className="space-y-6 text-left text-white ">
          <h2 className="text-3xl font-bold text-white mb-6">We are Sponsoring</h2>

            {/* College Fest */}
            <div className="flex items-start space-x-4">
              <div className="bg-purtle-700 p-3 rounded-xl">
                <FaUserGraduate className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white ">College Fest</h3>
                <p className="text-white">Treat others with kindness, empathy, and understanding.</p>
              </div>
            </div>

            {/* Product Launch Events */}
            <div className="flex items-start space-x-4">
              <div className="bg-purtle-700 p-3 rounded-xl">
                <FaChessRook className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Product Launch Events</h3>
                <p className="text-white">Welcome and embrace diversity in all its forms.</p>
              </div>
            </div>

            {/* B2B Conferences */}
            <div className="flex items-start space-x-4">
              <div className="bg-purtle-700 p-3 rounded-xl">
                <FaBullseye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">B2B Conferences</h3>
                <p className="text-white">Share knowledge, experiences, and feedback freely.</p>
              </div>
            </div>

            {/* Corporate Gatherings */}
            <div className="flex items-start space-x-4">
              <div className="bg-purtle-700 p-3 rounded-xl">
                <FaUsers className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Corporate Gatherings</h3>
                <p className="text-white">Work together to support each other's growth.</p>
              </div>
            </div>

            {/* Cultural Events */}
            <div className="flex items-start space-x-4">
              <div className="bg-purtle-700 p-3 rounded-xl">
                <FaTheaterMasks className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Cultural Events And More</h3>
                <p className="text-white">Conduct yourself with integrity and honesty.</p>
              </div>
            </div>

          </div>
          </div>
          {/* </div> */}

        </div>
      </div>
      <Features/>
    </section>
  );
};

export default SponsorshipSection;
