import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import glsl from "vite-plugin-glsl";
import pages from "vite-plugin-pages";

export default defineConfig({
  plugins: [
    react(),
    pages({
      dirs: "src/entry/",
    }),
    glsl(),
  ],
  publicDir: "assets",
});
