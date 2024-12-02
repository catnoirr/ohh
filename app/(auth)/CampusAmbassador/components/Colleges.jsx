"use client";
import React from 'react';

const CampusAmbassador = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center text-center mb-8 py-10 md:px-14">
        <div className="flex flex-col items-center border border-[#341266]">
          <div className=" py-2 px-1 rounded-md">
            <img src="/1.png" alt="College Icon" className="w-10 h-10 mb-2" />
          </div>
          <p className="font-bold">1000+<br />Colleges</p>
        </div>
        <div className="flex flex-col items-center border border-[#341266]">
          <div className=" py-2 px-1 rounded-md">
            <img src="/2.png" alt="Student Icon" className="w-10 h-10 mb-2" />
          </div>
          <p className="font-bold">500+<br />Student market</p>
        </div>
        <div className="flex flex-col items-center border border-[#341266]">
          <div className=" py-2 px-1 rounded-md">
            <img src="/3.png" alt="Cities Icon" className="w-10 h-10 mb-2" />
          </div>
          <p className="font-bold">500+<br />Cities</p>
        </div>
        <div className="flex flex-col items-center border border-[#341266]">
          <div className=" py-2 px-14 rounded-md">
            <img src="/1.png" alt="College Icon" className="w-10 h-10 mb-2" />
          </div>
          <p className="font-bold">1000+<br />Colleges</p>
        </div>
        <div className="flex flex-col items-center border border-[#341266]">
          <div className=" py-2 px-1 rounded-md">
            <img src="/2.png" alt="Student Icon" className="w-10 h-10 mb-2" />
          </div>
          <p className="font-bold">500+<br />Student market</p>
        </div>
        <div className="flex flex-col items-center border border-[#341266]">
          <div className="py-2 px-1 rounded-md">
            <img src="/2.png" alt="Student Icon" className="w-10 h-10 mb-2" />
          </div>
          <p className="font-bold">500+<br />Cities</p>
        </div>
      </div>
      <p className="md:px-14 text-[#4F3A6F]">
        Welcome to the Oohpoint Campus Ambassador Program where you can be part of a network of changemakers
        representing the future of innovative advertising! <span id="dots">...</span><span id="more" style={{ display: "none" }}>As an ambassador, you'll bring unique ad experiences to your campus,
        connecting your peers with exclusive deals, while helping to shape Oohpoint's impact.</span>
        <button onClick={() => {
          const dots = document.getElementById("dots");
          const moreText = document.getElementById("more");
          const readMoreButton = document.querySelector('.text-oohpoint-primary-3');
          if (dots.style.display === "none") {
            dots.style.display = "inline";
            moreText.style.display = "none";
            readMoreButton.style.display = "inline";
          } else {
            dots.style.display = "none";
            moreText.style.display = "inline";
            readMoreButton.style.display = "none";
          }
        }} className='text-oohpoint-primary-3'>Read more</button>
        
      </p>
    </div>
  );
};

export default CampusAmbassador;
