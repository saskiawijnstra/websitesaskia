<template>
  <div class="project-block hero-media">
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
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.hero-media__image {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
