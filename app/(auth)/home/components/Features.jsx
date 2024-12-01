"use client";
import React, { useState } from "react";
import Steps from "./FrontPage";

const FeaturesSection = () => {
  // Individual states for each tab
  const [isActiveAnalytics, setIsActiveAnalytics] = useState(true);
  const [isActiveCollaboration, setIsActiveCollaboration] = useState(false);
  const [isActiveAutomation, setIsActiveAutomation] = useState(false);
  const [isActiveScalability, setIsActiveScalability] = useState(false);

  // Function to handle active states
  const handleTabClick = (tab) => {
    setIsActiveAnalytics(tab === "Analytics");
    setIsActiveCollaboration(tab === "Collaboration");
    setIsActiveAutomation(tab === "Automation");
    setIsActiveScalability(tab === "Scalability");
  };

  return (
    <div className="text-center theme text-white py-8">
      {/* Heading Section */}
      <h1 className="text-5xl font-semibold mb-6  text-center ">
        Powerful SaaS features for your agency
      </h1>

      {/* Toggle Buttons */}
      <div className="flex  md:flex-row justify-center gap-4 mb-6 flex-wrap">
        {/* Analytics Button */}
        <button
          className={`px-2 py-2 text-xs md:text-sm  rounded-lg font-medium transition  ${
            isActiveAnalytics
              ? "bg-green-500 text-black"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
          onClick={() => handleTabClick("Analytics")}
        >
          Analytics
        </button>

        {/* Collaboration Button */}
        <button
          className={`px-2 py-2 text-xs md:text-sm  rounded-lg font-medium transition ${
            isActiveCollaboration
              ? "bg-green-500 text-black"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
          onClick={() => handleTabClick("Collaboration")}
        >
          Collaboration
        </button>

        {/* Automation Button */}
        <button
          className={`px-2 py-2 text-xs md:text-sm  rounded-lg font-medium transition ${
            isActiveAutomation
              ? "bg-green-500 text-black"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
          onClick={() => handleTabClick("Automation")}
        >
          Automation{" "}
          <span className="text-red-500 text-xs ml-2 hidden md:block">(Coming soon)</span>
        </button>

        {/* Scalability Button */}
        <button
          className={`px-2 py-2 text-xs md:text-sm rounded-lg font-medium transition ${
            isActiveScalability
              ? "bg-green-500 text-black"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
          onClick={() => handleTabClick("Scalability")}
        >
          Scalability
        </button>
      </div>

      {/* Content Section */}
      <div className="">
        {isActiveAnalytics && (
<Steps />
)}
        {isActiveCollaboration && (
          <p>Tools to improve teamwork and client communication.</p>
        )}
        {isActiveAutomation && (
          <p>Automate repetitive tasks to save time and boost efficiency.</p>
        )}
        {isActiveScalability && (
          <p>Easily scale your agency with powerful tools.</p>
        )}
      </div>
    </div>
  );
};

export default FeaturesSection;
