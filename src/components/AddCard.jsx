import React, { useState, useRef, useEffect } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";

function AddCard({ onAdd, onCancel }) {
  const [title, setTitle] = useState("");
  const textareaRef = useRef(null);
  const formRef = useRef(null);
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);
  useEffect(() => {
    function handleClickOutside(e) {
      if (formRef.current && !formRef.current.contains(e.target)) onCancel();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onCancel]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const t = title.trim();
    if (t) {
      onAdd(t);
      setTitle("");
      textareaRef.current?.focus();
    } else {
      textareaRef.current?.focus();
    }
  };
  const handleChange = (e) => setTitle(e.target.value);
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key === "Escape") onCancel();
  };

  return (
    <div ref={formRef} className="bg-transparent">
      {" "}
      {/* Transparent background */}
      <form onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          placeholder="Enter a title for this card..."
          className="w-full p-2 border-none rounded-md mb-1 resize-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow bg-white"
          value={title}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rows={3}
        />
        <div className="flex items-center justify-start mt-1">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-semibold shadow-sm flex items-center"
          >
            <PlusIcon className="h-4 w-4 mr-1" /> Add card
          </button>
          <button
            type="button"
            className="ml-2 text-gray-500 hover:text-gray-700 p-1.5"
            onClick={onCancel}
            title="Cancel"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddCard;
