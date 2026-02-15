<template>
  <div class="link-arrow" :class="`color-scheme-${colorScheme}`">
    <arrow />
  </div>
</template>

<script lang="ts" setup>
import arrow from "@/assets/images/arrow-right.svg";
import { useUiStore } from "../../stores/uiStore";
import { storeToRefs } from "pinia";

const uiStore = useUiStore();

const { colorScheme } = storeToRefs(uiStore);
</script>

<style lang="scss" scoped>
.link-arrow {
  height: 32px;
  width: 32px;
  display: grid;
  flex-shrink: 0;
  place-items: center;
  border-radius: 50%;
  background-color: #1a1a1a;

  &.color-scheme-light {
    background-color: var(--color-grijs-6);

    &::v-deep(path) {
      fill: var(--color-niet-zwart);
    }
  }
}
</style>
