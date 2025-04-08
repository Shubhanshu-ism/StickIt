import React, { useState, useRef, useEffect } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import AddCard from "./AddCard";
import {
  EllipsisHorizontalIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";

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
  const [showListActions, setShowListActions] = useState(false);
  const listActionsRef = useRef(null);

  // Effects for focusing input and handling outside clicks remain the same
  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) titleInputRef.current.focus();
  }, [isEditingTitle]);
  useEffect(() => {
    function handleClickOutside(event) {
      // Check if the click target is the ellipsis button itself
      if (
        listActionsRef.current?.contains(event.target) &&
        event.target.closest("button")?.dataset?.action === "toggle-list-menu"
      ) {
        return; // Don't close if clicking the toggle button
      }
      // Check if the click is outside the menu dropdown
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

  // Internal handlers remain the same
  const handleAddCardInternal = (cardTitle) => {
    onAddCard(list.id, cardTitle);
    setIsAddingCard(false);
  };
  const handleTitleChange = (e) => setListTitle(e.target.value);
  const handleTitleSave = () => {
    const trimmedTitle = listTitle.trim();
    if (trimmedTitle && trimmedTitle !== list.title)
      onRenameList(list.id, trimmedTitle);
    else setListTitle(list.title);
    setIsEditingTitle(false);
  };
  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") handleTitleSave();
    else if (e.key === "Escape") {
      setListTitle(list.title);
      setIsEditingTitle(false);
    }
  };
  const handleDeleteListClick = () => {
    if (window.confirm(`Delete list "${list.title}"?`)) onDeleteList(list.id);
    setShowListActions(false);
  };

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided, snapshot) => (
        // List container styling - Column layout, fixed width, Trello-like background
        <div
          className={`bg-gray-200 rounded-lg shadow w-72 flex-shrink-0 flex flex-col max-h-full ${
            snapshot.isDragging ? "ring-2 ring-blue-500 ring-offset-2" : ""
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{ ...provided.draggableProps.style }}
        >
          {/* List Header - Padding, flex, cursor for dragging */}
          <div
            className="p-2 px-3 font-semibold text-gray-700 flex justify-between items-center border-b border-gray-300 cursor-grab"
            {...provided.dragHandleProps}
          >
            {isEditingTitle ? (
              // Title input styling
              <input
                ref={titleInputRef}
                type="text"
                className="font-semibold text-gray-700 border border-blue-500 rounded px-1.5 py-0.5 w-full focus:outline-none bg-white shadow-inner flex-grow mr-2 text-sm"
                value={listTitle}
                onChange={handleTitleChange}
                onBlur={handleTitleSave}
                onKeyDown={handleTitleKeyDown}
              />
            ) : (
              // Title display styling
              <h3
                className="text-sm font-medium flex-grow mr-2 cursor-pointer px-1 py-0.5 hover:bg-gray-300 rounded"
                onClick={() => setIsEditingTitle(true)}
                title="Click to edit list title"
              >
                {list.title}
              </h3>
            )}
            {/* List Actions Menu */}
            <div className="relative flex-shrink-0" ref={listActionsRef}>
              <button
                className="text-gray-500 hover:bg-gray-300 hover:text-gray-800 p-1 rounded"
                onClick={() => setShowListActions(!showListActions)}
                title="List actions"
                data-action="toggle-list-menu"
              >
                <EllipsisHorizontalIcon className="h-5 w-5" />
              </button>
              {showListActions && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-xl border border-gray-200 z-20 py-1">
                  <p className="text-xs text-gray-500 text-center font-normal py-1 border-b mb-1">
                    List Actions
                  </p>
                  <button
                    onClick={handleDeleteListClick}
                    className="block w-full text-left px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <TrashIcon className="h-4 w-4 mr-2" /> Delete This List
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Cards Container - Handles vertical scrolling */}
          <Droppable droppableId={list.id} type="card">
            {(provided, snapshot) => (
              <div
                // Padding, overflow for scroll, min-height, drop zone highlight
                className={`px-2 pt-2 pb-1 overflow-y-auto flex-grow min-h-[60px] ${
                  snapshot.isDraggingOver ? "bg-gray-300/70" : ""
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
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Add Card Area */}
          <div className="mt-auto px-2 pt-1 pb-2 flex-shrink-0">
            {isAddingCard ? (
              <AddCard
                onAdd={handleAddCardInternal}
                onCancel={() => setIsAddingCard(false)}
              />
            ) : (
              <button
                className="w-full text-left text-gray-500 hover:bg-gray-300/80 rounded p-2 text-sm flex items-center transition-colors hover:text-gray-700"
                onClick={() => setIsAddingCard(true)}
              >
                <PlusIcon className="h-4 w-4 mr-1.5" />
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
