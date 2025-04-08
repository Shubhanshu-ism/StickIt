import React from "react";
import { FaTrello } from "react-icons/fa"; // Using Trello icon as example logo

function Header({ resetBoard }) {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm p-3 flex-shrink-0 z-10 border-b border-gray-200">
      {" "}
      {/* Slight transparency + blur */}
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FaTrello className="text-xl text-blue-600" /> {/* Standard blue */}
          <h1 className="text-base font-bold text-gray-700 hidden sm:block">
            Trello Clone
          </h1>
        </div>
        <button
          onClick={resetBoard}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
          title="Reset Board"
        >
          Reset
        </button>
      </div>
    </header>
  );
}
export default Header;
