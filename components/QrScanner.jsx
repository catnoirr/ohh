import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { IoMdQrScanner } from 'react-icons/io';

const QrScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [qrScanner, setQrScanner] = useState(null);
  const redirectFlag = useRef(false);

  useEffect(() => {
    if (isScanning && !qrScanner) {
      const scannerInstance = new Html5Qrcode("qr-reader");

      scannerInstance
        .start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
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
        });
    }

    return () => {
      if (qrScanner) {
        qrScanner.stop().then(() => {
          qrScanner.clear();
        });
      }
    };
  }, [isScanning, qrScanner]);

  const startScanning = () => {
    setIsScanning(true);
  };

  const stopScanning = (decodedText) => {
    if (qrScanner) {
      qrScanner.stop().then(() => {
        qrScanner.clear();
        setQrScanner(null);
      });
    }
    setIsScanning(false);

    console.log(decodedText)
    console.log(redirectFlag.current)
    if (!redirectFlag.current && typeof decodedText === 'string') {
      redirectFlag.current = true; 
      window.location.href = `${decodedText}-ooh`;
    }
  };

  return (
    <div className='bg-white'>
      {isScanning && (
        <div
          id="qr-reader"
          className='fixed top-[0] w-full h-[calc(100vh-7rem)] bg-white'
        ></div>
      )}

        <button onClick={isScanning ? stopScanning : startScanning}>
          <IoMdQrScanner className="text-[#B77DC4] h-8 w-8" />
        </button>
    </div>
  );
};

export default QrScanner;
