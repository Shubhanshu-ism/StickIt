import React, { useState, useEffect, useRef } from "react";
import {
  XMarkIcon,
  CalendarIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
  Bars3Icon,
} from "@heroicons/react/20/solid";

function CardModal({ card, onClose, onEdit, onDelete }) {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || "");
  const [dueDate, setDueDate] = useState(
    card.dueDate
      ? new Date(card.dueDate + "T00:00:00").toISOString().split("T")[0]
      : ""
  );
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const modalRef = useRef(null);
  const titleInputRef = useRef(null);

  // Effects for Escape key, outside click, and title focus remain the same
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);
  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditingTitle]);
  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Handlers remain the same
  const handleSaveChanges = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      alert("Card title cannot be empty.");
      titleInputRef.current?.focus();
      return;
    }
    onEdit({
      ...card,
      title: trimmedTitle,
      description: description.trim(),
      dueDate: dueDate || null,
    });
    onClose();
  };
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleStartEditTitle = () => setIsEditingTitle(true);
  const handleFinishEditTitle = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle && trimmedTitle !== card.title) setTitle(trimmedTitle);
    else if (!trimmedTitle) setTitle(card.title);
    setIsEditingTitle(false);
  };
  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleFinishEditTitle();
    } else if (e.key === "Escape") {
      setTitle(card.title);
      setIsEditingTitle(false);
    }
  };
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleDueDateChange = (e) => setDueDate(e.target.value);
  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this card?"))
      onDelete();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative flex space-x-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10"
          title="Close (Esc)"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        {/* Main Content */}
        <div className="flex-grow">
          {/* Title */}
          <div className="mb-5 flex items-start space-x-3">
            <PencilIcon className="h-5 w-5 text-gray-400 mt-1.5 flex-shrink-0" />
            <div className="flex-grow">
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                {" "}
                Title{" "}
              </label>
              {isEditingTitle ? (
                <input
                  ref={titleInputRef}
                  type="text"
                  className="text-lg font-semibold w-full p-1 -ml-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={title}
                  onChange={handleTitleChange}
                  onBlur={handleFinishEditTitle}
                  onKeyDown={handleTitleKeyDown}
                />
              ) : (
                <h2
                  className="text-lg font-semibold cursor-pointer hover:bg-gray-100 p-1 -ml-1 rounded"
                  onClick={handleStartEditTitle}
                  title="Click to edit title"
                >
                  {title}
                </h2>
              )}
            </div>
          </div>
          {/* Description */}
          <div className="mb-6 flex items-start space-x-3">
            <Bars3Icon className="h-5 w-5 text-gray-400 mt-1.5 flex-shrink-0" />
            <div className="flex-grow">
              <label
                htmlFor="card-description"
                className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide"
              >
                {" "}
                Description{" "}
              </label>
              <textarea
                id="card-description"
                className="w-full p-2 border border-gray-300 rounded min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
                placeholder="Add a more detailed description..."
                value={description}
                onChange={handleDescriptionChange}
              ></textarea>
            </div>
          </div>
        </div>
        {/* Sidebar */}
        <div className="w-48 flex-shrink-0 space-y-4">
          {/* Due Date */}
          <div>
            <label
              htmlFor="card-due-date"
              className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide flex items-center"
            >
              <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" /> Due Date
            </label>
            <input
              id="card-due-date"
              type="date"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
              value={dueDate}
              onChange={handleDueDateChange}
            />
          </div>
          {/* Actions */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
              {" "}
              Actions{" "}
            </label>
            <div className="space-y-2">
              <button
                onClick={handleSaveChanges}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-sm transition duration-150 flex items-center justify-center"
              >
                <CheckIcon className="h-4 w-4 mr-1" /> Save Changes
              </button>
              <button
                onClick={handleDeleteClick}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-sm transition duration-150 flex items-center justify-center"
              >
                <TrashIcon className="h-4 w-4 mr-1" /> Delete Card
              </button>
              <button
                onClick={onClose}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition duration-150 flex items-center justify-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardModal;
