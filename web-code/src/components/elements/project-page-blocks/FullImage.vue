<template>
  <div v-if="blockData.content" class="project-block full-image col-span-12">
    <img
      :src="blockData.content.url"
      :alt="blockData.content.alt"
      class="full-image__image"
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
.full-image {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.full-image__image {
  width: 100%;
  object-fit: cover;
}
</style>
