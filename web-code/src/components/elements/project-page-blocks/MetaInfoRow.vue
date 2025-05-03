<template>
  <div class="project-block meta-info-row col-span-10-start-2">
    <div
      v-for="(item, index) in blockData.content"
      :key="index"
      class="meta-info-item"
    >
      <span class="meta-info-label">{{ item.label }}</span>
      <span class="meta-info-value">{{ item.value }}</span>
    </div>
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
.meta-info-row {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
}

.meta-info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: calc-rem(210px);
}

.meta-info-label {
  margin-bottom: 0.25rem;
  text-align: center;
}

.meta-info-value {
  font-size: 1rem;
}
</style>
