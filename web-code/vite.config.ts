import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import svgLoader from "vite-svg-loader";
import ViteYaml from "@modyfi/vite-plugin-yaml";

const currentDir = dirname(fileURLToPath(import.meta.url));
// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "${join(currentDir, "./src/scss/_functions.scss")}" as *;
        @use "${join(currentDir, "./src/scss/utils/_mixins.scss")}" as mixins;
        `,
        api: "modern",
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src/"),
    },
  },
  plugins: [vue(), svgLoader(), ViteYaml()],
});
