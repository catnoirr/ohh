import React, { useState, useEffect } from "react";

const FullPageModal = ({ isOpen, onClose, onSelectLocation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [isSearching, setIsSearching] = useState(false); // Loading state for auto-search

  // Function to get location using latitude and longitude
  const fetchLocationByCoordinates = async (latitude, longitude) => {
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCYDYbrhpUNYw-GmBeHGOxMQQ6E4lA6Zyk`
      );
      const data = await response.json();

      console.log("Reverse Geocoding API Response:", data); // Debugging API response

      if (data.status === "OK" && data.results.length > 0) {
        const formattedAddress = data.results[0].formatted_address;
        setLocation(formattedAddress);
      } else {
        console.error("No address found for coordinates:", data.status);
        setLocation("Unable to detect address. Try entering it manually.");
      }
    } catch (error) {
      console.error("Error fetching location by coordinates:", error.message);
      setLocation("Error detecting location. Try entering it manually.");
    } finally {
      setIsSearching(false);
    }
  };

  // Function to get user's current position
  const detectCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchLocationByCoordinates(latitude, longitude);
        },
        (error) => {
          console.error("Error getting current location:", error.message);
          setLocation("Location detection failed. Try entering it manually.");
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLocation("Geolocation not supported. Enter manually.");
    }
  };

  // Search logic with debounce
  useEffect(() => {
    if (searchQuery) {
      const delaySearch = setTimeout(() => {
        handleSearch();
      }, 800); // Delay search by 800ms

      return () => clearTimeout(delaySearch);
    }
  }, [searchQuery]);

  // Function to search location by address input
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          searchQuery
        )}&key=AIzaSyCYDYbrhpUNYw-GmBeHGOxMQQ6E4lA6Zyk`
      );
      const data = await response.json();

      console.log("Address Search API Response:", data); // Debugging API response

      if (data.status === "OK" && data.results.length > 0) {
        const formattedAddress = data.results[0].formatted_address;
        setLocation(formattedAddress);
      } else {
        console.error("No location found:", data.status);
        setLocation("No location found. Try entering a more specific address.");
      }
    } catch (error) {
      console.error("Error fetching location by search:", error.message);
      setLocation("Error finding location. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleConfirmLocation = () => {
    if (location) {
      onSelectLocation(location);
      onClose();
    } else {
      alert("Please select or detect a location.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-20 ">
      <div className="bg-white w-full h-full  p-6 rounded-lg shadow-lg relative">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          ✖
        </button>

        {/* Header */}
        <h1 className="text-xl font-bold text-gray-800 mb-4">Search Delivery Location</h1>

        {/* Detect Current Location Button */}
        {/* <button
          onClick={detectCurrentLocation}
          className="mb-4 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Detect My Location
        </button> */}

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Enter delivery location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-4 shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {isSearching && (
            <p className="text-sm text-gray-500 mt-2">Searching...</p>
          )}
        </div>

        {/* Detected or Searched Location */}
        {location && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-black"></p>
            <p className="font-semibold text-black">{location}</p>
          </div>
        )}

        {/* Confirm Location Button */}
        <button
          onClick={handleConfirmLocation}
          className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Confirm Location
        </button>
      </div>
    </div>
  );
};

export default FullPageModal;
