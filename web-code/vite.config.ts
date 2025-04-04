import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import svgLoader from "vite-svg-loader";

const currentDir = dirname(fileURLToPath(import.meta.url));
// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "${join(currentDir, "./src/scss/_functions.scss")}" as *;`,
        api: "modern",
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src/"),
    },
  },
  plugins: [vue(), svgLoader()],
});
