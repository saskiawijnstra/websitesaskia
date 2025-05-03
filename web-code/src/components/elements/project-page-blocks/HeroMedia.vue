<template>
  <div class="project-block hero-media">
    <img
      v-if="blockData?.content?.[0]?.image"
      :src="blockData.content[0].image"
      alt="Hero Media"
      class="hero-media__image"
    />
    <slot />
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
