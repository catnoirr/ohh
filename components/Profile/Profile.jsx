"use client";

import {
  AiOutlineQuestionCircle,
  AiOutlineLogout,
} from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { FaGift } from "react-icons/fa";
import { BsFillBookmarkFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase"; // Make sure Firebase is initialized
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Profile() {
  const router = useRouter();
  const [userName, setUserName] = useState(null); // Store user's name
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch the current user's name from Firestore
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = auth.currentUser; // Get authenticated user
        if (user) {
          const userUid = user.uid; // Get the user's UID
          const usersCollection = collection(db, "users"); // Reference the `users` collection

          // Query the `users` collection for a document with the matching `uid`
          const q = query(usersCollection, where("uid", "==", userUid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            // Loop through results (in case of multiple matches)
            querySnapshot.forEach((doc) => {
              setUserName(doc.data().name); // Extract the `name` field
            });
          } else {
            console.error("No user found with the given UID.");
          }
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
      } finally {
        setLoading(false); // Data fetching is complete
      }
    };

    fetchUserName();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <img
          src="/logo.png"
          alt="Loading"
          className="w-24 h-24 animate-pulse "
        />
      </div>
    );
  }
  

  return (
    <div className="sm:w-[30rem] w-full bg-white px-3">
      {/* Profile Section */}
      <div className="relative flex flex-col items-center pt-8 mb-10">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
          alt="Profile"
          className="w-24 h-24 rounded-full border"
        />
        <h2 className="text-lg font-semibold text-black mt-4">
          {userName || "Guest User"}
        </h2>
      </div>

      {/* Dashboard & Rewards */}
      <div className="flex justify-around items-center bg-[#50287E] py-4 px-10 -mt-5 rounded-xl mb-16">
        <div className="border-t bg-white w-full relative flex items-center justify-between px-6 py-2 rounded-3xl top-10">
          <div className="flex flex-col items-center">
            <MdDashboard className="text-oohpoint-primary-3 text-2xl" />
            <span className="text-oohpoint-primary-3 text-sm mt-1">
              Dashboard
            </span>
          </div>
          <div className="w-[1px] h-8 bg-oohpoint-primary-3"></div>
          <div className="flex flex-col items-center">
            <FaGift className="text-oohpoint-primary-3 text-2xl" />
            <span className="text-oohpoint-primary-3 text-sm mt-1">
              Rewards
            </span>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-white mt-2">
        {/* Menu Item: Your Orders */}
        <div
          className="flex items-center justify-between px-6 py-4 border-t border-gray-200 cursor-pointer"
          onClick={() => router.push("/analytics")}
        >
          <BsFillBookmarkFill className="text-xl text-[#341266]" />
          <div className="flex-grow ml-4">
            <p className="font-medium text-gray-700">Analytics</p>
            <p className="text-gray-400 text-sm">Analysis your prefrences</p>
          </div>
          <span className="text-gray-400">&gt;</span>
        </div>

        {/* Menu Item: Help and Support */}
        <div
          className="flex items-center justify-between px-6 py-4 border-t border-gray-200 cursor-pointer"
          onClick={() => router.push("/helpdesk")}
        >
          <AiOutlineQuestionCircle className="text-xl text-[#341266]" />
          <div className="flex-grow ml-4">
            <p className="text-gray-700">Help and Support</p>
            <p className="text-gray-400 text-sm">Raise and view query</p>
          </div>
          <span className="text-gray-400">&gt;</span>
        </div>

        {/* Menu Item: Saved Address */}
        {/* <div
          className="flex items-center justify-between px-6 py-4 border-t border-gray-200 cursor-pointer"
          onClick={() => router.push("/saved-address")}
        >
          <MdDashboard className="text-xl text-[#341266]" />
          <div className="flex-grow ml-4">
            <p className="text-gray-700">Saved Address</p>
            <p className="text-gray-400 text-sm">
              Manage your saved addresses for quick access
            </p>
          </div>
          <span className="text-gray-400">&gt;</span>
        </div> */}

        {/* Menu Item: Terms & Conditions */}
        {/* <div
          className="flex items-center justify-between px-6 py-4 border-t border-gray-200 cursor-pointer"
          onClick={() => router.push("/terms-conditions")}
        >
          <AiOutlineQuestionCircle className="text-xl text-[#341266]" />
          <div className="flex-grow ml-4">
            <p className="text-gray-700">Terms & Conditions</p>
            <p className="text-gray-400 text-sm">
              Review and agree to our terms and conditions
            </p>
          </div>
          <span className="text-gray-400">&gt;</span>
        </div> */}

        {/* Menu Item: Account Privacy */}
        <div
          className="flex items-center justify-between px-6 py-4 border-t border-gray-200 cursor-pointer"
          onClick={() => auth.signOut()}
        >
          <AiOutlineLogout className="text-xl text-[#341266]" />
          <div className="flex-grow ml-4">
            <p className="text-gray-700">Logout</p>
            <p className="text-gray-400 text-sm">
              Sign out of your account 
            </p>
          </div>
          <span className="text-gray-400">&gt;</span>
        </div>
      </div>
    </div>
  );
}
