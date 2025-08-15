import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HeroUIProvider } from "@heroui/react";

// Регистрируем Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/training-js/sw.js");
  });
}

createRoot(document.getElementById("root")!).render(
  <HeroUIProvider className="h-full">
    <App />
  </HeroUIProvider>
);
