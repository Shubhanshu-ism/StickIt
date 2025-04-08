# Trello Clone - React & Tailwind CSS v4

A clean and functional Trello clone built with **React**, **Vite**, and **Tailwind CSS v4** — featuring dynamic task management and intuitive drag-and-drop.



---

## 🚀 Features

- 📦 **List Management**
  - Create, rename, delete lists
  - Reorder lists via drag-and-drop

- 📝 **Card Management**
  - Add, edit (via modal), delete cards
  - Drag cards within and across lists

- 🎯 **Drag & Drop**
  - Smooth UX powered by `@dnd-kit/core`

- 💾 **LocalStorage Persistence**
  - All changes saved automatically in the browser

- 🧼 **Board Reset**
  - One-click reset to clear all lists and cards

---

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


## 📸 Preview

<div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
    <img src="public/preview.png" alt="preview" width="800"/>
</div>


## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone <your-repo-url>
cd <your-folder>