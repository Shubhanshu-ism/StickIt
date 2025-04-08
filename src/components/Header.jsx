import React from "react";
import { FaTrello } from "react-icons/fa"; // Using Trello icon as example logo

function Header({ resetBoard }) {
  return (
    <header className="bg-white shadow-md p-3 sticky top-0 z-10">
      {" "}
      {/* Added sticky & z-index */}
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side: Logo/Title */}
        <div className="flex items-center space-x-3">
          <FaTrello className="text-2xl text-trello-blue" />
          <h1 className="text-lg font-bold text-gray-700 hidden sm:block">
            {" "}
            {/* Hide on small screens */}
            My Trello Board
          </h1>
        </div>

        {/* Right Side: Reset Button */}
        <div className="flex items-center">
          <button
            onClick={resetBoard}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
            title="Reset Board"
          >
            Reset Board
          </button>
          {/* Add other header elements here if needed */}
        </div>
      </div>
    </header>
  );
}

export default Header;
