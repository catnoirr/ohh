"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebase"; // your Firestore instance
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs, doc, getDoc, orderBy, limit } from "firebase/firestore";

const TotalCoupons = () => {
    const [totalCoupons, setTotalCoupons] = useState(0);
    const [redeemedCoupons, setRedeemedCoupons] = useState([]);
    const auth = getAuth();
    const currentUser = auth.currentUser;

    useEffect(() => {
        if (currentUser) {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("uid", "==", currentUser.uid));

            getDocs(q)
                .then(async (querySnapshot) => {
                    if (!querySnapshot.empty) {
                        const userData = querySnapshot.docs[0].data();  
                        const coupons = userData.coupons || [];
                        const redeemed = coupons.filter(coupon => coupon.isRedeemed === true);
                        const nearbyExpiry = redeemed.filter(coupon => new Date(coupon.expiry).getTime() - new Date().getTime() < 2592000000); // 2592000000 = 30 days in milliseconds
                        const sortedByExpiry = nearbyExpiry.sort((a, b) => new Date(b.expiry).getTime() - new Date(a.expiry).getTime());
                        const lastThreeRedeemed = sortedByExpiry.slice(0, 3);
                        const lastThreeRedeemedWithVendor = await Promise.all(lastThreeRedeemed.map(async (coupon) => {
                            const vendorDoc = await getDoc(doc(db, "vendors", coupon.vendorId));
                            return {
                                ...coupon,
                                businessName: vendorDoc.exists() ? vendorDoc.data().businessName : "Unknown Vendor",
                                businessCategory : vendorDoc.exists() ? vendorDoc.data().businessCategory : "Unknown Vendor",
                                shopImage : vendorDoc.exists() ? vendorDoc.data().shopImage : "Unknown Vendor",
                            };
                        }));
                        setTotalCoupons(redeemed.length);
                        setRedeemedCoupons(lastThreeRedeemedWithVendor);
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
        <div className="bg-gradient-to-b from-purple-700 to-purple-300 rounded-lg shadow-lg p-4 flex items-center justify-between w-full mx-auto">
            <div className="bg-white p-3 rounded-full w-10 h-10">
                <img src="/money-tag.png" alt="money-tag" className="w-6 h-4" />
            </div>
            <div className="text-white">
                <p className="text-xs font-medium">Last Three Coupons</p>
                <p className="text-lg font-semibold">₹{redeemedCoupons.reduce((acc, curr) => acc + curr.couponAmount, 0)}</p>
                {redeemedCoupons.map((coupon, index) => (
                    <div key={index} className="text-sm font-medium my-1">
                        <p>
                            Coupon Amount: ₹{coupon.couponAmount}
                        </p>
                        <p>
                            Vendor: {coupon.businessName} ({coupon.vendorId})
                        </p>
                        <p>
                            {coupon.businessCategory}
                        </p>
                        <img src={coupon.shopImage} alt="" />
                        <p>{new Date(coupon.expiry).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TotalCoupons;


