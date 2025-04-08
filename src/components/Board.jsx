import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import List from "./List";
import AddList from "./AddList";
import { FaPlus } from "react-icons/fa"; // Import icon

// Helper function for reordering within the same list
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// Helper function for moving items between lists
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

function Board({ lists, setLists }) {
  const [isAddingList, setIsAddingList] = useState(false);

  // --- List Management ---
  const handleAddList = (title) => {
    const newList = {
      id: `list-${Date.now()}`, // Unique ID
      title,
      cards: [],
    };
    setLists([...lists, newList]);
    setIsAddingList(false);
  };

  const handleDeleteList = (listId) => {
    // Confirmation is handled in List.jsx
    setLists(lists.filter((list) => list.id !== listId));
  };

  const handleRenameList = (listId, newTitle) => {
    setLists(
      lists.map((list) =>
        list.id === listId ? { ...list, title: newTitle } : list
      )
    );
  };

  // --- Card Management ---
  const handleAddCard = (listId, cardTitle) => {
    const newCard = {
      id: `card-${Date.now()}`, // Unique ID
      title: cardTitle,
      description: "",
      dueDate: null,
    };
    setLists(
      lists.map((list) =>
        list.id === listId
          ? { ...list, cards: [...list.cards, newCard] } // Add to end
          : list
      )
    );
  };

  // Updated handleEditCard to accept the full updated card object
  const handleEditCard = (listId, cardId, updatedCardData) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              // Map through cards, replace the one with matching ID
              cards: list.cards.map((card) =>
                card.id === cardId ? { ...card, ...updatedCardData } : card
              ),
            }
          : list
      )
    );
  };

  const handleDeleteCard = (listId, cardId) => {
    // Confirmation is handled in CardModal.jsx
    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              cards: list.cards.filter((card) => card.id !== cardId),
            }
          : list
      )
    );
  };

  // --- Drag and Drop Logic ---
  const onDragEnd = (result) => {
    const { source, destination, type } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // --- Reordering Lists ---
    if (type === "list") {
      if (source.index === destination.index) {
        return; // No change
      }
      const reorderedLists = reorder(lists, source.index, destination.index);
      setLists(reorderedLists);
      return;
    }

    // --- Reordering/Moving Cards ---
    if (type === "card") {
      const sourceList = lists.find((list) => list.id === source.droppableId);
      const destList = lists.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destList) {
        console.error("Source or destination list not found!");
        return;
      }

      // Reordering within the same list
      if (source.droppableId === destination.droppableId) {
        if (source.index === destination.index) {
          return; // No change
        }
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );
        const newLists = lists.map((list) =>
          list.id === sourceList.id ? { ...list, cards: reorderedCards } : list
        );
        setLists(newLists);
      }
      // Moving card to a different list
      else {
        const movedResult = move(
          sourceList.cards,
          destList.cards,
          source,
          destination
        );
        const newLists = lists.map((list) => {
          if (list.id === source.droppableId) {
            return { ...list, cards: movedResult[source.droppableId] };
          }
          if (list.id === destination.droppableId) {
            return { ...list, cards: movedResult[destination.droppableId] };
          }
          return list;
        });
        setLists(newLists);
      }
    }
  };

  return (
    // Outer container for padding and background is now in App.jsx/index.css
    // Board itself handles the DragDropContext and list rendering
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="list">
        {(provided) => (
          <div
            className="board-lists" // Use class from index.css for layout
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {/* Render Existing Lists */}
            {lists.map((list, index) => (
              <List
                key={list.id}
                list={list}
                index={index} // Pass index for Draggable
                onAddCard={handleAddCard}
                onEditCard={handleEditCard}
                onDeleteCard={handleDeleteCard}
                onDeleteList={handleDeleteList}
                onRenameList={handleRenameList}
              />
            ))}
            {provided.placeholder} {/* Placeholder for dragging lists */}
            {/* Add New List Area */}
            <div className="flex-shrink-0">
              {" "}
              {/* Prevent AddList form/button from stretching */}
              {isAddingList ? (
                // Render AddList component when adding
                <AddList
                  onAdd={handleAddList}
                  onCancel={() => setIsAddingList(false)}
                />
              ) : (
                // Render "Add another list" button
                <button
                  className="bg-white bg-opacity-30 hover:bg-opacity-50 transition-opacity text-white font-medium rounded-lg shadow-sm w-72 h-10 flex items-center justify-start px-4" // Styling for the add list button
                  onClick={() => setIsAddingList(true)}
                >
                  <FaPlus className="mr-2" /> Add another list
                </button>
              )}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
