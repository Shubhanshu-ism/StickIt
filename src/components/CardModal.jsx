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
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-start pt-16 md:pt-24 px-4"
      onClick={onClose}
    >
      {/* Modal content: Trello-like width, background, shadow */}
      <div
        ref={modalRef}
        className="bg-gray-100 rounded-lg shadow-xl w-full max-w-3xl p-5 md:p-6 relative flex flex-col md:flex-row md:space-x-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 z-10 bg-gray-200 hover:bg-gray-300 rounded-full p-1"
          title="Close (Esc)"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

        {/* Main Content Column */}
        <div className="flex-grow mb-6 md:mb-0">
          {/* Card Title */}
          <div className="mb-5 flex items-start space-x-3">
            <PencilIcon className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
            <div className="flex-grow">
              {isEditingTitle ? (
                <input
                  ref={titleInputRef}
                  type="text"
                  className="text-lg font-semibold w-full p-1 -ml-1 border border-blue-500 rounded focus:outline-none bg-white shadow-inner"
                  value={title}
                  onChange={handleTitleChange}
                  onBlur={handleFinishEditTitle}
                  onKeyDown={handleTitleKeyDown}
                />
              ) : (
                <h2
                  className="text-lg font-semibold cursor-pointer hover:bg-gray-200 p-1 -ml-1 rounded w-full break-words"
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
            <Bars3Icon className="h-5 w-5 text-gray-500 mt-1.5 flex-shrink-0" />
            <div className="flex-grow">
              <label
                htmlFor="card-description"
                className="text-sm font-semibold text-gray-700 mb-1 block"
              >
                {" "}
                Description{" "}
              </label>
              <textarea
                id="card-description"
                className="w-full p-2 border-gray-300 border rounded min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm bg-white focus:bg-white hover:bg-gray-50"
                placeholder="Add a more detailed description..."
                value={description}
                onChange={handleDescriptionChange}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="w-full md:w-48 flex-shrink-0 space-y-4">
          {/* Due Date */}
          <div>
            <label
              htmlFor="card-due-date"
              className="text-xs font-semibold text-gray-600 mb-1 uppercase flex items-center"
            >
              <CalendarIcon className="h-4 w-4 mr-1" /> Due Date
            </label>
            <input
              id="card-due-date"
              type="date"
              className="w-full p-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm bg-white"
              value={dueDate}
              onChange={handleDueDateChange}
            />
          </div>
          {/* Actions */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
              {" "}
              Actions{" "}
            </label>
            <div className="space-y-2">
              <button
                onClick={handleSaveChanges}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-medium shadow-sm transition duration-150 flex items-center justify-center"
              >
                <CheckIcon className="h-4 w-4 mr-1" /> Save
              </button>
              <button
                onClick={handleDeleteClick}
                className="w-full bg-gray-300 hover:bg-red-500 hover:text-white text-gray-700 px-3 py-1.5 rounded text-sm font-medium transition duration-150 flex items-center justify-center"
              >
                <TrashIcon className="h-4 w-4 mr-1" /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardModal;
