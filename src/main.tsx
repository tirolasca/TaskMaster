import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrash,
  faCheckCircle,
  faArrowUp,
  faArrowDown,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

library.add(faTrash, faCheckCircle, faArrowUp, faArrowDown, faMinus);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}
