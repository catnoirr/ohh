"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SearchDeliveryLocation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchQuery}&key=AIzaSyCYDYbrhpUNYw-GmBeHGOxMQQ6E4lA6Zyk`
      );
      const data = await response.json();
      if (data.status === "OK") {
        setResults(data.predictions);
      } else {
        console.error("Error fetching search results:", data.status);
      }
    } catch (error) {
      console.error("Error fetching search results:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectLocation = (location) => {
    // Save the selected location to localStorage and navigate back to the main page
    localStorage.setItem("address", location.description);
    router.push("/"); // Navigate back to the home page
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold">Search Delivery Location</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter delivery location"
        className="border border-gray-300 rounded-lg w-full p-2 mt-4"
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        {loading ? "Searching..." : "Search"}
      </button>
      <ul className="mt-4">
        {results.map((location) => (
          <li
            key={location.place_id}
            className="cursor-pointer p-2 hover:bg-gray-100 border-b"
            onClick={() => handleSelectLocation(location)}
          >
            {location.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchDeliveryLocation;
