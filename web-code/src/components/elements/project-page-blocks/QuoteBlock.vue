<template>
  <div class="quote-block project-block col-span-10-start-2">
    <p v-html="formattedText" :style="`text-align: ${textAlign}`"></p>
    <label v-if="blockData.content.quotee" v-html="formattedQuotee"></label>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useMarkdownParser } from "../useMarkdownParser";

const { formatText } = useMarkdownParser();

const props = defineProps({
  blockData: {
    type: Object,
    required: true,
  },
});

// Simple Markdown-like bold highlighting for **word**
const formattedText = computed(() => {
  return formatText(props.blockData.content.text);
});

const formattedQuotee = computed(() => {
  return formatText(props.blockData.content.quotee);
});

const textAlign = computed(() => {
  return props.blockData.textAlign || "center";
});
</script>

<style lang="scss" scoped>
.quote-block {
  p,
  label {
    font-size: calc-rem(36);
    text-align: center;
    text-wrap-style: balance;
    line-height: calc-rem(55);
    margin-bottom: 0;

    @media (max-width: 768px) {
      font-size: calc-rem(24);
      line-height: calc-rem(34px);
    }

    &.strong {
      font-weight: bold;
    }
  }

  label {
    font-size: calc-rem(16);
    display: block;
    margin-top: calc-rem(12);
  }
}
</style>
