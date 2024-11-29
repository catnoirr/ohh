"use client"; // Necessary for Next.js client-side rendering
import React, { useEffect, useState } from "react";
import { db } from "@/firebase"; // Adjust path if needed
import { collection, getDocs } from "firebase/firestore";

const TopCategories = () => {
  const [categories, setCategories] = useState([]);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "campaigns"));
        const data = querySnapshot.docs.map((doc) => doc.data());
        const placementChannels = data
          .filter((item) => item.placementChannel) // Ensure the field exists
          .map((item) => item.placementChannel); // Directly use placementChannel value
        const uniqueChannels = Array.from(new Set(placementChannels)); // Remove duplicates
        setCategories(uniqueChannels.map(value => ({ value })));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="p-3 w-full">
      <h2 className="text-white text-xl font-bold mb-6">Top Categories</h2>
      <div className="grid grid-cols-4 bg-[#B2A6C4] py-4 rounded-lg gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-2"
          >
            <div className="bg-white rounded-full p-4 flex items-center justify-center">
              <img
                src={category.value.startsWith("http") ? category.value : "/logo.png"} // Check if value is a URL
                alt={`Category ${index + 1}`}
                className="w-8 h-8"
              />
            </div>
            <p className="text-gray-800 font-semibold py-1 text-[10px]">
              {category.value.startsWith("http") ? "Image" : category.value} {/* Display text if not a URL */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;

