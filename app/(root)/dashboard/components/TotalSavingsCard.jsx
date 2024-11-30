"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebase"; // your Firestore instance
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

const TotalSavingsCard = () => {
  const [totalSavings, setTotalSavings] = useState(0);
  const [userId, setUserId] = useState(null);

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
        });
    } else {
      console.log("No user is logged in.");
    }
  }, []);

  return (
    <div className=" h-[154px] w-full bg-gradient-to-b dashboard shadow-lg flex justify-between pl-4 ">
      <div className="flex items-center">
        {/* Icon */}
        <div className="bg-gray-200 p-3 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="green"
            viewBox="0 0 24 24"
            className="w-8 h-8"
          >
            <path d="M12 22C7.03 22 3 17.97 3 13S7.03 4 12 4s9 4.03 9 9-4.03 9-9 9zm0-16C8.14 6 5 9.14 5 13s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm.5 5H11v2.5h-1.5v1H11V17h1.5v-2.5h1.5v-1H12.5V11z" />
          </svg>
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
