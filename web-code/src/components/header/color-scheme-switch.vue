<template>
  <toggle-button
    :modelValue="useDarkMode"
    @update:model-value="updateValue($event)"
    accessibility-label="toggleDarkmode"
    class="color-scheme-switch"
  >
    <div class="content">
      <figure aria-labelledby="#color-scheme-label">
        <transition name="fade" mode="out-in">
          <light-mode-icon v-if="useDarkMode" />
          <dark-mode-icon v-else />
        </transition>
      </figure>
      <div id="#color-scheme-label">
        {{ t("settings.toggle-dark-mode", +useDarkMode - 1) }}
      </div>
    </div>
  </toggle-button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import toggleButton from "../elements/toggle-button.vue";
import { useUiStore } from "../../stores/uiStore";
import { storeToRefs } from "pinia";
import DarkModeIcon from "@/assets/images/moon.svg";
import LightModeIcon from "@/assets/images/sun.svg";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const uiStore = useUiStore();

const { colorScheme } = storeToRefs(uiStore);

const useDarkMode = ref(colorScheme.value === "dark");
console.log("used", useDarkMode.value);

function updateValue(event: boolean) {
  useDarkMode.value = event;
  uiStore.updateColorScheme(event ? "dark" : "light");
}
</script>

<style scoped lang="scss">
.color-scheme-switch {
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    figure {
      height: 16px;
      margin: 0;
    }
  }
}
</style>
