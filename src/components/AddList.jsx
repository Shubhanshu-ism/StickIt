import React, { useState, useRef, useEffect } from "react";

function AddList({ onAdd, onCancel }) {
  const [title, setTitle] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      onAdd(trimmedTitle);
      setTitle(""); // Clear after adding
      // No need to keep focus usually after adding a list
    } else {
      inputRef.current?.focus(); // Keep focus if empty
    }
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onCancel();
    }
    // Allow Enter to submit via the form's onSubmit
  };

  // Use onBlur to cancel if input loses focus and is empty
  const handleBlur = () => {
    if (!title.trim()) {
      // onCancel(); // Option: Cancel if blurred and empty
    }
  };

  return (
    // Add padding and bg to match the Add List button placeholder
    <form
      onSubmit={handleSubmit}
      className="bg-trello-gray-200 p-2 rounded-lg shadow-sm w-72 flex-shrink-0"
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter list title..."
        className="w-full p-2 border border-gray-300 rounded-md mb-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-trello-blue text-sm" // Adjusted styling
        value={title}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur} // Add blur handler
      />
      <div className="flex items-center">
        <button
          type="submit"
          className="bg-trello-blue hover:bg-trello-blue-light text-white px-4 py-1.5 rounded-md mr-2 text-sm font-medium" // Adjusted styling
        >
          Add List
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

export default AddList;
