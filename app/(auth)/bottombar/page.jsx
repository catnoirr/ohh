"use client";
import React, { useState, useEffect } from "react";
import "./styles.css";
import "./dynamic.css";
import { auth } from "@/firebase"; // Assuming you have Firebase initialized in a file called firebase.js

import { useRouter, usePathname } from "next/navigation";
import {  onAuthStateChanged } from "firebase/auth";
import {
  FaHome,
  FaUser,
  FaFileAlt,
  FaQrcode,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import jsQR from "jsqr";

const MagicMenuIndicator = () => {


  const [activeClass, setActiveClass] = useState("default"); 
  const sections = [
    { id: "section1", className: "section1-style" },
    { id: "section2", className: "section2-style" },
    { id: "section3", className: "section3-style" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [scannerActive, setScannerActive] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    
     
    const authStatus = localStorage.getItem("authenticated") === "true";
    setIsAuthenticated(authStatus);

    const pathToIndexMap = {
      "/": 0,
      "/advertise": 1,
      "/scanner": 2,
      "/about": 3,
      "/sign-in": 4,
      "/sign-up": 4,
    };
    if (pathToIndexMap[pathname] !== undefined) {
      setActiveIndex(pathToIndexMap[pathname]);
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is already logged in, redirect to dashboard
        // toast.success("Already logged in...");
        router.push("/users"); // Adjust the route as per your application
      }
    });
    //minor ok
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;

      // Default class when no section is in view
      let updatedClass = "default";

      for (const section of sections) {
        const sectionElement = document.getElementById(section.id);

        if (sectionElement) {
          const { top, bottom } = sectionElement.getBoundingClientRect();

          // Check if any part of the section is in the viewport
          if (
            (top >= 0 && top < viewportHeight) || // Top part is in view
            (bottom > 0 && bottom <= viewportHeight) || // Bottom part is in view
            (top < 0 && bottom > viewportHeight) // Section spans the viewport
          ) {
            updatedClass = section.className;
            break;
          }
        }
      }

      // Update the active class only if it changes
      if (activeClass !== updatedClass) setActiveClass(updatedClass);
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Initial call to set the styles based on the starting position
    handleScroll();


    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };

    // Clean up subscription on unmount
     

  }, [pathname]  ,[router],[activeClass, sections]);

  const handleSetActive = (index, path) => {
    if (pathname !== path) {
      setActiveIndex(index);
      router.push(path);
    }
  };

  // const handleToggleSignIn = () => {
  //   if (isAuthenticated) {
  //     localStorage.setItem("authenticated", "false");
  //     setIsAuthenticated(false);
  //     setActiveIndex(0);
  //     router.push("/");
  //   } else {
  //     localStorage.setItem("authenticated", "true");
  //     setIsAuthenticated(true);
  //     handleSetActive(4, "/sign-up");
  //   }
  // };
  
  const startScanner = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Camera access is not supported in this browser.");
      return;
    }
  
    setScannerActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      const videoElement = document.createElement("video");
      videoElement.srcObject = stream;
      videoElement.setAttribute("playsinline", "true"); // Required for iOS
      videoElement.play();
  
      const canvasElement = document.createElement("canvas");
      const canvasContext = canvasElement.getContext("2d");
  
      document.body.appendChild(videoElement);
      document.body.appendChild(canvasElement);
  
      const scanCode = () => {
        if (!videoElement || !scannerActive) return;
  
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
        canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
  
        const imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
  
        if (code) {
          alert(`QR Code Detected: ${code.data}`);
          setScannerActive(false);
          stopScanner(videoElement, stream);
        } else {
          requestAnimationFrame(scanCode);
        }
      };
  
      scanCode();
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Unable to access the camera. Please check your permissions.");
    }
  };
  
  const stopScanner = (videoElement, stream) => {
    videoElement.pause();
    videoElement.srcObject = null;
    stream.getTracks().forEach((track) => track.stop());
    document.body.removeChild(videoElement);
  };
  

  const handleScannerClick = () => {
    setActiveIndex(2);
    startScanner();
  };

  return (
    <div className={`bottombar-container  ${activeClass}`} style={{ transition: 'background-color 0.3s ease' }}>
      <div className={`navigation mt-16  ${activeClass}`}>
        <ul>
          <li
            className={`list ${activeIndex === 0 ? "active" : ""}`}
            onClick={() => handleSetActive(0, "/")}
          >
            <a>
              <span className="icon">
                <FaHome />
              </span>
              <span className="text mt-4 ml-1">Home</span>
            </a>
          </li>
          <li
            className={`list ${activeIndex === 1 ? "active" : ""}`}
            onClick={() => handleSetActive(1, "/advertise")}
          >
            <a>
              <span className="icon">
                <FaFileAlt />
              </span>
              <span className="text mt-4 ml-1">Advertise</span>
            </a>
          </li>
          <li
            className={`list ${activeIndex === 2 ? "active" : ""}`}
            onClick={handleScannerClick}
          >
            <a>
              <span className="icon">
                <FaQrcode />
              </span>
              <span className="text mt-4 ml-1">Scanner</span>
            </a>
          </li>
          <li
            className={`list ${activeIndex === 3 ? "active" : ""}`}
            onClick={() => handleSetActive(3, "/about")}
          >
            <a>
              <span className="icon">
                <FaUser />
              </span>
              <span className="text mt-4 ml-1">About</span>
            </a>
          </li>
          <li
            className={`list ${activeIndex === 4 ? "active" : ""}`}
            onClick={() => handleSetActive(3, "/sign-up")}
            
          >
            <a>
              <span className="icon">
                 <FaSignInAlt />
              </span>
              <span className="text mt-4 ml-1">
                Sign-up
              </span>
            </a>
          </li>
          <div
             className={`indicator  ${activeClass}`}
            style={{ transform: `translateX(calc(70px * ${activeIndex}))` , transition: 'background-color 0.3s ease', }}
          ></div>
        </ul>
      </div>
    </div>
  );
};

export default MagicMenuIndicator;
