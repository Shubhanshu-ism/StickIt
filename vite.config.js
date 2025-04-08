// vite.config.js (or .ts)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // v4 Vite plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Add the Tailwind Vite plugin
  ],
});
