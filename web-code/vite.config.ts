import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

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
  plugins: [vue()],
});
