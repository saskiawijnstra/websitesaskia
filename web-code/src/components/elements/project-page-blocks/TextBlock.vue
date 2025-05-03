<template>
  <div class="project-block text-block col-span-6-start-4">
    <p v-html="blockData.content.text"></p>
  </div>
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
.text-block {
  p {
    line-height: calc-rem(28px);
  }
}
</style>
