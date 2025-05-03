<template>
  <div class="project-block hero-media col-span-10-start-2">
    <img
      v-if="blockData?.content?.image.url"
      :src="blockData.content.image.url"
      :alt="blockData.content.image.alt"
      class="hero-media__image"
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
.hero-media {
  overflow: hidden;
}

.hero-media__image {
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
}
</style>
