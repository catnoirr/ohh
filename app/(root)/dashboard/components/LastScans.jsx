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
      const fetchUserCoupons = async () => {
        try {
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("uid", "==", currentUser.uid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            const coupons = userData.coupons || [];

            // Filter redeemed coupons
            const redeemed = coupons.filter((coupon) => coupon.isRedeemed === true);

            // Sort coupons near expiry within 30 days
            const nearbyExpiry = redeemed.filter(
              (coupon) => new Date(coupon.expiry).getTime() - new Date().getTime() < 2592000000
            );

            const sortedByExpiry = nearbyExpiry.sort(
              (a, b) => new Date(b.expiry).getTime() - new Date(a.expiry).getTime()
            );

            const lastThreeRedeemed = sortedByExpiry.slice(0, 3);

            // Fetch vendor details for each coupon
            const lastThreeRedeemedWithVendor = await Promise.all(
              lastThreeRedeemed.map(async (coupon) => {
                const vendorDoc = await getDoc(doc(db, "vendors", coupon.vendorId));
                return {
                  ...coupon,
                  businessName: vendorDoc.exists() ? vendorDoc.data().businessName : "Unknown Vendor",
                  businessCategory: vendorDoc.exists() ? vendorDoc.data().businessCategory : "Unknown Category",
                  shopImage: vendorDoc.exists() ? vendorDoc.data().shopImage : "/images/default-shop.png",
                };
              })
            );

            setTotalCoupons(redeemed.length);
            setRedeemedCoupons(lastThreeRedeemedWithVendor);
          } else {
            console.log("No user data found for this UID.");
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

      fetchUserCoupons();
    }
  }, [currentUser, db]);

  return (
    <div className=" p-8 rounded-lg w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-[#333B69] mb-4">Last Scan</h2>
      
      <div className="space-y-5 dashboard py-5 rounded ">
        {redeemedCoupons.length > 0 ? (
          redeemedCoupons.map((coupon) => (
            <div
              key={coupon.couponId}
              className="flex justify-between items-center p-4 rounded-lg  shadow-md"
            >
              <div className="flex items-center">
                {/* Shop Image */}
                <img
                  src={coupon.shopImage}
                  alt={coupon.businessName}
                  className="w-10 h-10 rounded-full border-4 border-white"
                />
                <div className="ml-4">
                  <p className="text-sm font-bold text-white">
                    {coupon.businessName} | {coupon.businessCategory}
                  </p>
                  <p className="text-xs font-semibold text-gray-800">
                     {new Intl.DateTimeFormat('en-GB', {dateStyle: 'short', timeStyle: 'short'}).format(new Date(coupon.expiry))}
                  </p>
                </div>
              </div>
              <p className="text-green-500 font-semibold bg-white p-2 rounded-full shadow-md"> ₹{coupon.couponAmount}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No redeemed coupons to show.</p>
        )}
      </div>
    </div>
  );
};

export default TotalCoupons;


