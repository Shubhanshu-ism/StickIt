import React from "react";
import { FaTrello } from "react-icons/fa"; // Trello logo

function Header({ resetBoard, deleteBoard }) {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 p-3 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo + Title */}
        <div className="flex items-center gap-2">
          <FaTrello className="text-2xl text-blue-600" />
          <h1 className="text-lg font-semibold text-gray-800 hidden sm:block">
            StickIt
          </h1>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={resetBoard}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded text-sm font-medium transition-all"
            title="Reset Board"
          >
            Reset
          </button>
          <button
            onClick={deleteBoard}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded text-sm font-medium transition-all"
            title="Delete Board"
          >
            Delete
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
