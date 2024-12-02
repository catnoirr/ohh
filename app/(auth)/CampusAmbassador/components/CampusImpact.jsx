"use client";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

const CampusImpact = () => {
  const [isMission, setIsMission] = useState(true);

  const toggleContent = () => setIsMission((prev) => !prev);

  return (
    <div className="flex flex-col items-center min-h-screen p-4 md:p-8 mission">
      {/* Main container with left and right content */}
      <div className="flex flex-col lg:flex-row items-start w-full max-w-7xl p-4 md:p-8 rounded-lg space-y-8 lg:space-y-0 lg:space-x-8">
        {/* Left content */}
        <div className="lg:w-1/2">
          {/* Mission/Vision card */}
          <div className="p-4 md:p-6">
            <button
              className={`${
                isMission ? "bg-blue-600 text-white" : "bg-white text-blue-600"
              } py-2 px-4 md:py-4 md:px-8 rounded-xl mb-4 ml-8 hover:bg-purtle-500`}
              onClick={() => setIsMission(true)}
            >
              Our Mission
            </button>
            <button
              className={`${
                !isMission ? "bg-blue-600 text-white" : "bg-white text-blue-600"
              } py-2 px-4 md:py-4 md:px-8 rounded-xl mb-4 ml-8 hover:bg-purtle-500`}
              onClick={() => setIsMission(false)}
            >
              Our Vision
            </button>

            {/* Conditional Content */}
            {isMission ? (
              <div>
                <p className="text-white mb-4 text-sm md:text-base">
                  Build a community of student ambassadors who bring Oohpoint's
                  interactive advertising to life on campuses, creating real
                  opportunities for growth, networking, and innovation.
                </p>
                
              </div>
            ) : (
              <p className="text-white mb-4 text-sm md:text-base">
                Our vision is to revolutionize campus advertising by fostering
                creativity and collaboration among students, shaping a brighter
                future for brands and communities alike.
              </p>
            )}
 <ul className="space-y-2 mb-4">
                  <li className="flex items-center text-[#4F3A6F] font-bold">
                    <FaCheck className="text-white mr-2 bg-purtle-700 p-1 rounded-full" />{" "}
                    Tailored Sponsorship Packages
                  </li>
                  <li className="flex items-center text-purtle-500 font-bold">
                    <FaCheck className="text-white bg-purtle-700 mr-2 p-1 rounded-full" />{" "}
                    Maximized Footfall Engagement
                  </li>
                  <li className="flex items-center text-purtle-500 font-bold">
                    <FaCheck className="text-white bg-purtle-700 mr-2 p-1 rounded-full" />{" "}
                    Diverse Event Types
                  </li>
                  <li className="flex items-center text-purtle-500 font-bold">
                    <FaCheck className="text-white bg-purtle-700 mr-2 p-1 rounded-full" />{" "}
                    Boost Event Buzz
                  </li>
                </ul>
            <button className="bg-purtle-700 text-white py-2 px-4 md:py-4 md:px-8 rounded-xl hover:bg-purtle-500 ml-8">
              Apply Today
            </button>
            
          </div>
        </div>

        {/* Right content - Image with overlay */}
        <div className="lg:w-1/2 relative flex justify-center">
          <img
            src="mission.png" // replace with the actual path to your image
            alt="Laptop with notebook"
            className="w-full h-auto md:w-[500px] lg:w-[666px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default CampusImpact;
