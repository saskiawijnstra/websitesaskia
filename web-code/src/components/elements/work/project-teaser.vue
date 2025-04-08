<template>
  <div class="project-teaser col-span-6">
    <project-thumbnail
      :thumbnail-path="thumbnailPath"
      :alt-text="thumbnailAltText"
    />
    <h2>
      <slot name="title"></slot>
    </h2>
    <p>
      <slot name="description"></slot>
    </p>
  </div>
</template>

<script setup lang="ts">
import projectThumbnail from "./project-thumbnail.vue";

defineProps<{
  thumbnailPath: string;
  thumbnailAltText: string;
  projectId: string;
}>();
</script>
<style lang="scss" scoped>
.project-teaser {
  display: flex;
  flex-direction: column;
  gap: calc-rem(26px);
}
</style>
