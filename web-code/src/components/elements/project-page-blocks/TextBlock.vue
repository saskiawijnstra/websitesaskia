<template>
  <div class="project-block text-block" :class="columnsClass">
    <component
      :is="blockData.columns && blockData.columns > 1 ? 'div' : 'p'"
      v-html="blockData.content.text"
      :style="`column-count: ${blockData.columns || 1}`"
    ></component>
  </div>
</template>

<script setup lang="ts">
import { useGridWidthFromYaml } from "./useGridWidthFromYaml";

const props = defineProps({
  blockData: {
    type: Object,
    required: true,
  },
});

const { columnsClass } = useGridWidthFromYaml(
  props.blockData,
  "col-span-6-start-4",
);
</script>

<style lang="scss" scoped>
.text-block {
  @media (max-width: 1024px) {
    grid-column: 2 / span 10;
  }

  @media (max-width: 768px) {
    grid-column: span 12;
  }

  div {
    @media (max-width: 1024px) {
      column-count: 1 !important;
    }
  }
  &::v-deep(p) {
    // p {
    break-inside: avoid-column;
    text-wrap-style: pretty;
    line-height: calc-rem(28px);

    &:first-child {
      margin-top: 0;
      padding-top: 0;
    }
  }
}
</style>
