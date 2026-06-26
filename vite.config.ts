import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      "@": "/src",
      "@assets": "/src/assets",
      "@components": "/src/components",
      "@styles": "/src/styles",
      "@utils": "/src/utils",
      "@hooks": "/src/hooks",
      "@types": "/src/types",
      "@context": "/src/context",
    },
  },
});
