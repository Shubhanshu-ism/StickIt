import React from "react";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Board from "./components/Board";
import Footer from "./components/Footer";

function App() {
  const [lists, setLists] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedLists = localStorage.getItem("trello-lists");
    if (savedLists) {
      setLists(JSON.parse(savedLists));
    } else {
      // Initialize with default lists if none exist
      setLists([
        {
          id: "list-1",
          title: "To Do - Today",
          cards: [
            {
              id: "card-1",
              title:
                "Create blitz board and write test instructions for project Ranier",
              description: "",
              dueDate: null,
            },
          ],
        },
        {
          id: "list-2",
          title: "This week",
          cards: [
            {
              id: "card-2",
              title: "Review designs for Project Everest",
              description: "",
              dueDate: null,
            },
            {
              id: "card-3",
              title: "Atlas update for Project Ranier",
              description: "",
              dueDate: "2023-06-20",
            },
            {
              id: "card-4",
              title: "APEX - Request Peer Feedback",
              description: "",
              dueDate: "2023-06-24",
            },
          ],
        },
        {
          id: "list-3",
          title: "Read later",
          cards: [
            {
              id: "card-5",
              title: "RFC: Card Back Suggested Actions | Join Button",
              description:
                "Jane is working on a ticket to publish a marketing blog for release.",
              dueDate: null,
            },
          ],
        },
      ]);
    }
  }, []);

  // Save to localStorage when lists change
  useEffect(() => {
    localStorage.setItem("trello-lists", JSON.stringify(lists));
  }, [lists]);

  // Reset board to initial state
  const resetBoard = () => {
    const confirmation = window.confirm(
      "Are you sure you want to reset the board? This will delete all lists and cards."
    );
    if (confirmation) {
      localStorage.removeItem("trello-lists");
      setLists([
        {
          id: "list-1",
          title: "To Do - Today",
          cards: [],
        },
        {
          id: "list-2",
          title: "This week",
          cards: [],
        },
        {
          id: "list-3",
          title: "Read later",
          cards: [],
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header resetBoard={resetBoard} />
      <main className="flex-grow overflow-hidden">
        <div className="board-container">
          <Board lists={lists} setLists={setLists} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
