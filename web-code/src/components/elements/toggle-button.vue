<template>
  <label class="toggle-button">
    <input
      type="checkbox"
      :checked="model === true"
      @change="onChange"
      :aria-label="accessibilityLabel"
    />
    <span class="custom-toggle">
      <slot>{{ model ? "true" : "false" }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const model = defineModel();

withDefaults(
  defineProps<{
    accessibilityLabel?: string;
  }>(),
  {
    accessibilityLabel: "toggle",
  },
);

function onChange(event: Event) {
  const target = event.target as HTMLInputElement;
  console.log("darkmode-value", target.checked);
  model.value = target.checked;
}
</script>

<style scoped lang="scss">
.toggle-button {
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  &:focus-visible {
    border: 2px solid red;
  }

  &:has(input:focus-visible) {
    outline: 1px solid var(--color-default-focus-border);
    outline-offset: 2px;
  }

  input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .custom-toggle {
    display: inline-block;
  }
}
</style>
