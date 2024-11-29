"use client";

import React, { useState, useEffect, useContext } from "react";
import { FaTimes, FaEdit } from "react-icons/fa";
import FullPageModal from "./FullPageModal "; // Correct modal import path
import { MyContext } from "@/context/MyContext";

const LocationInputBox = () => {
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showBox, setShowBox] = useState(true);
  const [showModal, setShowModal] = useState(false); // For modal visibility
  const { user } = useContext(MyContext);

  // Load saved address on component mount
  useEffect(() => {
    const savedAddress = localStorage.getItem("address");
    if (savedAddress) {
      setAddress(savedAddress);
      setShowBox(false);
    }
  }, []);

  // Fetch user's current geolocation
  const fetchLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          fetchAddress(latitude, longitude); // Fetch address for coordinates
        },
        (error) => {
          setLoading(false);
          console.error("Error getting location:", error.message);
          alert("Unable to detect location. Please try searching manually.");
        },
        { enableHighAccuracy: true }
      );
    } else {
      setLoading(false);
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Fetch address using Google Maps Geocoding API
  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCYDYbrhpUNYw-GmBeHGOxMQQ6E4lA6Zyk`
      );
      const data = await response.json();

      if (data.status === "OK") {
        const detectedAddress = data.results[0].formatted_address;
        setAddress(detectedAddress);
        localStorage.setItem("address", detectedAddress);
        setShowBox(false); // Hide the input box after detection
        updateUser(latitude, longitude, detectedAddress);
      } else {
        console.error("Error fetching address:", data.status);
        alert("Unable to fetch address. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching address:", error.message);
      alert("An error occurred while fetching your location.");
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (latitude, longitude, address) => {
    try {
      const response = await fetch("/api/updateUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.userId,
          latitude,
          longitude,
          address,
        }),
      });
      const data = await response.json();
      if (data.success) {
        console.log("User updated successfully");
      } else {
        console.error("Error updating user:", data.message);
      }
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  // Handle address selection from modal
  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress);
    localStorage.setItem("address", selectedAddress);
    setShowModal(false); // Close the modal
    setShowBox(false);
  };

  return (
    <div className="px-4 py-2 bg-[#341266] text-white w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-white text-semibold">
          Hello {user?.name || "User"},
        </h2>
      </div>
      {showBox ? (
        <div className="relative mt-4 p-4 bg-white text-black rounded-lg">
          <FaTimes
            className="absolute text-[#ccc] top-3 right-3 text-xl cursor-pointer"
            onClick={() => setShowBox(false)}
          />
          <h3 className="text-lg font-semibold mb-2">Change Location</h3>
          <div className="flex items-center space-x-2">
            <button
              className="bg-green-800 text-white text-[10px] sm:px-4 px-2 py-2 rounded-lg"
              onClick={fetchLocation}
              disabled={loading}
            >
              {loading ? "Detecting..." : "Detect my location"}
            </button>
            <span className="text-gray-500">OR</span>
            <input
              type="text"
              placeholder="Search delivery location"
              className="border border-gray-300 rounded-lg sm:max-w-[30rem] w-[8rem] px-4 py-1 flex-grow outline-none cursor-pointer"
              onClick={() => setShowModal(true)} // Open modal on click
            />
          </div>
        </div>
      ) : (
        address && (
          <div className="flex items-center text-white rounded-lg bg-[#341266] py-1">
            <div className="flex-grow">
              <p className="font-semibold">
                {address || "No address selected"}
              </p>
            </div>
            <button
              className="text-white ml-2 hover:text-gray-300"
              onClick={() => setShowBox(true)} // Show location input box again
              title="Edit location"
            >
              <FaEdit className="w-5 h-5" />
            </button>
          </div>
        )
      )}

      {/* Full Page Modal */}
      <FullPageModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSelectLocation={handleAddressSelect} // Pass callback to modal
      />
    </div>
  );
};

export default LocationInputBox;
