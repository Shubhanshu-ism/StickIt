import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Board from "./components/Board";
import initialData from "./initialData";
import "./index.css";
import Footer from "./components/Footer";

const LOCAL_STORAGE_KEY = "trelloBoardLists-v4-final"; // Use a unique key

function App() {
  const [lists, setLists] = useState(() => {
    const savedLists = localStorage.getItem(LOCAL_STORAGE_KEY);
    try {
      // Start with initialData if nothing is saved or if parsing fails
      return savedLists ? JSON.parse(savedLists) : initialData;
    } catch (e) {
      console.error("Failed to parse lists from localStorage:", e);
      return initialData; // Fallback on error
    }
  });

  // Save to localStorage whenever lists change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lists));
    } catch (e) {
      console.error("Failed to save lists to localStorage:", e);
    }
  }, [lists]);

  // Reset board function
  const resetBoard = () => {
    if (window.confirm("Reset the board? All data will be lost.")) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setLists(initialData); // Reset state to default data
    }
  };

  return (
    // Main layout: Full height, flex column
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      {" "}
      {/* Use default gray */}
      <Header resetBoard={resetBoard} />
      {/* Board container takes remaining height, handles its own scrolling */}
      <div className="flex-grow overflow-y-hidden">
        <Board lists={lists} setLists={setLists} />
      </div>
      <Footer/>
    </div>
  );
}

export default App;
