import { defineStore } from "pinia";
import { nextTick, ref, watch } from "vue";
import { useRoute } from "vue-router";

export const useUiStore = defineStore("ui", () => {
  const isMenuVisible = ref(false);

  const prefersDarkModeQuery = window.matchMedia(
    "(prefers-color-scheme: dark)",
  );

  const colorScheme = ref<"dark" | "light">("dark");

  updateColorScheme(prefersDarkModeQuery.matches ? "dark" : "light"); // initial setting

  prefersDarkModeQuery.addEventListener("change", (e: MediaQueryListEvent) => {
    updateColorScheme(e.matches ? "dark" : "light"); // react to user agent changes
  });

  const route = useRoute();

  watch(
    () => route.name,
    (newVal) => {
      updateColorScheme(colorScheme.value);
    },
  );

  async function updateColorScheme(mode: "light" | "dark") {
    colorScheme.value = mode;
    // reset
    document.documentElement.classList.remove("background-style-project-page");
    document.documentElement.classList.remove("color-scheme-light");
    document.documentElement.classList.remove("color-scheme-dark");
    // apply new value
    await nextTick();
    document.documentElement.classList.add(`color-scheme-${mode}`);
    if (route.name === "project-page") {
      document.documentElement.classList.add("background-style-project-page");
    }
  }

  return {
    colorScheme,
    updateColorScheme,
    isMenuVisible,
  };
});
