"use client"
import React, { useState } from "react";
import { FaHome, FaBullhorn, FaGift, FaUserCircle, FaQrcode } from 'react-icons/fa';
import "./styles.css"; // Assuming you have a similar CSS file for styling

const MagicMenuIndicator = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSetActive = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="navigation mt-16">
      <ul>
        <li
          className={`list ${activeIndex === 0 ? "active" : ""}`}
          onClick={() => handleSetActive(0)}
        >
          <a href="#">
            <span className="icon"><FaHome/></span>
            <span className="text"></span>
          </a>
        </li>
        <li
          className={`list ${activeIndex === 1 ? "active" : ""}`}
          onClick={() => handleSetActive(1)}
        >
          <a href="#">
            <span className="icon"><FaBullhorn /></span>
            <span className="text"></span>
          </a>
        </li>
        <li
          className={`list ${activeIndex === 2 ? "active" : ""}`}
          onClick={() => handleSetActive(2)}
        >
          <a href="#">
            <span className="icon"><FaQrcode /></span>
            <span className="text"></span>
          </a>
        </li>
        <li
          className={`list ${activeIndex === 3 ? "active" : ""}`}
          onClick={() => handleSetActive(3)}
        >
          <a href="#">
            <span className="icon"><FaGift /></span>
            <span className="text"></span>
          </a>
        </li>
        <li
          className={`list ${activeIndex === 4 ? "active" : ""}`}
          onClick={() => handleSetActive(4)}
        >
          <a href="#">
            <span className="icon"><FaUserCircle /></span>
            <span className="text"></span>
          </a>
        </li>
        <div className="indicator" style={{ transform: `translateX(calc(70px * ${activeIndex}))` }}></div>
      </ul>
    </div>
  );
};

export default MagicMenuIndicator;
