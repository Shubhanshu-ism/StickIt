import React, { useState, useRef, useEffect } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";

function AddList({ onAdd, onCancel }) {
  const [title, setTitle] = useState("");
  const inputRef = useRef(null);
  const formRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
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
    if (t) onAdd(t);
    else inputRef.current?.focus();
  };
  const handleChange = (e) => setTitle(e.target.value);
  const handleKeyDown = (e) => {
    if (e.key === "Escape") onCancel();
  };

  return (
    <div
      ref={formRef}
      className="rounded-md bg-white p-2 w-72 flex-shrink-0 shadow-md"
    >
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter list title..."
          className="w-full p-2 border border-gray-400 rounded-md mb-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-inner"
          value={title}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <div className="flex items-center justify-start">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-semibold shadow-sm flex items-center"
          >
            <PlusIcon className="h-4 w-4 mr-1" /> Add List
          </button>
          <button
            type="button"
            className="ml-2 text-gray-500 hover:text-gray-700 p-1"
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
export default AddList;
