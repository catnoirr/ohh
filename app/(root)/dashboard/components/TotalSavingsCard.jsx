"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebase"; // your Firestore instance
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

// Skeleton loader component
const Skeleton = () => {
  return (
    <div className="h-[154px] w-full bg-gradient-to-b dashboard shadow-lg flex justify-between pl-4 animate-pulse">
      <div className="flex items-center">
        {/* Skeleton Icon */}
        <div className="bg-gray-300 p-3 rounded-full w-12 h-12">
          <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
        </div>
        {/* Skeleton Text Content */}
        <div className="ml-4">
          <div className="w-24 h-5 bg-gray-400 rounded mb-2"></div>
          <div className="w-32 h-6 bg-gray-400 rounded"></div>
        </div>
      </div>
      <div className="mt-auto">
        <div className="w-full h-2 bg-gray-300"></div>
      </div>
    </div>
  );
};

const TotalSavingsCard = () => {
  const [totalSavings, setTotalSavings] = useState(0);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      setUserId(currentUser.uid);

      // Query Firestore to find the user document based on UID
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "==", currentUser.uid));

      getDocs(q)
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            const coupons = userData.coupons || [];

            // Calculate total savings from redeemed coupons
            const total = coupons
              .filter((coupon) => coupon.isRedeemed) // Only redeemed coupons
              .reduce((sum, coupon) => sum + coupon.couponAmount, 0); // Sum coupon amounts

            setTotalSavings(total); // Update total savings state
          } else {
            console.log("No user data found for this UID");
          }
        })
        .catch((error) => {
          console.error("Error getting documents: ", error);
        })
        .finally(() => {
          setLoading(false); // Set loading to false once data is fetched
        });
    } else {
      console.log("No user is logged in.");
      setLoading(false); // Set loading to false if no user is logged in
    }
  }, []);

  // Show skeleton loader while loading is true
  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className="h-[154px] w-full bg-gradient-to-b dashboard shadow-lg flex justify-between pl-4">
      <div className="flex items-center">
        {/* Icon */}
        <div className="bg-gray-200 p-3 rounded-full">
          <img src="/money-tag-green.png" alt="" />
        </div>
        {/* Text Content */}
        <div className="ml-4">
          <h3 className="text-white text-lg font-medium">Total Saving</h3>
          <p className="text-white text-2xl font-semibold">₹{totalSavings}</p>
        </div>
      </div>
      <div className="mt-auto">
        <img src="/zig-zag.png" alt="" className="w-full" />
      </div>
    </div>
  );
};

export default TotalSavingsCard;
