"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebase"; // your Firestore instance
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

const ReedemedCoupons = () => {
    const [totalRedeemedCoupons, setTotalRedeemedCoupons] = useState(0);
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
    
              // Count the number of redeemed coupons (where isRedeemed is true)
              const redeemedCouponsCount = coupons.filter(coupon => coupon.isRedeemed === true).length;
    
              setTotalRedeemedCoupons(redeemedCouponsCount); // Update the state with the count of redeemed coupons
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
        <div className="bg-gradient-to-b dashboard rounded-lg shadow-lg p-4 flex items-center justify-between w-full max-w-[155px] max-h-[85px] mx-auto">
      <div className="bg-white p-3 rounded-full w-10 h-10 flex justify-center items-center ">
      <img src="/coupons.png" alt="coupons-tag" className="w-6 h-4" />
      </div>
        <div className="text-white">
          <p className="text-xs font-medium">Coupons</p>
          <p className="text-lg font-semibold">{totalRedeemedCoupons}</p>
        </div>
       
      </div>
    );
};

export default ReedemedCoupons;