// tailwind.config.js - Structure for v4 might vary slightly, check docs
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  // Theme customizations - Verify v4 syntax if needed
  theme: {
    extend: {
      colors: {
        "trello-blue": "#0079BF",
        "trello-blue-light": "#00A1E0",
        "trello-blue-lightest": "#E6F7FF", // Example light board background
        "trello-gray": "#F4F5F7", // Example list background
        "trello-gray-dark": "#EBECF0", // Darker gray
        "trello-gray-text": "#5E6C84", // Text color
        "trello-gray-300": "#dfe1e6", // Custom gray for hover/borders
      },
      boxShadow: {
        card: "0 1px 1px rgba(9,30,66,.25)", // Trello-like card shadow
        list: "0 1px 1px rgba(9,30,66,.25)", // Trello-like list shadow
      },
    },
  },
  // Plugins - Check v4 documentation for compatibility and integration
  // Ensure @tailwindcss/forms is compatible or find v4 alternative if needed
  // plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')], // Commented out pending v4 compatibility check
};
