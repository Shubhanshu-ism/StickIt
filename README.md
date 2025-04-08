# Trello Clone - React & Tailwind CSS v4

A functional, client-side Trello Clone application built with React, Vite, and Tailwind CSS v4.

## Project Goal

The primary goal of this project is to create a functional, interactive Trello Clone application entirely on the client-side. It aims to demonstrate proficiency in using modern front-end technologies like React (with hooks), Vite, and Tailwind CSS v4, implementing core features such as dynamic list and card management, intuitive drag-and-drop interactions, and data persistence using browser `localStorage`.

## Description

This project implements a feature-rich Trello Clone task management board. It provides a user experience similar to Trello, allowing users to visually organize tasks within customizable lists. Key functionalities include creating, editing, deleting, and rearranging both lists and task cards. The application state is persisted locally, ensuring that the board remains intact across browser sessions. This project serves as a practical demonstration of building interactive UIs with React, handling state management, implementing complex features like drag-and-drop, and utilizing modern build tooling and styling techniques.

## Features

* **Dynamic List Management:**
    * Create new lists with custom titles.
    * Delete lists (including all associated cards).
    * Rename list titles inline.
    * Reorder entire lists horizontally via drag-and-drop.
* **Interactive Card Management:**
    * Add new task cards to specific lists.
    * Edit card details (title, description, due date) through a modal interface.
    * Delete individual cards.
    * Reorder cards within the same list via drag-and-drop.
    * Move cards between different lists via drag-and-drop.
* **Drag & Drop:** Smooth, intuitive drag-and-drop functionality for both cards and lists, powered by `react-beautiful-dnd`.
* **Local Persistence:** The current state of the board (all lists and cards) is automatically saved to the browser's `localStorage`, ensuring data persistence across page reloads and browser sessions.
* **Board Reset:** A dedicated button allows users to clear the entire board and reset it to its initial state.
* **Trello-like UI:** Clean, responsive user interface styled with Tailwind CSS v4, designed to visually resemble the core Trello layout (columns for lists, cards within columns, modal for details).
* **Modularity:** Codebase organized into reusable components, custom hooks (`useInlineForm`), and utility functions (`dndUtils`, `constants`) for better maintainability.

## Tech Stack

* **Framework:** React 18
* **Build Tool:** Vite
* **Styling:** Tailwind CSS v4 (using `@tailwindcss/vite`)
* **Drag & Drop:** `react-beautiful-dnd` v13
* **Icons:** `@heroicons/react`, `react-icons`
* **State Management:** React Hooks (`useState`, `useEffect`), Custom Hooks
* **Persistence:** Browser `localStorage` API

## Project Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Using yarn:
    ```bash
    yarn install
    ```

## Running the Development Server

1.  **Start the Vite dev server:**
    ```bash
    npm run dev
    ```
    or
    ```bash
    yarn dev
    ```
2.  Open your browser and navigate to the local URL provided (usually `http://localhost:5173` or similar).

## Available Scripts

* `dev`: Runs the app in development mode.
* `build`: Builds the app for production.
* `lint`: Lints the project files.
* `preview`: Serves the production build locally.

## Important Notes & Considerations

* **React Strict Mode Workaround:** `React.StrictMode` is **disabled** (commented out) in `src/main.jsx`. This is a necessary workaround for `react-beautiful-dnd` v13 compatibility with React 18's development mode behavior. Drag-and-drop functionality will likely break if Strict Mode is re-enabled. For production environments requiring Strict Mode, consider migrating to a fully compatible DnD library like `@dnd-kit/core`.
* **Tailwind CSS v4 Configuration:** The included `tailwind.config.js` is **simplified** to ensure the project builds correctly with the `@tailwindcss/vite` plugin. Custom theme extensions (e.g., specific `colors`, `boxShadow`) have been commented out. To add custom styling, you **must** consult the **official Tailwind CSS v4 documentation** for the correct configuration syntax and structure.
* **Client-Side Only:** This application operates entirely within the browser. All data is stored in `localStorage`, meaning it's specific to that browser and can be lost if browser data is cleared. There is no backend server or database integration.

## Folder Structure