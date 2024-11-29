"use client";

import React from "react";

export default function CameraPermissionModal({ isVisible, onClose }) {
  if (!isVisible) return null; // Return null if the modal is not visible

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[20rem] text-center shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Camera Permission Needed</h2>
        <p className="mb-4">
          Please enable camera permissions in your device settings to use the QR scanner.
        </p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-purple-600 text-white rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
}
