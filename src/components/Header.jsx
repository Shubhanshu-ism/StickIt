import React from "react";
import { FaTrello } from "react-icons/fa"; // Using Trello icon as example logo

function Header({ resetBoard }) {
  return (
    // Apply styles directly
    <header className="bg-white shadow-md p-3 flex-shrink-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <FaTrello className="text-2xl text-trello-blue" />
          <h1 className="text-lg font-bold text-gray-700 hidden sm:block">
            My Trello Board
          </h1>
        </div>
        <div className="flex items-center">
          <button
            onClick={resetBoard}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
            title="Reset Board"
          >
            Reset Board
          </button>
        </div>
      </div>
    </header>
  );
}
export default Header;
