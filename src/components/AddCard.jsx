import React, { useState, useRef, useEffect } from "react";

function AddCard({ onAdd, onCancel }) {
  const [title, setTitle] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current?.focus(); // Optional chaining for safety
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      onAdd(trimmedTitle);
      setTitle(""); // Clear after adding
      // Optionally keep focus or blur textareaRef.current?.blur();
    } else {
      textareaRef.current?.focus(); // Keep focus if empty
    }
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 px-1">
      {" "}
      {/* Added padding */}
      <textarea
        ref={textareaRef}
        placeholder="Enter a title for this card..."
        className="w-full p-2 border border-gray-300 rounded-md mb-2 resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-trello-blue text-sm" // Adjusted styling
        value={title}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows={3}
      />
      <div className="flex items-center">
        <button
          type="submit"
          className="bg-trello-blue hover:bg-trello-blue-light text-white px-4 py-1.5 rounded-md mr-2 text-sm font-medium" // Adjusted styling
        >
          Add Card
        </button>
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700 text-2xl leading-none" // Made bigger
          onClick={onCancel}
          title="Cancel"
        >
          ×
        </button>
      </div>
    </form>
  );
}

export default AddCard;
