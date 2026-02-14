<template>
  <img
    v-if="!isVideo"
    class="project-thumbnail"
    :src="thumbnailPath"
    :alt="altText"
  />

  <video
    v-else
    :src="thumbnailPath"
    :poster="posterPath"
    class="project-thumbnail"
    playsinline
    muted
    loop
    autoplay
  ></video>
</template>

<script setup lang="ts">
defineProps<{
  thumbnailPath: string;
  isVideo?: boolean;
  posterPath?: string;
  altText: string;
}>();
</script>

<style lang="scss" scoped>
.project-thumbnail {
  display: block;
  max-width: 100%;
  object-fit: cover;
}
</style>
