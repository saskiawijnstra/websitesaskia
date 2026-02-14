<template>
  <div class="project-block hero-media col-span-10-start-2">
    <template v-if="isVideo && blockData?.content?.video">
      <video
        class="hero-media__image video"
        :src="blockData.content.video.url"
        autoplay
        playsinline
        v-intersection-observer="onIntersectionObserver"
        ref="videoEl"
        :poster="blockData.content.image?.url"
        muted
        loop
      ></video>
    </template>
    <template v-else>
      <img
        v-if="blockData?.content?.image.url"
        :src="blockData.content.image.url"
        :alt="blockData.content.image.alt"
        class="hero-media__image"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { vIntersectionObserver } from "@vueuse/components";

const props = defineProps({
  blockData: {
    type: Object,
    required: true,
  },
});

const isVideo = computed(() => {
  return props.blockData.content.video !== undefined;
});

const videoEl = ref<HTMLVideoElement | null>(null);

async function onIntersectionObserver([entry]: IntersectionObserverEntry[]) {
  if (props.blockData.content.video && videoEl.value) {
    if (entry.isIntersecting) {
      try {
        await videoEl.value.play();
      } catch (err) {
        console.log(
          "autoplay not allowed on this video. maybe it contains sound?",
        );
        // autoplay failed, maybe due to browser restrictions
      }
    } else {
      try {
        await videoEl.value.pause();
        console.log("pausi");
      } catch (err) {
        console.log("an error occured when trying to pause the video");
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hero-media {
  overflow: hidden;

  @media (max-width: 600px) {
    grid-column: span 12;
  }
}

.hero-media__image {
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
}
</style>
