"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebase"; // your Firestore instance
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

const TotalCoupons = () => {
    const [totalCoupons, setTotalCoupons] = useState(0);
    const auth = getAuth();
    const currentUser = auth.currentUser;

    useEffect(() => {
        if (currentUser) {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("uid", "==", currentUser.uid));

            getDocs(q)
                .then((querySnapshot) => {
                    if (!querySnapshot.empty) {
                        const userData = querySnapshot.docs[0].data();  
                        const coupons = userData.coupons || [];
                        setTotalCoupons(coupons.length);
                    } else {
                        console.log("No user data found for this UID");
                    }
                })
                .catch((error) => {
                    console.error("Error getting documents: ", error);
                });
        }
    }, [currentUser]);

    return (
        <div className="bg-gradient-to-b dashboard rounded-lg shadow-lg p-4 flex items-center justify-between w-full max-w-[155px] max-h-[85px] mx-auto">
        <div className="bg-white p-3 rounded-full w-10 h-10">
           <img src="/money-tag.png" alt="money-tag" className="w-6 h-4" />
           </div>
          <div className="text-white">
            <p className="text-xs font-medium">Total Scans</p>
            <p className="text-lg font-semibold">₹{totalCoupons}</p>
          </div>
          
        </div>
    );
};

export default TotalCoupons;