import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";
import type { Plugin } from "vite";
import { toPublic } from "./src/content/draftMarkers";

// Production builds get case-study Markdown with author notes, [NEEDS INPUT]
// and [NOTE] markers removed, so drafts never ship in the JS bundle.
const caseStudyDrafts = (): Plugin => ({
  name: "case-study-drafts",
  apply: "build",
  enforce: "pre",
  load(id) {
    const [file, query] = id.split("?");
    if (query !== "raw" || !file.includes("/content/case-studies/") || !file.endsWith(".md")) return null;
    return `export default ${JSON.stringify(toPublic(readFileSync(file, "utf8")))};`;
  },
});

export default defineConfig({
  plugins: [react(), caseStudyDrafts()],
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
