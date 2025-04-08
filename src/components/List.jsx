import React, { useState, useRef, useEffect } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import AddCard from "./AddCard";

const listTitleInputStyle =
  "font-medium text-sm bg-white rounded px-2 py-1 w-full"; // Reusable style

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

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditingTitle]);

  const handleAddCard = (cardTitle) => {
    onAddCard(list.id, cardTitle);
    setIsAddingCard(false);
  };

  const handleTitleChange = (e) => {
    setListTitle(e.target.value);
  };

  const handleTitleSave = () => {
    if (listTitle.trim()) {
      onRenameList(list.id, listTitle);
    } else {
      setListTitle(list.title); // Reset to original if empty
    }
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleTitleSave();
    } else if (e.key === "Escape") {
      setListTitle(list.title); // Reset to original
      setIsEditingTitle(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      // Confirmation
      onDeleteList(list.id);
    }
  };

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div
          className="trello-list"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="trello-list-header bg-trello-list-header">
            {isEditingTitle ? (
              <input
                ref={titleInputRef}
                type="text"
                className={listTitleInputStyle}
                value={listTitle}
                onChange={handleTitleChange}
                onBlur={handleTitleSave}
                onKeyDown={handleTitleKeyDown}
              />
            ) : (
              <h3
                className="trello-list-title cursor-pointer px-1 py-1 hover:bg-trello-gray-300 rounded"
                {...provided.dragHandleProps}
                onClick={() => setIsEditingTitle(true)}
              >
                {list.title}
              </h3>
            )}
            <div className="flex">
              <button className="text-gray-500 hover:bg-trello-gray-300 p-1 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
              <button
                className="text-gray-500 hover:text-red-600 p-1 rounded ml-1"
                onClick={handleDelete} // Use handleDelete
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <Droppable droppableId={list.id} type="card">
            {(provided, snapshot) => (
              <div
                className={`flex-grow overflow-y-auto min-h-[100px] p-1 ${
                  snapshot.isDraggingOver ? "bg-trello-gray-300" : ""
                }`}
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

          {isAddingCard ? (
            <AddCard
              onAdd={handleAddCard}
              onCancel={() => setIsAddingCard(false)}
            />
          ) : (
            <button
              className="mt-2 w-full text-left text-gray-600 hover:bg-trello-gray-300 rounded p-2 text-sm flex items-center"
              onClick={() => setIsAddingCard(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add a card
            </button>
          )}
        </div>
      )}
    </Draggable>
  );
}

export default List;
