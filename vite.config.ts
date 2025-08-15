import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["192x192.png", "512x512.png"],
      manifest: {
        name: "Training",
        short_name: "Training",
        start_url: "/",
        scope: "/",
        orientation: "portrait",
        description: "Приложение для плана тренировок",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json}"], // Кэшируем ВСЁ
        runtimeCaching: [], // Не нужно кэшировать API, так как его нет
      },
    }),
  ],
});
