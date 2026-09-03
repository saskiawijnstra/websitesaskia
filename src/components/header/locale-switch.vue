<template>
  <div
    class="locale-switch"
    :class="`color-scheme-${colorScheme}`"
    role="radiogroup"
    :aria-label="t('settings.select-language-accessibility-label')"
  >
    <label
      v-for="locale in availableLocales"
      :key="locale"
      :class="['locale-option', { active: locale === currentLocale }]"
      :aria-checked="locale === currentLocale"
      role="radio"
    >
      <input type="radio" :value="locale" v-model="selected" class="sr-only" />
      <span class="locale-text">{{ locale }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useUiStore } from "../../stores/uiStore";
import { storeToRefs } from "pinia";

const { t } = useI18n();

const { availableLocales, locale: currentLocale } = useI18n();

const uiStore = useUiStore();
const { colorScheme } = storeToRefs(uiStore);

const selected = computed({
  get: () => currentLocale.value,
  set: (val) => {
    currentLocale.value = val;
  },
});
</script>

<style scoped lang="scss">
.locale-switch {
  display: flex;
  gap: calc-rem(4px);
}

.locale-option {
  cursor: pointer;
  transition: color 0.2s;
  text-transform: uppercase;
  position: relative;

  &.active {
    cursor: default;
  }

  &:not(:last-child)::after {
    content: " / ";
    color: currentColor;
    margin-left: 0.25rem;
    margin-right: 0.25rem;
  }
}

.locale-switch.color-scheme-light {
  .locale-option {
    color: var(--color-bruin);

    &.active {
      color: var(--color-roest);
    }
  }
}

.locale-switch.color-scheme-dark {
  .locale-option {
    color: var(--color-creme);

    &.active {
      color: var(--color-default-text);
      opacity: 60%;
    }
  }
}

.locale-text {
  padding-bottom: 4px;
  border-bottom: 2px solid transparent;
}

.locale-option.active .locale-text {
  border-bottom-color: currentColor;
}

.locale-option:has(input.sr-only:focus-visible) {
  outline: 1px solid var(--color-default-focus-border);
  outline-offset: 2px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  clip: rect(0, 0, 0, 0);
  overflow: hidden;
}
</style>