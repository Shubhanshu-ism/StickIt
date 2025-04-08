import React, { useState, useEffect, useRef } from "react";

function CardModal({ card, onClose, onEdit, onDelete }) {
  // Initialize state directly from card prop
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || "");
  // Ensure dueDate is in 'YYYY-MM-DD' format for the input type="date"
  const [dueDate, setDueDate] = useState(
    card.dueDate ? new Date(card.dueDate).toISOString().split("T")[0] : ""
  );
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const modalRef = useRef(null);
  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null); // Ref for description

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Focus title input when editing starts
  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditingTitle]);

  // *** Consolidated Save Logic ***
  const handleSaveChanges = () => {
    const trimmedTitle = title.trim();
    // Only proceed if title is not empty
    if (!trimmedTitle) {
      alert("Card title cannot be empty."); // Or handle more gracefully
      titleInputRef.current?.focus();
      return;
    }
    onEdit({
      // Pass the updated fields using the current state
      ...card, // Keep existing card properties like id
      title: trimmedTitle,
      description: description.trim(), // Trim description too
      dueDate: dueDate || null, // Set to null if empty string
    });
    onClose(); // Close modal after saving
  };

  // Title Edit Handling (Inline within Modal)
  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleTitleBlur = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle && trimmedTitle !== card.title) {
      // Optionally save title immediately on blur, or wait for main Save button
      // For simplicity, we'll let the main "Save" button handle the final save.
      // You could call `onEdit({ ...card, title: trimmedTitle })` here if desired.
      setTitle(trimmedTitle); // Ensure state reflects trimmed title
    } else if (!trimmedTitle) {
      // Revert if title is cleared
      setTitle(card.title);
    }
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission if any
      handleTitleBlur(); // Treat Enter like Blur for saving the title edit
    } else if (e.key === "Escape") {
      setTitle(card.title); // Revert
      setIsEditingTitle(false);
    }
  };

  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleDueDateChange = (e) => setDueDate(e.target.value);

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      onDelete(); // Call onDelete passed from parent (Board -> List -> Card)
      // onClose(); // Deleting will close modal via parent state update anyway
    }
  };

  return (
    <div className="modal-backdrop">
      {" "}
      {/* Use defined class */}
      <div ref={modalRef} className="modal-content">
        {" "}
        {/* Use defined class */}
        {/* Close Button */}
        <button onClick={onClose} className="modal-close-button" title="Close">
          ×
        </button>
        {/* Card Title Section */}
        <div className="mb-6 pr-8">
          {" "}
          {/* Add padding-right to avoid overlap with close button */}
          <label className="block text-sm font-medium text-gray-400 mb-1">
            ✏️ Title
          </label>
          {isEditingTitle ? (
            <input
              ref={titleInputRef}
              type="text"
              className="text-xl font-semibold w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-trello-blue"
              value={title}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              onKeyDown={handleTitleKeyDown}
            />
          ) : (
            <h2
              className="text-xl font-semibold cursor-pointer hover:bg-gray-100 p-2 rounded -ml-2" // Make clickable area larger
              onClick={() => setIsEditingTitle(true)}
              title="Click to edit title"
            >
              {title} {/* Display current title state */}
            </h2>
          )}
        </div>
        {/* Due Date Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            📅 Due Date
          </label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-trello-blue text-sm"
            value={dueDate}
            onChange={handleDueDateChange}
          />
        </div>
        {/* Description Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            📝 Description
          </label>
          <textarea
            ref={descriptionInputRef}
            className="w-full p-2 border border-gray-300 rounded min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-trello-blue text-sm" // Allow vertical resize
            placeholder="Add a more detailed description..."
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleSaveChanges} // Use the consolidated save handler
            className="bg-trello-blue hover:bg-trello-blue-light text-white px-5 py-2 rounded-lg transition text-sm font-medium"
          >
            💾 Save Changes
          </button>
          <button
            onClick={handleDeleteClick} // Use the confirmation delete handler
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition text-sm font-medium"
          >
            🗑️ Delete Card
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardModal;
