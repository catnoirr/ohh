import React from 'react';
import { FaSearch, FaBell, FaShoppingCart } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <div className="flex bg-[#341266] sm:max-w-[30rem] w-full items-center justify-between p-4 text-white">
      {/* Search Input */}
      <div className="flex items-center justify-around flex-grow border-2 border-white rounded-full px-4 py-3">
        <input
          type="text"
          placeholder="Search Campaigns Here"
          className="bg-transparent text-sm sm:max-w-full max-w-[12rem] flex-grow outline-none text-white placeholder:text-white"
        />
        <FaSearch className="text-white text-lg ml-2" />
      </div>

      {/* Icons Section */}
      <div className="flex items-center space-x-4 ml-4">
        {/* Notification Bell with red dot */}
        <div className="relative">
          <FaBell className="text-white text-xl" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full"></span>
        </div>

        {/* Shopping Cart */}
        <FaShoppingCart className="text-white text-xl" />
      </div>
    </div>
  );
};

export default SearchBar;
