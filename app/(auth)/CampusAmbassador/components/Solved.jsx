"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const Testimonials = () => {
  const testimonials = [
    { name: "Rahul, Final Year BMS", feedback: "Oohpoint really made a huge difference for our college fest! They not only sponsored the event but also brought some super cool campaigns that got everyone excited. The interactive QR code rewards were a hit, and students loved getting discounts from local vendors. Huge thanks for helping us make the fest unforgettable!", rating: 5 },
    { name: "Sneha, Cultural Secretary", feedback: "Oohpoint's sponsorship was a game-changer for our event! They not only helped us financially but also brought innovative ways to engage with students through their advertising platform. The interactive ads kept everyone hooked, and the QR code rewards added an extra layer of excitement. Can’t wait to work with them again next year!", rating: 5 },
    { name: "Aarav, Event Organizer", feedback: "Oohpoint's sponsorship was a game-changer for our event! They not only helped us financially but also brought innovative ways to engage with students through their advertising platform. The interactive ads kept everyone hooked, and the QR code rewards added an extra layer of excitement. Can’t wait to work with them again next year!", rating: 5 },
    { name: "Nisha, Marketing Head", feedback: "Oohpoint really made a huge difference for our college fest! They not only sponsored the event but also brought some super cool campaigns that got everyone excited. The interactive QR code rewards were a hit, and students loved getting discounts from local vendors. Huge thanks for helping us make the fest unforgettable!", rating: 5 },
    { name: "Kabir, Business Analyst", feedback: "Oohpoint's sponsorship was a game-changer for our event! They not only helped us financially but also brought innovative ways to engage with students through their advertising platform. The interactive ads kept everyone hooked, and the QR code rewards added an extra layer of excitement. Can’t wait to work with them again next year!", rating: 5 },
    { name: "Isha, Project Manager", feedback: "Oohpoint's sponsorship was a game-changer for our event! They not only helped us financially but also brought innovative ways to engage with students through their advertising platform. The interactive ads kept everyone hooked, and the QR code rewards added an extra layer of excitement. Can’t wait to work with them again next year!", rating: 5 },
    { name: "Nisha, Marketing Head",feedback: "Oohpoint's sponsorship was a game-changer for our event! They not only helped us financially but also brought innovative ways to engage with students through their advertising platform. The interactive ads kept everyone hooked, and the QR code rewards added an extra layer of excitement. Can’t wait to work with them again next year!", rating: 5 },
    { name: "Kabir, Business Analyst", feedback: "Oohpoint's sponsorship was a game-changer for our event! They not only helped us financially but also brought innovative ways to engage with students through their advertising platform. The interactive ads kept everyone hooked, and the QR code rewards added an extra layer of excitement. Can’t wait to work with them again next year!", rating: 5 },
    { name: "Isha, Project Manager", feedback: "Oohpoint's sponsorship was a game-changer for our event! They not only helped us financially but also brought innovative ways to engage with students through their advertising platform. The interactive ads kept everyone hooked, and the QR code rewards added an extra layer of excitement. Can’t wait to work with them again next year!", rating: 5 },
  ];

  // Group testimonials into slides of 3
  const slides = [];
  for (let i = 0; i < testimonials.length; i += 3) {
    slides.push(testimonials.slice(i, i + 3));
  }

  return (
    <div className="mission to-purple-500 text-white py-10 px-5 ml-6 mr-6 rounded-xl">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold">Hear What Our Customers Have to Say</h2>
        <p className="text-xl mt-2">More than 1500+ agencies using Ooh Point</p>
      </div>

      <Swiper
        modules={[  Autoplay,Pagination]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        spaceBetween={30}
        slidesPerView={1}
        className="mt-8"
      >
        {slides.map((group, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-around py-10 flex-col md:flex-row items-center gap-10 ">
              {group.map((testimonial, idx) => (
                <div
                  key={idx}
                  className="bg-white text-black rounded-lg p-5 shadow-lg max-w-sm"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    {"★".repeat(testimonial.rating).split("").map((star, i) => (
                      <span key={i} className="text-yellow-500">{star}</span>
                    ))}
                  </div>
                  <p className="text-sm">{testimonial.feedback}</p>
                  <h3 className="mt-4 text-base font-semibold">{testimonial.name}</h3>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
