import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import CardModal from "./CardModal";

function Card({ card, index, listId, onEdit, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // These handlers now just pass data up to the Board
  const handleEditCard = (updatedCardData) => {
    // No need to include listId/cardId here, CardModal passes the full updated card object
    onEdit(listId, card.id, updatedCardData);
    // Modal closure is handled within CardModal or after state update in Board
  };

  const handleDeleteCard = () => {
    // Deletion is handled via the modal's delete button now
    // This function is just passed to the modal
    onDelete(listId, card.id);
    // No need to close modal here, Board state update will unmount it
  };

  const formattedDueDate = card.dueDate
    ? new Date(card.dueDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        // Optional: Add year or time if needed
        // year: 'numeric',
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
            // Use classes defined in index.css
            className={`trello-card ${
              snapshot.isDragging ? "trello-card-dragging" : ""
            }`}
            onClick={openModal} // Open modal on click
            style={{
              // Required styles from react-beautiful-dnd
              ...provided.draggableProps.style,
            }}
          >
            {/* Use classes defined in index.css */}
            <div className="trello-card-title">{card.title}</div>

            {card.description && (
              <div className="trello-card-description">{card.description}</div>
            )}

            {formattedDueDate && (
              <div className="trello-card-due-date">
                <span>
                  {" "}
                  {/* Wrap in span for styling */}
                  📅 {formattedDueDate}
                </span>
              </div>
            )}
          </div>
        )}
      </Draggable>

      {/* Render Modal Conditionally */}
      {isModalOpen && (
        <CardModal
          card={card}
          onClose={closeModal}
          onEdit={handleEditCard} // Pass the handler
          onDelete={handleDeleteCard} // Pass the handler
        />
      )}
    </>
  );
}

export default Card;
