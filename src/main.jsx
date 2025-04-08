import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // StrictMode is commented out to ensure react-beautiful-dnd v13 works
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
