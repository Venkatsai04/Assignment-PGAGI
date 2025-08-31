import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "react-redux": "react-redux", // force correct resolution
    },
  },
  build: {
    rollupOptions: {
      external: [], // ensure nothing is excluded
    },
  },
});
