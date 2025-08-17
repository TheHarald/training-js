import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
//setup
import "./modules/settings/services/settings.ts";
import "./dayjs.ts";
import { Test } from "./test.tsx";

// Регистрируем Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/training-js/sw.js");
  });
}

createRoot(document.getElementById("root")!).render(
  <HeroUIProvider className="h-full">
    {/* <Test /> */}
    <App />
    <ToastProvider />
  </HeroUIProvider>
);
