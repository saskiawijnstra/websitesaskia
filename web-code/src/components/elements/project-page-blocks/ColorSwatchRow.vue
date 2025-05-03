<template>
  <figure class="project-block color-swatch-row col-span-12">
    <div
      class="color"
      v-for="colorItem in blockData.content"
      :style="`background-color: ${colorItem.color}`"
    ></div>
  </figure>
</template>

<script setup lang="ts">
defineProps({
  blockData: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.color-swatch-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: calc-rem(20);

  .color {
    height: 100px;
    width: 100px;
    border-radius: 16px;
    box-shadow: 0px 1px 20px 0px #0000000d;
  }
}
</style>
