import React, { useState } from "react";

const VendorListWithDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const vendors = [
    { name: "Pizza", icon: "🍕" },
    { name: "Burger", icon: "🍔" },
    { name: "Ice cream", icon: "🍦" },
    { name: "Spaghetti", icon: "🍝" },
  ];

  const items = [
    {
      id: 1,
      name: "Chai Buzz",
      location: "Malviya Nagar Jaipur Rajasthan",
      product: "BK Chicken Burger+Fries (M)",
      image: "/path-to-burger-image.jpg", // Replace with your image path
      discount: "50% OFF",
      rating: "4.5",
      nutrition:
        "Qty: 278 Gms | Kcal: 747.5 | Carbs: 48.4 Gms | Sugar: 7.2 Gms | Fat: 35.6 Gms | Saturated Fat: 14 Gms | Protein: 22.9 Gms | Sodium: 2.2 Gms",
    },
    // Duplicate or add more items as needed
  ];

  return (
    <div className="bg-purple-900 min-h-screen p-6">
      {/* Dropdown Menu */}
      <div className="relative w-64 mb-6">
        <button
          onClick={toggleDropdown}
          className="w-full bg-white text-gray-800 rounded-lg shadow-md px-4 py-2 flex items-center justify-between focus:outline-none"
        >
          <span>Choose Vendor</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-5 h-5 transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isDropdownOpen && (
          <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg z-10">
            <ul className="py-2">
              {vendors.map((vendor, index) => (
                <li
                  key={index}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <span className="text-purple-700 text-lg mr-3">
                    {vendor.icon}
                  </span>
                  <span className="text-gray-800">{vendor.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.product}
                className="rounded-lg mb-4"
              />
              <div className="absolute top-2 left-2 bg-purple-700 text-white text-xs px-2 py-1 rounded-md">
                {item.discount}
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-800">
              {item.name} <span className="text-green-500">✔</span>
            </h3>
            <p className="text-sm text-gray-500">{item.location}</p>
            <p className="text-sm font-medium text-purple-900 mt-2">
              {item.product}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {item.nutrition}{" "}
              <span className="text-purple-700 font-medium cursor-pointer">
                See more
              </span>
            </p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm bg-purple-100 text-purple-900 px-2 py-1 rounded-lg shadow-sm">
                ⭐ {item.rating}
              </span>
              <button className="text-purple-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorListWithDropdown;