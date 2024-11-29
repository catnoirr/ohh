"use client";
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { AiOutlineStock } from "react-icons/ai";

const MapLocation = () => {
  return (
    <div className="min-w-[18rem] w-[30%] bg-white rounded-lg flex  max-lg:flex-col justify-center items-center px-2 lg:h-full h-fit">
      {/* Header Section */}

      {/* Leaflet Map */}
      <div className="w-full rounded-lg overflow-hidden">
        <MapContainer
          center={[20, 0]} // Center the map on the world
          zoom={2}
          scrollWheelZoom={false}
          style={{ height: "200px" }} // Adjusted height
          className="w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapLocation;
