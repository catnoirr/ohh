"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebase"; // Adjust path as needed
import { collection, getDocs } from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Swiper core styles
import "swiper/css/navigation"; // Swiper navigation styles
import "swiper/css/pagination"; // Swiper pagination styles
import { Autoplay } from "swiper/modules"; // Optional modules

const BrandItem = ({ imageUrl, name }) => {
  return (
    <div className="rounded-full bg-white w-16 h-16">
      <img
        src={imageUrl || "/logo.png"} // Placeholder image URL
        alt={name}
        className="h-16 w-16 object-cover rounded-full border-4 border-white shadow-md"
      />
    </div>
  );
};

const Brands = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "brands"));
        const brandData = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((brand) => brand.imageUrl); // Exclude items with empty imageUrl
        setBrands(brandData);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  return (
    <div className="rounded-lg w-full p-4 max-w-md  relative z-0">
      <h2 className="text-white text-xl font-semibold mb-4">Brands</h2>
      <Swiper
        modules={[Autoplay]} // Swiper modules
        spaceBetween={20} // Space between slides
        slidesPerView={4} // Number of slides visible at once
        autoplay={{ delay: 3000, disableOnInteraction: false }} // Auto-slide
        breakpoints={{
          // Responsive settings
          320: { slidesPerView: 4, spaceBetween: 10 },
          640: { slidesPerView: 4, spaceBetween: 15 },
          768: { slidesPerView: 4, spaceBetween: 20 },
          1024: { slidesPerView: 5, spaceBetween: 20 },
        }}
        className="swiper-container rounded-lg overflow-hidden"
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand.id} className="">
            <BrandItem imageUrl={brand.imageUrl} name={brand.name} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
