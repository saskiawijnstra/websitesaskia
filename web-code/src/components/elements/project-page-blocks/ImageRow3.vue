<template>
  <div class="project-block image-row-3 col-span-12">
    <img
      v-for="(item, index) in blockData.content"
      :key="index"
      :src="item.image.url"
      :alt="item.image.alt"
      class="image-row-3__image"
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

<style scoped>
.image-row-3 {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.image-row-3__image {
  width: calc(33.333% - 0.666rem);
  object-fit: cover;
}
</style>
