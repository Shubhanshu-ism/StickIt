import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import List from "./List";
import AddList from "./AddList";
import { PlusIcon } from "@heroicons/react/20/solid";

// Helper functions (reorder, move) remain the same
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
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

  // List Management handlers (handleAddList, handleDeleteList, handleRenameList) remain the same
  const handleAddList = (title) => {
    const newList = { id: `list-${Date.now()}`, title, cards: [] };
    setLists([...lists, newList]);
    setIsAddingList(false);
  };
  const handleDeleteList = (listId) => {
    setLists(lists.filter((list) => list.id !== listId));
  };
  const handleRenameList = (listId, newTitle) => {
    setLists(
      lists.map((list) =>
        list.id === listId ? { ...list, title: newTitle } : list
      )
    );
  };

  // Card Management handlers (handleAddCard, handleEditCard, handleDeleteCard) remain the same
  const handleAddCard = (listId, cardTitle) => {
    const newCard = {
      id: `card-${Date.now()}`,
      title: cardTitle,
      description: "",
      dueDate: null,
    };
    setLists(
      lists.map((list) =>
        list.id === listId ? { ...list, cards: [...list.cards, newCard] } : list
      )
    );
  };
  const handleEditCard = (listId, cardId, updatedCardData) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              cards: list.cards.map((card) =>
                card.id === cardId ? { ...card, ...updatedCardData } : card
              ),
            }
          : list
      )
    );
  };
  const handleDeleteCard = (listId, cardId) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? { ...list, cards: list.cards.filter((card) => card.id !== cardId) }
          : list
      )
    );
  };

  // Drag and Drop Logic (onDragEnd) remains the same
  const onDragEnd = (result) => {
    const { source, destination, type } = result;
    if (!destination) return;
    if (type === "list") {
      if (source.index === destination.index) return;
      const reorderedLists = reorder(lists, source.index, destination.index);
      setLists(reorderedLists);
      return;
    }
    if (type === "card") {
      const sourceList = lists.find((list) => list.id === source.droppableId);
      const destList = lists.find(
        (list) => list.id === destination.droppableId
      );
      if (!sourceList || !destList) return;
      if (source.droppableId === destination.droppableId) {
        if (source.index === destination.index) return;
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );
        const newLists = lists.map((list) =>
          list.id === sourceList.id ? { ...list, cards: reorderedCards } : list
        );
        setLists(newLists);
      } else {
        const movedResult = move(
          sourceList.cards,
          destList.cards,
          source,
          destination
        );
        const newLists = lists.map((list) => {
          if (list.id === source.droppableId)
            return { ...list, cards: movedResult[source.droppableId] };
          if (list.id === destination.droppableId)
            return { ...list, cards: movedResult[destination.droppableId] };
          return list;
        });
        setLists(newLists);
      }
    }
  };

  return (
    // Container for horizontal scrolling
    <div className="overflow-x-auto overflow-y-hidden h-full w-full p-4">
      {" "}
      {/* Added padding here */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="list">
          {(provided) => (
            // Apply flex layout and spacing directly for the lists container
            <div
              className="flex items-start space-x-4 h-full" // Use space-x for gap, items-start
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {/* Render Lists */}
              {lists.map((list, index) => (
                <List
                  key={list.id}
                  list={list}
                  index={index}
                  onAddCard={handleAddCard}
                  onEditCard={handleEditCard}
                  onDeleteCard={handleDeleteCard}
                  onDeleteList={handleDeleteList}
                  onRenameList={handleRenameList}
                />
              ))}
              {provided.placeholder}
              {/* Add New List Button/Form */}
              <div className="flex-shrink-0 w-72 self-start">
                {isAddingList ? (
                  <AddList
                    onAdd={handleAddList}
                    onCancel={() => setIsAddingList(false)}
                  />
                ) : (
                  <button
                    // Apply styles directly for the add list button
                    className="bg-white/50 hover:bg-white/75 transition-opacity text-gray-600 font-medium rounded-md shadow-sm w-full h-10 flex items-center justify-start px-3"
                    onClick={() => setIsAddingList(true)}
                  >
                    <PlusIcon className="mr-2 h-5 w-5" /> Add another list
                  </button>
                )}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Board;
