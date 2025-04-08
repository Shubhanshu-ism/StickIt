import React, { useState, useRef, useEffect } from "react";

function AddCard({ onAdd, onCancel }) {
  const [title, setTitle] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
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
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <textarea
        ref={textareaRef}
        placeholder="Enter a title for this card..."
        className="w-full p-2 border border-gray-300 rounded mb-2 resize-none"
        value={title}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows={3}
      />
      <div className="flex">
        <button
          type="submit"
          className="bg-trello-blue hover:bg-trello-blue-light text-white px-3 py-1 rounded mr-2"
        >
          Add Card
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

export default AddCard;
