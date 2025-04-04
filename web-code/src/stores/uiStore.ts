import { defineStore } from "pinia";
import { nextTick, ref } from "vue";

export const useUiStore = defineStore("ui", () => {
  const prefersDarkModeQuery = window.matchMedia(
    "(prefers-color-scheme: dark)",
  );

  const colorScheme = ref<"dark" | "light">("dark");

  updateColorScheme(prefersDarkModeQuery.matches ? "dark" : "light"); // initial setting

  prefersDarkModeQuery.addEventListener("change", (e: MediaQueryListEvent) => {
    updateColorScheme(e.matches ? "dark" : "light"); // react to user agent changes
  });

  async function updateColorScheme(mode: "light" | "dark") {
    colorScheme.value = mode;
    // reset
    document.documentElement.classList.remove("color-scheme-light");
    document.documentElement.classList.remove("color-scheme-dark");
    // apply new value
    await nextTick();
    document.documentElement.classList.add(`color-scheme-${mode}`);
  }

  return {
    colorScheme,
    updateColorScheme,
  };
});
