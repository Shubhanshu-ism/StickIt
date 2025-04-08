import React from "react";
import { FaCog, FaStar, FaEllipsisV, FaShareAlt, FaBars } from "react-icons/fa"; // Assuming you want Font Awesome

function Header({ resetBoard }) {
  return (
    <header className="bg-white shadow-sm p-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-medium text-gray-700 mr-4">
            Personal Task Board
          </h1>
          <button
            className="p-1 text-gray-500 hover:bg-gray-100 rounded"
            title="Board Menu" // Tooltip
          >
            <FaBars />
          </button>
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
              <img
                src="/api/placeholder/32/32"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <button
            className="mr-2 p-2 text-gray-500 hover:bg-gray-100 rounded"
            title="Settings"
          >
            <FaCog />
          </button>
          <button
            className="mr-2 p-2 text-gray-500 hover:bg-gray-100 rounded"
            title="Star"
          >
            <FaStar />
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md transition-colors flex items-center"
            title="Share"
          >
            <span className="mr-1">Share</span>
            <FaShareAlt />
          </button>
          <button
            className="ml-2 p-2 text-gray-500 hover:bg-gray-100 rounded"
            onClick={resetBoard}
            title="More Options"
          >
            <FaEllipsisV />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
