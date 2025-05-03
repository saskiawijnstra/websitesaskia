<template>
  <p
    v-html="formattedText"
    class="project-block quote-block col-span-10-start-2"
  ></p>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  blockData: {
    type: Object,
    required: true,
  },
});

// Simple Markdown-like bold highlighting for **word**
const formattedText = computed(() => {
  return props.blockData.content.text.replace(
    /\*\*(.*?)\*\*/g,
    "<strong>$1</strong>",
  );
});
</script>

<style lang="scss" scoped>
.quote-block {
  font-size: calc-rem(36);
  text-align: center;
  text-wrap-style: balance;
  line-height: calc-rem(55);
}

.quote-block strong {
  font-weight: bold;
  color: var(--highlight-color, #f08);
}
</style>
