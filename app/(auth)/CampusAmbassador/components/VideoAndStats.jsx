"use client";

import React, { useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const VideoAndStats = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const videoSources = [
    { index: 0, src: "/default.mp4" },
    { index: 1, src: "/default.mp4" },
    { index: 2, src: "/default.mp4" },
    { index: 3, src: "/default.mp4" },
  ];

  const handlePlayPause = (index) => {
    const videos = document.querySelectorAll("video");

    videos.forEach((video, i) => {
      if (i === index) {
        if (video.paused) {
          video.play();
          setCurrentVideoIndex(index);
          setIsVideoPlaying(true);
        } else {
          video.pause();
          setIsVideoPlaying(false);
        }
      } else {
        video.pause();
      }
    });
  };

  return (
    <section className="py-12 md:px-14 px-6">
      <div className="flex gap-8 mx-auto overflow-x-auto scrollbar-hide">
        {videoSources.map((video, index) => (
          <div
            key={video.index}
            className="relative w-full md:min-w-[200px] min-w-[300px]"
          >
            <video
              src={video.src}
              muted={false}
              loop={false}
              className="w-full rounded"
              onClick={() => handlePlayPause(index)}
            />
            {!(isVideoPlaying && currentVideoIndex === index) && (
              <button
                type="button"
                className="absolute inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 text-white text-4xl"
                onClick={() => handlePlayPause(index)}
              >
                {isVideoPlaying && currentVideoIndex === index ? (
                  <FaPause />
                ) : (
                  <FaPlay />
                )}
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideoAndStats;

