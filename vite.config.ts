import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@source-data": path.resolve(__dirname, "./src/constants/data"),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
