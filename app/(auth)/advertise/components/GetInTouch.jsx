"use client";
import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Subscribed with email:', email);
  };

  return (
    <div className=" p-10 max-w-5xl mx-auto  shadow-md md:py-16">
      <div className="text-center">
        <div className="flex justify-center flex-col items-center space-x-3 ">
         <img src="./plane.png" alt="" className='max-w-40 '  />
          <span className="text-4xl font-medium text-gray-900">Let's stay in touch</span>
        </div>
        <p className="mt-2 text-gray-900">Receive news, stay updated, and special offers</p>
        <form onSubmit={handleSubmit} className="mt-5">
          <input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className="w-full max-w-3xl p-3 mt-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className=" mt-3 py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2"
          >
            Subscribe now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
