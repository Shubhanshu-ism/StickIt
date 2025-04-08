/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "trello-blue": "#0079BF",
        "trello-blue-light": "#00A2FF",
        "trello-gray-100": "#F8F9FA",
        "trello-gray-200": "#EBECF0",
        "trello-gray-300": "#DFE1E6",
        "trello-gray-400": "#C1C7D0",
        "trello-purple": "#6B5B95",
      },
      backgroundImage: {
        "gradient-board": "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      },
    },
  },
  plugins: [],
};
