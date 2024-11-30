
"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebase"; // your Firestore instance
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import TotalCoupons from "./TotalCoupons";
import ReedemedCoupons from "./ReedemedCoupons";
import ValidCoupons from "./ValidCoupons";
import ExpiredCoupons from "./ExpiredCoupons";



const StatsCard = () => {

    const [totalCoupons, setTotalCoupons] = useState(0);
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
    
              // Set the number of coupons (all coupons, not just redeemed)
              setTotalCoupons(coupons.length); // Update totalCoupons state with the length of the coupons array
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
    <div className="grid grid-cols-2  gap-6 p-6  w-full  ">
      {/* Total Scans Card */}
      {/* <div className="bg-gradient-to-b from-purple-700 to-purple-300 rounded-lg shadow-lg p-4 flex items-center justify-between w-full max-w-[155px] max-h-[85px] mx-auto">
      <div className="bg-white p-3 rounded-full w-10 h-10">
         <img src="/money-tag.png" alt="money-tag" className="w-6 h-4" />
         </div>
        <div className="text-white">
          <p className="text-xs font-medium">Total Scans</p>
          <p className="text-lg font-semibold">₹{totalCoupons}</p>
        </div>
        
      </div> */}
<TotalCoupons />      


      {/* Coupons Card */}
      {/* <div className="bg-gradient-to-b from-purple-700 to-purple-300 rounded-lg shadow-lg p-4 flex items-center justify-between w-full max-w-[155px] max-h-[85px] mx-auto">
      <div className="bg-white p-3 rounded-full w-10 h-10 flex justify-center items-center ">
      <img src="/coupons.png" alt="coupons-tag" className="w-6 h-4" />
      </div>
        <div className="text-white">
          <p className="text-xs font-medium">Coupons</p>
          <p className="text-lg font-semibold">₹5,600</p>
        </div>
       

      </div> */}
      <ReedemedCoupons />

      {/* Expense Card */}
      {/* <div className="bg-gradient-to-b from-purple-700 to-purple-300 rounded-lg shadow-lg p-4 flex items-center justify-between w-full max-w-[155px] max-h-[85px] mx-auto">
      <div className="bg-white p-3 rounded-full   w-10 h-10 flex justify-center items-center ">
      <img src="/expence.png" alt="expence-tag" className="w-6 h-4" />
      </div>
        <div className="text-white">
          <p className="text-xs font-medium">Expense</p>
          <p className="text-lg font-semibold">$3,460</p>
        </div>
       
      </div> */}

        <ValidCoupons />
      {/* Total Saving Card */}
      <ExpiredCoupons />
    </div>
  );
};

export default StatsCard;
