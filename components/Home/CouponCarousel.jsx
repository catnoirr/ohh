"use client";

import { useState, useEffect, useContext } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { MyContext } from "@/context/MyContext";
import ClipLoader from 'react-spinners/ClipLoader';

const CouponCarousel = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchedVendors, setFetchedVendors] = useState(false);
  const { user } = useContext(MyContext); 
  
  useEffect(() => {
    setCoupons(user?.coupons || []);
  }, [user]);

  const fetchVendorDetails = async () => {
    try {
      const updatedCoupons = await Promise.all(
        coupons.map(async (coupon) => {
          if (coupon.vendorId) {
            const response = await fetch(`/api/getVendor?vendorId=${coupon.vendorId}`);
            const vendor = await response.json();
            return { ...coupon, vendor };
          }
          return coupon;
        })
      );
      setCoupons(updatedCoupons);
      setFetchedVendors(true);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching vendor details:", error);
      setError("Failed to fetch vendor details.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (coupons.length > 0 && !fetchedVendors) {
      fetchVendorDetails();
    } else {
      setLoading(false);
    }
  }, [coupons, fetchedVendors]); 
  
  if (loading) {
    return <div className="flex items-center bg-white justify-center w-full h-44">
    <ClipLoader color="#341266" loading={loading} size={20} />
  </div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mb-5 bg-white mt-16 py-5 sm:w-[30rem] w-full">
      <h2 className="mb-[10px] text-2xl font-medium text-center">Your Coupons</h2>
      <Carousel className="overflow-hidden">
        <CarouselContent className="flex ps-2">
          {coupons.length ? (
            coupons.map((coupon, i) => {
              const formattedExpiry = new Date(coupon.expiry).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              });
              const isExpired = new Date(coupon.expiry) < new Date();
              return (
                <CarouselItem key={i} className="basis-1/2 sm:basis-1/3">
                  <Card className={`bg-[#341266] text-dark p-4 rounded-xl shadow-md ${isExpired ? 'opacity-50' : ''}`}>
                    <div className="text-center ">
                      <div className="flex justify-center items-center flex-col">
                        <div className="flex items-center gap-2 mx-auto">
                          <Image src="/bird.png" width={100} height={100} className="w-6" />
                          <h3 className="font-thin text-xs text-white">{coupon?.vendor?.businessName}</h3>
                        </div>
                      </div>
                      <div className="relative flex justify-center items-center flex-col text-white p-2 rounded mt-2 mx-auto">
                        <div className="relative">
                          <img
                            src="/couponBigSale.png"
                            alt="TradeFlex Logo"
                            className="sm:h-[4.5rem] h-[4rem] mt-2 mx-auto"
                          />
                          <h2 className="font-[800] text-black text-lg absolute top-3 left-1/2 -translate-x-2">
                            {coupon.couponAmount}
                          </h2>
                        </div>
                        <div className="h-10 w-10 absolute -bottom-16 -left-10 bg-white rounded-full"></div>
                        <div className="h-10 w-10 absolute -bottom-16 -right-10 bg-white rounded-full"></div>
                        <div className="border-t-2 border-dashed sm:w-[10rem] w-[18rem] -left-[20px] absolute border-white -bottom-[47px]"></div>
                      </div>
                    </div>
                    <div className="text-center text-sm text-white mb-5">
                      <p className="font-thin">Expiring On:</p>
                      <p className="font-semibold">{formattedExpiry}</p>
                    </div>
                    <div className="mt-3 text-start font-thin text-xs flex flex-col text-white">
                      <p className="font-extralight">Vendor Address:</p>
                      <p>{coupon.vendor?.address || coupon.address}</p>
                    </div>
                  </Card>
                </CarouselItem>
              );
            })
          ) : (
            <div className="h-44 flex items-center justify-center w-full rounded-lg border bg-white p-4">
                <p>No coupons found !</p>
            </div>
          )}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CouponCarousel;
