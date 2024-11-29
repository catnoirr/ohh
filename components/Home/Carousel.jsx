"use client";

import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const slides = [
  {
    id: 1,
    src: '/carousel.png',
    alt: 'Pet Care supplies',
  },
  {
    id: 2,
    src: '/carousel.png',
    alt: 'Another banner',
  },
  {
    id: 3,
    src: '/carousel.png',
    alt: 'Yet another banner',
  },
];

const CarouselComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length); // Cycle through slides
  };

  useEffect(() => {
    const interval = setInterval(handleSlideChange, 2000); // Change slide every 2 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <Carousel className="relative w-full max-w-lg mx-auto mt-3">
      <CarouselContent className="flex transition-transform  duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide) => (
          <CarouselItem key={slide.id} className="flex-shrink-0 w-full flex justify-center items-center pl-8 pr-4">
            <img src={slide.src} alt={slide.alt} className="w-full h-full  rounded-lg" />
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Optional Dots Navigation */}
      <div className="flex justify-center mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 mx-1 rounded-full ${
              index === currentSlide ? 'bg-oohpoint-primary-2' : 'bg-white'
            }`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
