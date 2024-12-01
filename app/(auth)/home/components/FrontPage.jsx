import React from 'react';
import Image from 'next/image';
import { FaCheck } from 'react-icons/fa';
// import { FaAward } from "react-icons/fa";
// import Typewriter from "./typewriter";
export default function Home() {
  return (
    <div className="md:px-8 ">
      
      

      <main className="flex flex-col  md:flex-row justify-between items-center gap-16 sm:gap-20 p-6 mt-6 ">
        <div className="md:flex-1">
          <div className="flex items-center mb-4  bg-black rounded shadow p-2 w-28 sm:w-28 ">
            {/* <i> <FaAward className="text-4xl text-red-800" /></i> */}
            <p className="ml-2 text-sm sm:text-base text-white">Analytics</p>
          </div>
          <h1 className="text-5xl sm:text-5xl font-semibold  py-1 text-start">
            Comprehensive data analytics and reporting
          </h1>
          <p className="text-black text-lg  py-4 text-start">
          Gain valuable insights into your digital campaigns with our comprehensive data analytics and reporting.
          </p>

          <div className="flex flex-col " >
            <div className='flex items-center gap-2'>
               <div><FaCheck className=' bg-green-900 rounded-full p-1'/></div>
               <div>Actionable Recomandation</div>
            
            </div>
            <div className='flex items-center gap-2'><FaCheck  className=' bg-green-900 rounded-full p-1'/>
            Cross-channel analysis
            </div>
            <div className='flex items-center gap-2'><FaCheck  className=' bg-green-900 rounded-full p-1'/>
            User friendly interface
            </div>
          </div>
         
        </div>
        

        <div className="flex justify-center items-center md:flex-1  md:w-auto">
          <div className="relative max-w-md w-full">
            {/* Dots decoration behind the main image */}
            

            {/* Main Image */}
            <Image
              src="/hero-img.jpg" // Replace with actual path
              width={600}
              height={400}
              alt="Laptop and plant on table"
              className="rounded-lg w-full relative z-10"
            />

            {/* Top Card - Meeting With */}
            <div className="absolute -top-5 -right-4 sm:-right-8  bg-white text-black p-6 rounded-lg shadow-lg flex  space-x-2 z-20 flex-col gap-2 border">
              
              <div>
                ⭐ trustpilot
              </div>
              <div className="flex items-center">
                  <img
                    src="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2023.0.0,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20width='200px'%20height='37.5px'%20viewBox='0%200%20200%2037.5'%20style='enable-background:new%200%200%20200%2037.5;'%20xml:space='preserve'%3e%3cstyle%20type='text/css'%3e%20.st0{fill:%2300B67A;}%20.st1{fill:%23FFFFFF;}%20%3c/style%3e%3cg%3e%3cg%3e%3cpath%20class='st0'%20d='M0,0h37.5v37.5H0V0z%20M40.6,0h37.5v37.5H40.6V0z%20M81.3,0h37.5v37.5H81.3V0z%20M121.9,0h37.5v37.5h-37.5V0z%20M162.5,0H200v37.5h-37.5V0z'/%3e%3c/g%3e%3cpath%20class='st1'%20d='M18.8,25.3l5.7-1.4l2.4,7.3L18.8,25.3z%20M31.9,15.8h-10l-3.1-9.5l-3.1,9.5h-10l8.1,5.9l-3.1,9.5l8.1-5.9l5-3.6%20L31.9,15.8z%20M59.4,25.3l5.7-1.4l2.4,7.3L59.4,25.3z%20M72.5,15.8h-10l-3.1-9.5l-3.1,9.5h-10l8.1,5.9l-3.1,9.5l8.1-5.9l5-3.6%20L72.5,15.8z%20M100,25.3l5.7-1.4l2.4,7.3L100,25.3z%20M113.1,15.8h-10L100,6.3l-3.1,9.5h-10l8.1,5.9l-3.1,9.5l8.1-5.9l5-3.6L113.1,15.8%20z%20M140.6,25.3l5.7-1.4l2.4,7.3L140.6,25.3z%20M153.8,15.8h-10l-3.1-9.5l-3.1,9.5h-10l8.1,5.9l-3.1,9.5l8.1-5.9l5-3.6L153.8,15.8z%20M181.3,25.3l5.7-1.4l2.4,7.3L181.3,25.3z%20M194.4,15.8h-10l-3.1-9.5l-3.1,9.5h-10l8.1,5.9l-3.1,9.5l8.1-5.9l5-3.6L194.4,15.8z'/%3e%3c/g%3e%3c/svg%3e"
                    className="h-30px"
                    alt="rating-img"
                  />
                  <h6 className="font-semibold ml-2">4.8/5.0</h6>
                </div>
                  <div>
                    Reviewed by 365+ users
                  </div>
            </div>

            {/* Bottom Card - Customer Satisfaction */}
            <div className="absolute bottom-5 -left-3 sm:-left-28 bg-slate-900 text-white  rounded-lg shadow-lg w-60 sm:w-64 z-20 p-6">
              <p className="text-xs sm:text-lg font-semibold">Our Lovely Customers</p>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex -space-x-2">
                  <img
                    src="/user1.jpeg" // Replace with actual path
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-purple-800"
                    alt="Avatar 3"
                  />
                  <img
                    src="/user1.jpeg" // Replace with actual path
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-purple-800"
                    alt="Avatar 4"
                  />
                  <img
                    src="/user1.jpeg" // Replace with actual path
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-purple-800"
                    alt="Avatar 5"
                  />
                </div>
                <span className="text-xs sm:text-sm">5K+</span>
              </div>
              <p className="text-xs mt-2">Satisfaction Rate 80%</p>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="flex flex-wrap justify-between items-center py-4 px-4  gap-4">
  {/* Heading */}
  

  {/* Logos */}
 
</div>



    </div>
  );
}
