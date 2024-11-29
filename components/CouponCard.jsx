"use client";

import React, { useState, useEffect } from "react";

const CouponCard = ({ data, redeemCoupon }) => {
  const [vendor, setVendor] = useState({});
  const formattedExpiry = new Date(data.expiry).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const isExpired = new Date(data.expiry) < new Date();

  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        const response = await fetch(
          `/api/getVendor?vendorId=${data.vendorId}`
        );
        const result = await response.json();
        setVendor(result);
      } catch (error) {
        console.error("Error fetching vendor details:", error);
      }
    };

    fetchVendorDetails();
  }, [data.vendorId]);

  // Card classes based on coupon state
  const baseCardClasses =
    "w-[12.5rem] sm:min-h-[13rem] min-h-[10rem] px-4 pb-3 overflow-hidden mt-4 rounded-md shadow-md coupon-card";
  const redeemedClasses =
    "bg-white border border-oohpoint-primary-3 rounded-xl shadow-lg celebrate ";
  const expiredClasses =
    "bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 text-gray-700 border shadow-lg expired";
  const activeClasses =
    "bg-ohhpoint-primary-3 text-white border border-oohpoint-primary-3 rounded-xl shadow-lg";

  // Determine the card's state and style
  const cardState = data.isRedeemed
    ? redeemedClasses
    : isExpired
    ? expiredClasses
    : activeClasses;

  return (
    <div className={`${baseCardClasses} ${cardState}`}>
      {/* Coupon Details */}
      {/* <div className="text-center">
        <p className="text-xs font-medium">Coupon ID: {data.couponId}</p>
        <p className="text-sm font-bold">{vendor.businessName || "Loading..."}</p>
      </div> */}

      {/* Coupon Image and Amount */}
      <div className="relative mt-2  ">
        {data.isRedeemed ? (
          < >
          <div className="flex items-center  h-28 justify-center py-6  ">
            <div className="bg-oohpoint-primary-3  rounded-full p-4 w-20 h-20 flex justify-center items-center">
            <p className=" text-2xl font-bold text-white p-2 ">
              ₹{data.couponAmount}
            </p>
            </div>
            </div>
            
          </>
        ) : (
          <>
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center bg-[#E28B00] rounded-full p-4 ">
          <img
            src={"/giftt.png"}
            alt="Coupon"
            className="h-16 w-full object-cover rounded-md"
          />
          </div>
          </div>
          </>
        )}
      </div>

      {/* Expiry Date */}
      <div className="mt-2">
        <p className="text-mg font-semibold">
         Valid Till: <span className="font-medium">{formattedExpiry}</span>
        </p>
        {/* <p className="text-xs font-light">
          Vendor Address: {vendor.address || "Loading..."}
        </p> */}
      </div>

      {/* Actions Based on Coupon State */}
      {data.isRedeemed ? (
        <div className="bg-oohpoint-primary-2  text-center text-white mt-2 px-3 py-1 rounded-xl font-semibold">
          Redeemed
        </div>
      ) : isExpired ? (
        <div className="bg-gray-300 text-gray-700 text-center mt-2 px-3 py-1 rounded font-semibold">
          Expired
        </div>
      ) : (
        <button
          onClick={() => redeemCoupon(data)}
          className="bg-purple-500 hover:bg-purple-600 text-white text-center mt-2 px-3 py-1 rounded font-semibold"
        >
          Redeem Now
        </button>
      )}
    </div>
  );
};

export default CouponCard;
