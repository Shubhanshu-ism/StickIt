import React, { useState, useRef, useEffect } from "react";

function AddList({ onAdd, onCancel }) {
  const [title, setTitle] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title);
      setTitle("");
    }
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter list title..."
        className="w-full p-2 border border-gray-300 rounded mb-2"
        value={title}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <div className="flex">
        <button
          type="submit"
          className="bg-trello-blue hover:bg-trello-blue-light text-white px-3 py-1 rounded mr-2"
        >
          Add List
        </button>
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700"
          onClick={onCancel}
        >
          &times;
        </button>
      </div>
    </form>
  );
}

export default AddList;
