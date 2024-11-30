"use client";
import React from "react";
import { FaArrowLeft } from "react-icons/fa"; // Make sure you have react-icons installed

const Top = () => {
  return (
    <div className="flex w-full mb-4 bg-oohpoint-primary-3 h-[60px] items-center relative">
      {/* Back Arrow */}
      <div
        className="absolute pl-8 cursor-pointer"
        onClick={() => window.history.back()}
      >
        <FaArrowLeft className="text-white" />
      </div>
      
      {/* Dashboard Title */}
      <div className="w-full flex justify-center items-center text-white text-lg font-semibold">
        <div className="w-full text-center">
          Dashboard
        </div>
      </div>
    </div>
  );
};

export default Top;
