import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import List from "./List";
import AddList from "./AddList";

function Board({ lists, setLists }) {
  const [isAddingList, setIsAddingList] = useState(false);

  const handleAddList = (title) => {
    const newList = {
      id: `list-${Date.now()}`,
      title,
      cards: [],
    };
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

  const handleEditCard = (listId, cardId, updatedCard) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              cards: list.cards.map((card) =>
                card.id === cardId ? { ...card, ...updatedCard } : card
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
          ? {
              ...list,
              cards: list.cards.filter((card) => card.id !== cardId),
            }
          : list
      )
    );
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    if (type === "list") {
      handleListDragEnd(source, destination, lists, setLists);
      return;
    }

    handleCardDragEnd(source, destination, lists, setLists);
  };

  const handleListDragEnd = (source, destination, lists, setLists) => {
    const newLists = Array.from(lists);
    const [removed] = newLists.splice(source.index, 1);
    newLists.splice(destination.index, 0, removed);
    setLists(newLists);
  };

  const handleCardDragEnd = (source, destination, lists, setLists) => {
    const sourceList = lists.find((list) => list.id === source.droppableId);
    const destList = lists.find((list) => list.id === destination.droppableId);

    if (sourceList.id === destList.id) {
      const newCards = Array.from(sourceList.cards);
      const [removed] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, removed);

      const newLists = lists.map((list) =>
        list.id === sourceList.id ? { ...list, cards: newCards } : list
      );

      setLists(newLists);
    } else {
      const sourceCards = Array.from(sourceList.cards);
      const [removed] = sourceCards.splice(source.index, 1);
      const destCards = Array.from(destList.cards);
      destCards.splice(destination.index, 0, removed);

      const newLists = lists.map((list) => {
        if (list.id === sourceList.id) {
          return { ...list, cards: sourceCards };
        }
        if (list.id === destList.id) {
          return { ...list, cards: destCards };
        }
        return list;
      });

      setLists(newLists);
    }
  };

  return (
    <div className="p-4 h-full overflow-x-auto">
      {/* Horizontal scroll */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <div
              className="board-lists"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
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

              {isAddingList ? (
                <div className="trello-list">
                  <AddList
                    onAdd={handleAddList}
                    onCancel={() => setIsAddingList(false)}
                  />
                </div>
              ) : (
                <div
                  className="bg-trello-gray-300 bg-opacity-80 hover:bg-opacity-100 rounded-md shadow-sm flex-shrink-0 w-72 mx-2 p-2 h-12 flex items-center justify-center cursor-pointer"
                  onClick={() => setIsAddingList(true)}
                >
                  <span className="text-gray-600 font-medium">
                    + Add another list
                  </span>
                </div>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Board;
