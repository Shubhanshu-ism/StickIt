// vite.config.js (or .ts)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // Import the v4 Vite plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Add the Tailwind Vite plugin
  ],
  // Optional: Define server options if needed, e.g., port
  // server: {
  //   port: 3000,
  // },
});
