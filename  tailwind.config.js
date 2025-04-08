// tailwind.config.js - SIMPLIFIED FOR V4 BUILD COMPATIBILITY
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  // Theme customization is removed/commented to prevent build errors.
  // Refer to official Tailwind CSS v4 docs to add theme extensions correctly.
  theme: {
    extend: {
      // Example: If you find the correct v4 syntax, add colors here:
      // colors: {
      //   'trello-blue': '#0079BF',
      //   'trello-blue-lightest': '#E6F7FF',
      //   'trello-gray': '#F4F5F7',
      //   'trello-gray-text': '#5E6C84',
      //   // ... other custom colors
      // },
      // boxShadow: { // Verify v4 syntax if needed
      //   'card': '0 1px 1px rgba(9,30,66,.25)',
      //   'list': '0 1px 1px rgba(9,30,66,.25)',
      // }
    },
  },
  // Plugins - Verify v4 compatibility and integration method
  // plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
};
