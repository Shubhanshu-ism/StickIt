// src/initialData.js
const initialData = [
  {
    id: "list-1",
    title: "To Do",
    cards: [
      {
        id: "card-1",
        title: "Implement Drag & Drop",
        description: "Use react-beautiful-dnd.",
        dueDate: null,
      },
      {
        id: "card-2",
        title: "Style Components",
        description: "Apply Tailwind v4 utilities.",
        dueDate: null,
      },
    ],
  },
  {
    id: "list-2",
    title: "In Progress",
    cards: [
      {
        id: "card-3",
        title: "Add Persistence",
        description: "Use localStorage.",
        dueDate: "2025-12-31",
      },
    ],
  },
  {
    id: "list-3",
    title: "Done",
    cards: [],
  },
];

export default initialData;
