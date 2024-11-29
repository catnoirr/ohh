"use client";

import { FaBullhorn, FaGift, FaRegUser } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Html5Qrcode } from "html5-qrcode";
import { IoMdQrScanner } from "react-icons/io";
import CameraPermissionModal from "./CameraPermissionModal";

export default function BottomNavBar() {
  const [isScanning, setIsScanning] = useState(false);
  const [qrScanner, setQrScanner] = useState(null);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const redirectFlag = useRef(false);
  const router = useRouter();

  // Active tab state
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    if (isScanning && !qrScanner) {
      const scannerInstance = new Html5Qrcode("qr-reader");

      scannerInstance
        .start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            if (!redirectFlag.current) {
              console.log(decodedText);
              stopScanning(decodedText);
            }
          },
          (error) => {
            console.warn("QR Code scan error:", error);
          }
        )
        .then(() => {
          setQrScanner(scannerInstance);
        })
        .catch((err) => {
          console.error("Unable to start scanning", err);
          setShowPermissionModal(true);
        });
    }

    return () => {
      if (qrScanner) {
        qrScanner.stop().then(() => qrScanner.clear());
      }
    };
  }, [isScanning, qrScanner]);

  const startScanning = () => {
    setIsScanning(true);
    setActiveTabIndex(2); // Set "Scan" as the active tab
  };

  const stopScanning = (decodedText) => {
    if (qrScanner) {
      qrScanner.stop().then(() => {
        qrScanner.clear();
        setQrScanner(null);
      });
    }
    setIsScanning(false);

    if (!redirectFlag.current && typeof decodedText === "string") {
      redirectFlag.current = true;
      window.location.href = `${decodedText}-ooh`;
    }
  };

  const handleNavigation = (index, path) => {
    if (isScanning) stopScanning();
    setActiveTabIndex(index); // Set active tab index
    if (path) router.push(path); // Navigate if a path is provided
  };

  return (
    <div className="bottom-bar">
      <div className="container">
        <div className="navigation mt-16">
          <ul>
            <li
              className={`list ${activeTabIndex === 0 ? "active" : ""}`}
              onClick={() => handleNavigation(0, "/")}
            >
              <a>
                <span className="icon">
                  <GoHome />
                </span>
                <span className="text mt-4 ml-1">Home</span>
              </a>
            </li>
            <li
              className={`list ${activeTabIndex === 1 ? "active" : ""}`}
              onClick={() => handleNavigation(1, "/campaigns")}
            >
              <a>
                <span className="icon">
                  <FaBullhorn />
                </span>
                <span className="text mt-4 ml-1">Campaign</span>
              </a>
            </li>
            <li
              className={`list ${activeTabIndex === 2 ? "active" : ""}`}
              onClick={() => {
                if (isScanning) {
                  stopScanning();
                } else {
                  startScanning();
                }
              }}
            >
              <a>
                <span className="icon">
                  <IoMdQrScanner />
                </span>
                <span className="text mt-4 ml-1">Scan</span>
              </a>
            </li>
            <li
              className={`list ${activeTabIndex === 3 ? "active" : ""}`}
              onClick={() => handleNavigation(3, "/coupons")}
            >
              <a>
                <span className="icon">
                  <FaGift />
                </span>
                <span className="text mt-4 ml-1">Coupons</span>
              </a>
            </li>
            <li
              className={`list ${activeTabIndex === 4 ? "active" : ""}`}
              onClick={() => handleNavigation(4, "/profile")}
            >
              <a>
                <span className="icon">
                  <FaRegUser />
                </span>
                <span className="text mt-4 ml-1">Profile</span>
              </a>
            </li>
            <div
              className="indicator"
              style={{
                transform: `translateX(calc(70px * ${activeTabIndex}))`,
                transition: "transform 0.3s ease",
              }}
            ></div>
          </ul>
        </div>
      </div>

      {/* QR Scanner */}
      {isScanning && (
        <div id="qr-reader" className="fixed top-[0] w-full h-[90vh]"></div>
      )}

      {/* Camera Permission Modal */}
      <CameraPermissionModal
        isVisible={showPermissionModal}
        onClose={() => setShowPermissionModal(false)}
      />
    </div>
  );
}
