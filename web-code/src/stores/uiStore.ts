import { defineStore } from "pinia"
import { ref } from "vue";

export const useUiStore = defineStore('ui', () => {
    const prefersDarkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const PREFERS_DARK_MODE_INIT_VALUE = prefersDarkModeQuery.matches; // initial setting
    const colorScheme = ref<'dark'|'light'>(PREFERS_DARK_MODE_INIT_VALUE ? 'dark' : 'light')

    prefersDarkModeQuery.addEventListener('change', (e: MediaQueryListEvent)=> {
        colorScheme.value = e.matches ?  'dark' : 'light'
    })

  
    return {
      colorScheme
    }
  })