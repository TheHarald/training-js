import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  base: "/training-js/",
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["logo192.png", "logo512.png"],
      manifest: {
        name: "Training",
        short_name: "Training",
        start_url: "/training-js/",
        scope: "/training-js/",
        orientation: "portrait",
        description: "Приложение для плана тренировок",
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",
        icons: [
          {
            src: "/training-js/logo192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/training-js/logo512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json}"], // Кэшируем ВСЁ
        runtimeCaching: [], // Не нужно кэшировать API, так как его нет
        navigateFallback: "/training-js/index.html",
      },
    }),
  ],
});
