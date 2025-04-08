import React from "react";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Board from "./components/Board";
import Footer from "./components/Footer";

// Initial state for a new/reset board
const initialEmptyState = [];

// Example state for first load (optional)
const exampleState = [
  {
    id: "list-1",
    title: "To Do",
    cards: [
      {
        id: "card-1",
        title: "Learn React DnD",
        description: "Focus on DragDropContext, Droppable, Draggable",
        dueDate: null,
      },
      {
        id: "card-2",
        title: "Style the Board",
        description: "Use Tailwind CSS",
        dueDate: "2024-08-15",
      },
    ],
  },
  {
    id: "list-2",
    title: "In Progress",
    cards: [
      {
        id: "card-3",
        title: "Implement Card Modal",
        description: "Add edit/delete functionality",
        dueDate: null,
      },
    ],
  },
  {
    id: "list-3",
    title: "Done",
    cards: [
      {
        id: "card-4",
        title: "Setup Project Structure",
        description: "",
        dueDate: "2024-08-01",
      },
    ],
  },
];

const LOCAL_STORAGE_KEY = "trello-clone-lists";

function App() {
  const [lists, setLists] = useState(() => {
    // Load from localStorage immediately
    const savedLists = localStorage.getItem(LOCAL_STORAGE_KEY);
    try {
      return savedLists ? JSON.parse(savedLists) : exampleState; // Start with example data if no save exists
      // Or use initialEmptyState if you want a blank board initially:
      // return savedLists ? JSON.parse(savedLists) : initialEmptyState;
    } catch (e) {
      console.error("Failed to parse lists from localStorage", e);
      return exampleState; // Fallback to example on error
    }
  });

  // Save to localStorage whenever lists change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lists));
  }, [lists]);

  // Reset board function
  const resetBoard = () => {
    const confirmation = window.confirm(
      "Are you sure you want to reset the board? This will delete all lists and cards."
    );
    if (confirmation) {
      localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear storage
      setLists(initialEmptyState); // Set state to empty
    }
  };

  return (
    // Main flex container for header, board, footer layout
    <div className="flex flex-col h-screen bg-trello-gray-100">
      <Header resetBoard={resetBoard} />
      {/* Main content area that grows and allows board scrolling */}
      <main className="flex-grow overflow-hidden">
        {" "}
        {/* Prevent double scrollbars */}
        <div className="board-container h-full w-full">
          {" "}
          {/* Container for background and full height */}
          <Board lists={lists} setLists={setLists} />
        </div>
      </main>
      {/* Footer is optional, remove if not needed */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
