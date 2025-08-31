import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ["react-redux"], // ✅ ensure it's bundled
  },
  build: {
    rollupOptions: {
      external: [], // don’t externalize react-redux
    },
  },
});
