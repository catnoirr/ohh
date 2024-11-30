"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebase"; // your Firestore instance
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

const ValidCoupons = () => {
    const [totalValidCoupons, setTotalValidCoupons] = useState(0);
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
    
              // Get the current date
              const currentDate = new Date();
    
              // Filter coupons where:
              // - isRedeemed is false
              // - expiry date is greater than the current date
              const validCouponsCount = coupons.filter(coupon => 
                coupon.isRedeemed === false &&
                new Date(coupon.expiry) > currentDate // Parse the expiry date and compare with current date
              ).length;
    
              setTotalValidCoupons(validCouponsCount); // Update the state with the count of valid coupons
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
            <div className="bg-white p-3 rounded-full   w-10 h-10 flex justify-center items-center ">
            <img src="/expence.png" alt="expence-tag" className="w-6 h-4" />
            </div>
              <div className="text-white">
                <p className="text-xs font-medium">Pending </p>
                <p className="text-lg font-semibold">{totalValidCoupons}</p>
              </div>
             
            </div>
      
        );
        };

export default ValidCoupons
