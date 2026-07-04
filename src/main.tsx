import React from "react";
import { createRoot } from "react-dom/client";
import { ShutterIntro } from "./components/ShutterIntro";
import "./styles.css";

const Portfolio = React.lazy(() => import("./routes/index"));

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

createRoot(root).render(
  <React.StrictMode>
    <React.Suspense fallback={<ShutterIntro />}>
      <Portfolio />
    </React.Suspense>
  </React.StrictMode>,
);
