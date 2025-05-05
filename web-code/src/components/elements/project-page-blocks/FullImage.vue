<template>
  <div
    v-if="blockData.content"
    class="project-block full-image"
    :class="columnsClass"
  >
    <img
      :aria-labelledby="'#' + labelId"
      :src="blockData.content.url"
      :alt="blockData.content.alt"
      class="full-image__image"
    />
    <label
      :id="labelId"
      v-if="blockData.content.label"
      v-html="blockData.content.label"
    >
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  blockData: {
    type: Object,
    required: true,
  },
});

const labelId = computed<string>(() => {
  return `label-id-${Math.random() * 1000000}`;
});

const columnsClass = computed(() => {
  let className = "col-span-12"; // fallback
  switch (props.blockData.content.width) {
    case "grid-12":
      className = "col-span-12-start-1";
      break;
    case "grid-11":
      className = "col-span-11-start-1";
      break;
    case "grid-10":
      className = "col-span-10-start-2";
      break;
    case "grid-9":
      className = "col-span-9-start-2";
      break;
    case "grid-8":
      className = "col-span-8-start-3";
      break;
    case "grid-7":
      className = "col-span-7-start-3";
      break;
    case "grid-6":
      className = "col-span-6-start-4";
      break;
    case "grid-5":
      className = "col-span-5-start-4";
      break;
    case "grid-4":
      className = "col-span-4-start-5";
      break;
    case "grid-3":
      className = "col-span-3-start-5";
      break;
    case "grid-2":
      className = "col-span-2-start-6";
      break;
    case "grid-1":
      className = "col-span-1-start-6";
      break;
    case "full":
      className = "full";
      break;
    default:
      className = "col-span-12";
  }
  return className;
});
</script>

<style lang="scss" scoped>
@use "@/scss/utils/_grid.scss" as grid;

.full-image {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;

  &.full {
    grid-column: 1 / -1; // über alle Spalten
    width: 100vw; // Viewport-Breite
    margin-left: calc(-1 * grid.$container-padding);
    margin-right: calc(-1 * grid.$container-padding);
  }
}

.full-image__image {
  width: 100%;
  object-fit: cover;
}

label {
  margin-top: calc-rem(50);
  text-align: center;
  color: var(--color-grijs-10);
}
</style>
