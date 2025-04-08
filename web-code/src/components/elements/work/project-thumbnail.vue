<template>
  <img class="project-thumbnail" :src="thumbnailPath" :alt="altText" />
</template>

<script setup lang="ts">
defineProps<{
  thumbnailPath: string;
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
