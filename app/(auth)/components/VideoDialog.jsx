import React from "react";

function VideoOrientationDialog({ onSelect, isOpen, onClose }) {
  if (!isOpen) return null; // Only render when dialog is open

  const handleOrientationSelection = (orientation) => {
    onSelect(orientation); // Call the parent function with selected orientation
    onClose(); // Close the dialog
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Choose Video Orientation
        </h2>
        <p className="text-gray-600 mb-6">
          How would you like to play the video?
        </p>
        <div className="flex justify-between">
          <button
            onClick={() => handleOrientationSelection("vertical")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Vertical
          </button>
          <button
            onClick={() => handleOrientationSelection("horizontal")}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Horizontal
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoOrientationDialog;
