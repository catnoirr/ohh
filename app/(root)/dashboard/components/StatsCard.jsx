"use client";
import { useEffect, useState } from "react";
import TotalCoupons from "./TotalCoupons";
import ReedemedCoupons from "./ReedemedCoupons";
import ValidCoupons from "./ValidCoupons";
import ExpiredCoupons from "./ExpiredCoupons";

// Skeleton component to show while loading
const Skeleton = () => {
  return (
    <div className="bg-gradient-to-b dashboard rounded-lg shadow-lg p-4 flex items-center justify-between w-full max-w-[155px] max-h-[85px] mx-auto animate-pulse">
      <div className="bg-white p-3 rounded-full w-10 h-10 flex justify-center items-center">
        <div className="w-6 h-4 bg-gray-300 rounded"></div>
      </div>
      <div className="text-white">
        <p className="text-xs font-medium bg-gray-300 rounded w-16 h-4 mb-2"></p>
        <p className="text-lg font-semibold bg-gray-300 rounded w-20 h-6"></p>
      </div>
    </div>
  );
};

const StatsCard = () => {
  const [loading, setLoading] = useState(true); // Loading state for the data

  useEffect(() => {
    // Simulating data loading process (replace this with your actual data fetching logic)
    const timer = setTimeout(() => {
      setLoading(false); // Once data is loaded, set loading to false
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Clean up the timer when component is unmounted
  }, []);

  return (
    <div className="grid grid-cols-2 gap-6 p-6 w-full">
      {/* Show skeleton loader while loading */}
      {loading ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : (
        <>
          <TotalCoupons />
          <ReedemedCoupons />
          <ValidCoupons />
          <ExpiredCoupons />
        </>
      )}
    </div>
  );
};

export default StatsCard;
