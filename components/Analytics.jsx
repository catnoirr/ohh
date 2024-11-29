"use client";
import { MyContext } from "@/context/MyContext";
import React, { useContext } from "react";
import { RiCoupon2Line, RiCoupon3Line } from "react-icons/ri";
import CampaignsDisplay from "./Home/CampaignsDisplay";
import { CiStar } from "react-icons/ci";
import { GoPeople } from "react-icons/go";

const Analytics = () => {
  const { user } = useContext(MyContext);
  const formatExpiry = (expiry) => {
    const formattedExpiry = new Date(expiry).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return formattedExpiry;
  };

  const isExpired = (expiry) => {
    const isExpired = new Date(expiry) < new Date();
    return isExpired;
  };

  const renderedVendors = new Set();

  return (
    <div className="min-h-screen bg-[#341266] w-screen max-w-[30rem] mx-auto flex flex-col gap-4 items-center py-6 px-4 overflow-y-scroll relative ">
      <h2 className="text-2xl font-bold text-gray-200">Analytics</h2>
      <div className="border-t border-[#646464] w-full px-5"></div>
      <div className="flex flex-col gap-4 bg-white text-black rounded-lg p-4 w-full h-[8.5rem]">
        <div className="flex justify-between items-center w-full">
          <p className=" text-lg text-[#7c7c7c]">Total Coupons Earned</p>
          <div className="text-4xl bg-[#34126637] text-[#341266] p-2 rounded-full">
            <RiCoupon2Line />
          </div>
        </div>
        <div className="flex justify-start items-center w-full">
          <p className="text-4xl font-semibold">{user?.coupons?.length || 0}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 bg-white text-black rounded-lg p-4 w-full h-[8.5rem]">
        <div className="flex justify-between items-center w-full">
          <p className=" text-lg text-[#7c7c7c]">Reward Points</p>
          <div className="text-4xl bg-[#34126637] text-[#341266] p-2 rounded-full">
            <CiStar />
          </div>
        </div>
        <div className="flex justify-start items-center w-full">
          <p className="text-4xl font-semibold">140</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 bg-white items-center text-black rounded-lg p-4 w-full min-h-[8.5rem]">
        <h2 className=" font-semibold text-lg text-left">Active Coupons</h2>
        <div className="border-t border-[#646464] w-full px-5"></div>
        {user?.coupons
          ?.filter((coupon) => !isExpired(coupon.expiry))
          .map((coupon) => (
            <div
              className="flex justify-start gap-6 items-center w-full"
              key={coupon.couponId}
            >
              <div className="text-4xl bg-[#34126637] text-[#341266] p-2 rounded-full">
                <RiCoupon3Line />
              </div>
              <div className="flex flex-col justify-center items-start">
                <p className="text-sm text-[#7c7c7c]">
                  Prize: ₹{coupon.couponAmount}
                </p>
                <p className="text-sm text-[#7c7c7c]">
                  Expiry: {formatExpiry(coupon.expiry)}
                </p>
              </div>
            </div>
          ))}
      </div>
      <div className="flex flex-col gap-4 bg-white items-center text-black rounded-lg p-4 w-full min-h-[8.5rem]">
        <h2 className=" font-semibold text-lg text-left">Redeemed Coupons</h2>
        <div className="border-t border-[#646464] w-full px-5"></div>
        {user?.coupons
          ?.filter((coupon) => coupon.isRedeemed)
          .map((coupon) => (
            <div
              className="flex justify-start gap-6 items-center w-full"
              key={coupon.couponId}
            >
              <div className="text-4xl bg-[#34126637] text-[#341266] p-2 rounded-full">
                <RiCoupon3Line />
              </div>
              <div className="flex flex-col justify-center items-start">
                <p className="text-sm text-[#7c7c7c]">
                  Prize: ₹{coupon.couponAmount}
                </p>
                <p className="text-sm text-[#7c7c7c]">
                  Coupon ID: {coupon.couponId}
                </p>
              </div>
            </div>
          ))}
      </div>
      <CampaignsDisplay />
      <div className="flex flex-col gap-4 bg-white items-center text-black rounded-lg p-4 w-full min-h-[8.5rem]">
        <h2 className=" font-semibold text-lg text-left">Favourite Vendors</h2>
        <div className="border-t border-[#646464] w-full px-5"></div>
        {user?.coupons
          ?.filter((coupon) => {
            if (renderedVendors.has(coupon.vendorId)) {
              return false; // Skip this coupon if the vendorId is already rendered
            }
            renderedVendors.add(coupon.vendorId); // Add vendorId to the Set
            return true; // Render this coupon
          })
          .map((coupon) => (
            <div
              className="flex justify-start gap-6 items-center w-full"
              key={coupon.vendorId}
            >
              <div className="text-3xl bg-[#34126637] text-[#341266] p-2 rounded-full">
                <GoPeople />
              </div>
              <div className="flex flex-col justify-center items-start">
                <p className="text-sm text-[#7c7c7c]">
                  Vendor ID: {coupon.vendorId}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Analytics;
