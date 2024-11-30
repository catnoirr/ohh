import React from 'react';

const Notifications = ({ onClose }) => {
  const notifications = [
    { id: 1, message: "New campaign added!", time: "2 min ago" },
    { id: 2, message: "Your order has been shipped.", time: "1 hr ago" },
    { id: 3, message: "You have a new message.", time: "3 hrs ago" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 bottom-[6.5rem] bg-black bg-opacity-50 z-50 flex flex-col max-w-lg mx-auto">
      {/* Header */}
      <div className="bg-white py-4 px-6 flex items-center justify-between shadow-md relative">
        <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
        {/* Close Button - Right Aligned */}
        <button
          className="absolute top-4 right-6 text-sm text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          Close ✖
        </button>
      </div>

      {/* Notification List */}
      <div className="flex-1 bg-white overflow-y-auto">
        {notifications.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <li key={notification.id} className="px-6 py-4 hover:bg-gray-100">
                <p className="text-sm font-medium text-gray-800">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </li>
            ))}
          </ul>
        ) : (
          // No Notifications
          <div className="flex items-center justify-center h-full text-gray-500">
            No new notifications
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
