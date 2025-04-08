// src/initialData.js
const initialData = [
  {
    id: "list-1",
    title: "To Do",
    cards: [
      {
        id: "card-1",
        title: "Complete HR Documentation",
        description: "Fill out personal and bank details.",
        dueDate: "2025-04-10",
      },
      {
        id: "card-2",
        title: "Setup Workstation",
        description: "Install required tools and access internal systems.",
        dueDate: "2025-04-11",
      },
      {
        id: "card-3",
        title: "Meet the Team",
        description: "Attend intro call with teammates and manager.",
        dueDate: "2025-04-12",
      },
    ],
  },
  {
    id: "list-2",
    title: "In Progress",
    cards: [
      {
        id: "card-4",
        title: "Access Company Wiki",
        description: "Review company policies and culture guide.",
        dueDate: "2025-04-13",
      },
    ],
  },
  {
    id: "list-3",
    title: "Completed",
    cards: [
      {
        id: "card-5",
        title: "Signed Offer Letter",
        description: "Completed before joining.",
        dueDate: "2025-04-01",
      },
    ],
  },
  {
    id: "list-4",
    title: "Optional",
    cards: [
      {
        id: "card-6",
        title: "Join Interest Groups",
        description: "Explore company clubs, communities, and forums.",
        dueDate: null,
      },
    ],
  },
];

export default initialData;
