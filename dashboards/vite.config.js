import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite"; // ✅ correct import

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react", // 👈 important
      autoCodeSplitting: true, // optional
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
