<template>
  <div class="project-block image-row-4-tilted col-span-12">
    <img
      v-for="(item, index) in blockData.content"
      :key="index"
      :src="item.image"
      :alt="item.alt || `Image ${index + 1}`"
      class="image-row-4__image"
      :style="{ transform: `rotate(${item.rotation || 0}deg)` }"
    />
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
.image-row-4-tilted {
  display: flex;
  gap: calc-rem(60);
  justify-content: center;
  flex-wrap: wrap;
}

.image-row-4__image {
  width: calc(25% - calc-rem(60));
  object-fit: cover;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    width: calc(50% - calc-rem(60));
  }
}
</style>
