import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import CardModal from "./CardModal";

function Card({ card, index, listId, onEdit, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleEditCard = (updatedCard) => {
    onEdit(listId, card.id, updatedCard);
  };

  const handleDeleteCard = () => {
    onDelete(listId, card.id);
    closeModal();
  };

  const formattedDueDate = card.dueDate
    ? new Date(card.dueDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`bg-white rounded-xl shadow-sm p-4 mb-3 border border-gray-200 hover:bg-gray-50 cursor-pointer transition duration-150 ${
              snapshot.isDragging ? "opacity-70 shadow-md" : ""
            }`}
            onClick={openModal}
          >
            <div className="font-semibold text-gray-800 text-base">
              {card.title}
            </div>

            {card.description && (
              <div className="mt-2 text-sm text-gray-600 line-clamp-2">
                {card.description}
              </div>
            )}

            {formattedDueDate && (
              <div className="flex mt-3 items-center text-sm text-gray-500">
                <span className="inline-flex items-center px-2 py-1 rounded bg-gray-100">
                  📅 {formattedDueDate}
                </span>
              </div>
            )}
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
