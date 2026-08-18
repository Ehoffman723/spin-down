import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./assets/main.css";

const root = document.querySelector<HTMLElement>("#app");

if (!root) {
  throw new Error("App root element was not found");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
