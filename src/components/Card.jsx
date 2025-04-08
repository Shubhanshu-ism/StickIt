import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import CardModal from "./CardModal";
import {
  CalendarIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/20/solid";

function Card({ card, index, listId, onEdit, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleEditCard = (updatedCardData) => {
    onEdit(listId, card.id, updatedCardData);
  };
  const handleDeleteCard = () => {
    onDelete(listId, card.id);
    closeModal();
  };

  const formattedDueDate = card.dueDate
    ? new Date(card.dueDate + "T00:00:00").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : null;
  const hasDescription = card.description && card.description.trim().length > 0;

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided, snapshot) => (
          // Apply card styles directly
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`bg-white rounded-md shadow-card p-2.5 mb-2 cursor-pointer hover:shadow-md hover:border-gray-300 border border-transparent transition-all duration-150 flex flex-col ${
              snapshot.isDragging ? "ring-2 ring-blue-500 shadow-lg" : ""
            }`}
            onClick={openModal}
            style={{ ...provided.draggableProps.style }}
          >
            <div className="text-sm font-medium text-gray-900 mb-1">
              {card.title}
            </div>
            <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs text-gray-600">
              {formattedDueDate && (
                <div className="flex items-center bg-gray-100 px-1.5 py-0.5 rounded">
                  <CalendarIcon className="h-3.5 w-3.5 mr-1 text-gray-500" />
                  <span>{formattedDueDate}</span>
                </div>
              )}
              {hasDescription && (
                <div
                  className="flex items-center px-1 py-0.5 rounded"
                  title="This card has a description"
                >
                  <ChatBubbleLeftEllipsisIcon className="h-3.5 w-3.5 text-gray-500" />
                </div>
              )}
            </div>
          </div>
        )}
      </Draggable>
      {isModalOpen && (
        <CardModal
          card={card}
          onClose={closeModal}
          onEdit={handleEditCard}
          onDelete={handleDeleteCard}
        />
      )}
    </>
  );
}
export default Card;
