import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Board from "./components/Board";
// import Footer from './components/Footer'; // Uncomment if using Footer
import initialData from "./initialData";
import "./index.css"; // Import main CSS

const LOCAL_STORAGE_KEY = "trelloBoardLists-v4"; // Use a unique key

function App() {
  const [lists, setLists] = useState(() => {
    const savedLists = localStorage.getItem(LOCAL_STORAGE_KEY);
    try {
      return savedLists ? JSON.parse(savedLists) : initialData;
    } catch (e) {
      console.error("Failed to parse lists from localStorage:", e);
      return initialData;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lists));
    } catch (e) {
      console.error("Failed to save lists to localStorage:", e);
    }
  }, [lists]);

  const resetBoard = () => {
    if (window.confirm("Are you sure you want to reset the entire board?")) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setLists(initialData); // Reset state (or use [] for truly empty)
    }
  };

  return (
    <div className="flex flex-col h-screen bg-trello-blue-lightest overflow-hidden">
      <Header resetBoard={resetBoard} />
      {/* flex-grow allows board to take remaining space, overflow-y-hidden prevents App scroll */}
      <div className="flex-grow overflow-y-hidden">
        <Board lists={lists} setLists={setLists} />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
