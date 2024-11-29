"use client"

import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { format, formatDistanceToNow } from 'date-fns';

const CardComponent = ({ initialCount = 3 }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`/api/getBlogs?count=${initialCount}`);
        const result = await response.json();
        setBlogs(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [initialCount]);

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000); 
    const formattedDate = format(date, 'MMM d, yyyy'); 
    const timeDifference = formatDistanceToNow(date, { addSuffix: true });
    return `${formattedDate} • ${timeDifference}`;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-16 w-full">
      <h2 className="text-white text-center text-lg">Blogs</h2>
      <div className="bg-[#B2A4C5] mt-5 sm:p-6 p-1 pb-2 w-full">
        {blogs.map((data) => (
          <div
            key={data.id}
            className="flex md:flex-row w-full mb-4 bg-[#341266] text-white shadow-lg overflow-hidden"
          >
            <img
              src={data.image}
              alt="Card thumbnail"
              className="w-[40%] h-[12rem] object-cover"
            />
            <div className="flex-1 flex flex-col justify-between px-4 py-1 md:px-6">
            <div className="flex flex-col flex-grow">
              <div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="sm:text-xs text-[8px]">{data.user}</p>
                    <p className="sm:text-xs text-[8px] font-thin">
                      {formatDateTime(data.createdAt)}
                    </p>
                  </div>
                  <div className="text-gray-400">
                    <button className="focus:outline-none">⋮</button>
                  </div>
                </div>
                <h3 className="sm:text-sm text-xs font-normal mt-2">{data.title}</h3>
                <p className="sm:text-xs mb-auto text-[10px] mt-1 font-thin text-gray-300">
                  {data.description}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-auto border-t-[1px] border-t-[#ccc] pt-2">
              <div className="flex justify-between w-full text-gray-400 sm:text-xs text-[10px]">
                <span>{data.views} Views</span>
                <span>{data.comments} comments</span>
              </div>
              <div className="flex items-center gap-1 ml-4">
                <span className="sm:text-xs text-[10px]">{data.likes}</span>
                <FaHeart className="text-red-500" />
              </div>
            </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardComponent;
