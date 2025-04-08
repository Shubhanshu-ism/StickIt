import React, { useState, useEffect, useRef } from "react";

function CardModal({ card, onClose, onEdit, onDelete }) {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || "");
  const [dueDate, setDueDate] = useState(card.dueDate || "");
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const modalRef = useRef(null);
  const titleInputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditingTitle]);

  const handleSaveChanges = () => {
    onEdit({
      title: title.trim() ? title : card.title,
      description,
      dueDate: dueDate || null,
    });
    onClose();
  };

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleDueDateChange = (e) => setDueDate(e.target.value);

  const handleTitleSave = () => {
    if (title.trim()) {
      onEdit({ ...card, title });
    } else {
      setTitle(card.title);
    }
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") handleTitleSave();
    else if (e.key === "Escape") {
      setTitle(card.title);
      setIsEditingTitle(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-start mb-6">
          {isEditingTitle ? (
            <input
              ref={titleInputRef}
              type="text"
              className="text-xl font-semibold w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={title}
              onChange={handleTitleChange}
              onBlur={handleTitleSave}
              onKeyDown={handleTitleKeyDown}
            />
          ) : (
            <h2
              className="text-xl font-semibold cursor-pointer hover:bg-gray-100 p-2 rounded"
              onClick={() => setIsEditingTitle(true)}
            >
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
            title="Close"
          >
            ×
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            📅 Due Date
          </label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={dueDate}
            onChange={handleDueDateChange}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            📝 Description
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Add a more detailed description..."
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleSaveChanges}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            💾 Save
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardModal;
