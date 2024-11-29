"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Qr = () => {
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { id } = params;

  const fetchQr = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/getQr`);
      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }
      const qrData = await res.json();
      const data = qrData.find((qr) => qr.qid === id);
      console.log(data);
      fetchIp(data);
      if (!data) {
        console.error("QR not found");
        return;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchIp = async (qr) => {
    try {
      // Fetch the IP address
      const res = await fetch("https://api.ipify.org?format=json");
      if (!res.ok) throw new Error("Failed to fetch IP address.");

      const data = await res.json();
      const ipAdd = data.ip;

      // Prepare the IP address entry
      const ipEntry = {
        createdAt: new Date().toISOString(),
        ip: ipAdd,
        hour: new Date().getHours(),
      };

      qr.totalScans.push(ipEntry);
      if (qr.uniqueScans.filter((ip) => ip.ip === ipAdd).length === 0) {
        qr.uniqueScans.push(ipEntry);
      }

      const response = await fetch("/api/updateQr", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qid: qr.qid, ...qr }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || "Failed to update campaign.");
      }

      console.log("QR updated successfully.");
      setLoading(false);
      window.location.href = qr.link;
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchQr();
  }, [id]);

  return (
    <div className="h-screen w-screen z-[1000] bg-white flex items-center justify-center">
      {loading && (
        <div className=" flex flex-col gap-6 justify-center items-center">
          <div className="loader w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 mt-4">Redirecting you to the link...</p>
        </div>
      )}
    </div>
  );
};

export default Qr;
