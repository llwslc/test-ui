import React from "react";
import ReactDOM from "react-dom/client";
import "./shell/reset.css";
import { Shell } from "./shell/Shell";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Shell />
  </React.StrictMode>,
);
