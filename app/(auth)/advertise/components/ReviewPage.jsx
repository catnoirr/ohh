"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Testimonials = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center mission text-white md:py-16">
      
      <div className="flex flex-col lg:flex-row items-center w-full max-w-7xl md:p-16 p-6  gap-14">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          className="w-full"
        >
          <SwiperSlide>
            <div className="flex gap-4 justify-around items-center py-12 ">
            <div className="  rounded-lg overflow-hidden shadow-lg aspect-w-16">
              <video
                src="default.mp4" // Replace with the actual path to your video
                controls
                className=" object-cover h-[450px]"
              ></video>
            </div>
            <div className=" rounded-lg overflow-hidden shadow-lg aspect-w-16 hidden md:block">
              <video
                src="default.mp4" // Replace with the actual path to your video
                controls
                className=" object-cover h-[450px]"
              ></video>
            </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex gap-4 justify-around py-12 items-center">
            <div className="  rounded-lg overflow-hidden shadow-lg aspect-w-16">
              <video
                src="default.mp4" // Replace with the actual path to your video
                controls
                className=" object-cover h-[450px]"
              ></video>
            </div>
            <div className=" rounded-lg overflow-hidden shadow-lg aspect-w-16 hidden md:block">
              <video
                src="default.mp4" // Replace with the actual path to your video
                controls
                className=" object-cover h-[450px]"
              ></video>
            </div>
            </div>
          </SwiperSlide>
        </Swiper>


        <div className="w-full lg:w-1/2 ">
          <h2 className="text-3xl font-bold mb-4">Hear What Our Customers Have to Say</h2>
          <p className="text-lg mb-8">More than 1500+ agencies using Ooh Point</p>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            className="w-full"
          >
            <SwiperSlide>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10">
                <div className="flex flex-col items-start bg-white text-black p-8 rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, index) => (
                      <span key={index} className="text-yellow-400 text-xl">&#9733;</span>
                    ))}
                  </div>
                  <p className="text-sm mb-4">
                    OohPoint really made a huge difference for our college fest! They not only sponsored the event but also brought on super cool campaigns that got everyone excited. The interactive ad placements were a hit.
                  </p>
                  <h4 className="font-bold">Rahul, Final Year BMS</h4>
                </div>
                <div className="flex flex-col items-start bg-white text-black p-8 rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, index) => (
                      <span key={index} className="text-yellow-400 text-xl">&#9733;</span>
                    ))}
                  </div>
                  <p className="text-sm mb-4">
                    Corporate sponsorship was a game-changer for our team! The ads not only helped us financially but also brought innovative ways to engage with students through their advertising platform.
                  </p>
                  <h4 className="font-bold">Sneha, Cultural Secretary</h4>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-start bg-white text-black p-8 rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, index) => (
                      <span key={index} className="text-yellow-400 text-xl">&#9733;</span>
                    ))}
                  </div>
                  <p className="text-sm mb-4">
                    OohPoint really made a huge difference for our college fest! They not only sponsored the event but also brought on super cool campaigns that got everyone excited. The interactive ad placements were a hit.
                  </p>
                  <h4 className="font-bold">Rahul, Final Year BMS</h4>
                </div>
                <div className="flex flex-col items-start bg-white text-black p-8 rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, index) => (
                      <span key={index} className="text-yellow-400 text-xl">&#9733;</span>
                    ))}
                  </div>
                  <p className="text-sm mb-4">
                    Corporate sponsorship was a game-changer for our team! The ads not only helped us financially but also brought innovative ways to engage with students through their advertising platform.
                  </p>
                  <h4 className="font-bold">Sneha, Cultural Secretary</h4>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

