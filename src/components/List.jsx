import React, { useState, useRef, useEffect } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import AddCard from "./AddCard";
import { FaEllipsisH, FaTrashAlt, FaPlus } from "react-icons/fa"; // Import icons

function List({
  list,
  index,
  onAddCard,
  onEditCard,
  onDeleteCard,
  onDeleteList,
  onRenameList,
}) {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [listTitle, setListTitle] = useState(list.title);
  const titleInputRef = useRef(null);
  const [showListActions, setShowListActions] = useState(false); // State for list actions menu
  const listActionsRef = useRef(null); // Ref for actions menu

  // Focus input when editing title
  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditingTitle]);

  // Close list actions menu if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        listActionsRef.current &&
        !listActionsRef.current.contains(event.target)
      ) {
        setShowListActions(false);
      }
    }
    if (showListActions) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showListActions]);

  const handleAddCardInternal = (cardTitle) => {
    onAddCard(list.id, cardTitle);
    setIsAddingCard(false);
  };

  const handleTitleChange = (e) => {
    setListTitle(e.target.value);
  };

  const handleTitleSave = () => {
    const trimmedTitle = listTitle.trim();
    if (trimmedTitle && trimmedTitle !== list.title) {
      onRenameList(list.id, trimmedTitle);
    } else {
      setListTitle(list.title); // Reset to original if empty or unchanged
    }
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleTitleSave();
    } else if (e.key === "Escape") {
      setListTitle(list.title); // Reset to original
      setIsEditingTitle(false);
    }
  };

  const handleDeleteListClick = () => {
    if (
      window.confirm(
        `Are you sure you want to delete the list "${list.title}" and all its cards?`
      )
    ) {
      onDeleteList(list.id);
    }
    setShowListActions(false); // Close menu after action
  };

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`trello-list ${snapshot.isDragging ? "shadow-lg" : ""}`} // Use defined class
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{ ...provided.draggableProps.style }} // Apply dnd styles
        >
          {/* List Header */}
          <div className="trello-list-header" {...provided.dragHandleProps}>
            {" "}
            {/* Drag handle on header */}
            {isEditingTitle ? (
              <input
                ref={titleInputRef}
                type="text"
                className="list-title-input" // Use defined class
                value={listTitle}
                onChange={handleTitleChange}
                onBlur={handleTitleSave}
                onKeyDown={handleTitleKeyDown}
              />
            ) : (
              <h3
                className="trello-list-title cursor-pointer px-1 py-0.5 hover:bg-trello-gray-300 rounded" // Make title clickable
                onClick={() => setIsEditingTitle(true)}
                title="Click to edit list title"
              >
                {list.title} {/* Display original title until saved */}
              </h3>
            )}
            {/* List Actions Button */}
            <div className="relative flex-shrink-0" ref={listActionsRef}>
              <button
                className="text-gray-500 hover:bg-trello-gray-300 hover:text-gray-700 p-1.5 rounded"
                onClick={() => setShowListActions(!showListActions)}
                title="List actions"
              >
                <FaEllipsisH />
              </button>
              {/* Actions Menu */}
              {showListActions && (
                <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-20 py-1">
                  <button
                    onClick={handleDeleteListClick}
                    className="block w-full text-left px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
                  >
                    <FaTrashAlt className="inline mr-2" /> Delete List
                  </button>
                  {/* Add other list actions here (e.g., Copy List) */}
                </div>
              )}
            </div>
          </div>

          {/* Cards Container - Droppable */}
          <Droppable droppableId={list.id} type="card">
            {(provided, snapshot) => (
              <div
                className={`list-cards-container ${
                  // Use defined class
                  snapshot.isDraggingOver
                    ? "bg-trello-gray-300 bg-opacity-50"
                    : "" // Highlight drop zone
                } transition-colors duration-150 ease-in-out`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {list.cards.map((card, cardIndex) => (
                  <Card
                    key={card.id}
                    card={card}
                    index={cardIndex}
                    listId={list.id}
                    onEdit={onEditCard}
                    onDelete={onDeleteCard}
                  />
                ))}
                {provided.placeholder} {/* Placeholder for dragging */}
              </div>
            )}
          </Droppable>

          {/* Add Card Area */}
          <div className="mt-auto pt-2 flex-shrink-0">
            {" "}
            {/* Push to bottom */}
            {isAddingCard ? (
              <AddCard
                onAdd={handleAddCardInternal}
                onCancel={() => setIsAddingCard(false)}
              />
            ) : (
              <button
                className="w-full text-left text-gray-600 hover:bg-trello-gray-300 rounded p-2 text-sm flex items-center transition-colors"
                onClick={() => setIsAddingCard(true)}
              >
                <FaPlus className="h-4 w-4 mr-2" />
                Add a card
              </button>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default List;
