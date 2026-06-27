import React from "react";
import { createRoot } from "react-dom/client";
import Portfolio from "./routes/index";
import "./styles.css";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

createRoot(root).render(
  <React.StrictMode>
    <Portfolio />
  </React.StrictMode>,
);
