"use client";
import { MyContext } from "@/context/MyContext";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CouponCard from "./CouponCard";
import { useRouter } from "next/navigation";
import BottomBar from "./BottomBar";

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const { user, fetchUser } = useContext(MyContext);
  const router = useRouter();

  useEffect(() => {
    const loadUserData = async () => {
      setLoading(true); // Start loading
      try {
        await fetchUser(); // Fetch user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    loadUserData();
  }, []);

  useEffect(() => {
    setCoupons(user?.coupons || []);
  }, [user]);

  // Categorize coupons
  const currentDate = new Date();

  const availableCoupons = coupons.filter(
    (coupon) => !coupon.isRedeemed && new Date(coupon.expiry) > currentDate
  );
  const redeemedCoupons = coupons.filter((coupon) => coupon.isRedeemed);
  const expiredCoupons = coupons.filter(
    (coupon) => !coupon.isRedeemed && new Date(coupon.expiry) <= currentDate
  );

  const redeemCoupon = async (coupon) => {
    try {
      // Update user's coupon
      const updatedCoupon = { ...coupon, isRedeemed: true };
      const updatedCoupons = user.coupons.map((c) =>
        c.couponId === coupon.couponId ? updatedCoupon : c
      );
      await fetch("/api/updateUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.userId,
          coupons: updatedCoupons,
        }),
      });
      toast.success("Coupon redeemed successfully.");
      fetchUser();
    } catch (error) {
      console.error("Error updating coupon:", error);
      toast.error("Failed to redeem coupon.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#341266]">
        <div className="text-lg text-white">Loading coupons...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white    flex flex-col items-center py-6  overflow-y-scroll relative  p-2 w-screen max-w-[30rem] mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-black">Coupons</h2>
      <div className="border-t border-[#646464] w-full px-5 mb-4"></div>

      {/* Available Coupons */}
      <section className="w-full mb-6 ">
        <h3 className="text-xl font-semibold text-black mb-2">Available</h3>
        {availableCoupons.length > 0 ? (
          <div className="space-y-4">
            {availableCoupons.map((coupon) => (
              <CouponCard key={coupon.couponId} data={coupon} redeemCoupon={redeemCoupon} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No coupons  available</p>
        )}
      </section>

      {/* Redeemed Coupons */}
      <section className="w-full mb-6   ">
        <h3 className="text-xl font-semibold text-black mb-2">Redeemed</h3>
        {redeemedCoupons.length > 0 ? (
          <div className=" space-y-4 grid grid-cols-2 md:grid-cols-2 gap-4 media ">
            {redeemedCoupons.map((coupon) => (
              <CouponCard key={coupon.couponId} data={coupon} redeemCoupon={() => {}} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No redeemed coupons.</p>
        )}
      </section>

      {/* Expired Coupons */}
      <section className="w-full">
        <h3 className="text-xl font-semibold text-black mb-2">Expired</h3>
        {expiredCoupons.length > 0 ? (
          <div className="space-y-4">
            {expiredCoupons.map((coupon) => (
              <CouponCard key={coupon.couponId} data={coupon} redeemCoupon={() => {}} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No expired coupons.</p>
        )}
      </section>

      <div className="sm:max-w-[30rem] w-full fixed bottom-0 left-[50%] transform -translate-x-[50%]">
        <BottomBar />
      </div>
    </div>
  );
};

export default Coupons;
