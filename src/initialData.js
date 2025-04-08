// src/initialData.js
const initialData = [
  {
    id: "list-1",
    title: "Backlog",
    cards: [
      {
        id: "card-1",
        title: "Setup Tailwind CSS v4",
        description: "Install Vite plugin.",
        dueDate: null,
      },
      {
        id: "card-2",
        title: "Implement Board UI",
        description: "Create List and Card components.",
        dueDate: null,
      },
      {
        id: "card-3",
        title: "Add Drag and Drop",
        description: "Use react-beautiful-dnd.",
        dueDate: "2025-12-01",
      },
    ],
  },
  {
    id: "list-2",
    title: "In Progress",
    cards: [
      {
        id: "card-4",
        title: "Fix DnD Strict Mode Issue",
        description: "Comment out StrictMode tags.",
        dueDate: null,
      },
    ],
  },
  {
    id: "list-3",
    title: "Review",
    cards: [],
  },
  {
    id: "list-4",
    title: "Done",
    cards: [
      {
        id: "card-5",
        title: "Project Initialization",
        description: "Setup Vite + React.",
        dueDate: "2025-11-15",
      },
    ],
  },
];
export default initialData;
