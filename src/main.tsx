import React from "react";
import ReactDOM from "react-dom/client";
import "./shell/reset.css";
import { Shell } from "./shell/Shell";

// Set the active kit synchronously so the first paint already carries the
// right [data-kit] chrome (no flash before React's effect runs).
document.documentElement.dataset.kit =
  localStorage.getItem("kit") === "nova" ? "nova" : "abyss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Shell />
  </React.StrictMode>,
);
