<template>
  <div
    v-if="blockData.content"
    class="project-block full-image"
    :class="columnsClass"
  >
    <component
      class="wrapper"
      :is="imageLink ? 'a' : 'span'"
      :href="imageLink ? imageLink : undefined"
      :target="imageLink ? '_blank' : undefined"
    >
      <template v-if="isVideo">
        <video
          ref="videoEl"
          v-intersection-observer="onIntersectionObserver"
          :controls="showControls"
          controlslist="nodownload"
          playsinline
          :aria-labelledby="'#' + labelId"
          :muted="blockData.content['try-autoplay']"
          :poster="blockData.content['poster-url']"
          :src="blockData.content.url"
          class="full-image__image"
        ></video>
      </template>
      <template v-else>
        <img
          v-if="!isVideo"
          :aria-labelledby="'#' + labelId"
          :src="blockData.content.url"
          :alt="blockData.content.alt"
          class="full-image__image"
        />
      </template>
    </component>
    <component
      class="wrapper"
      :is="labelLink ? 'a' : 'span'"
      :href="labelLink ? labelLink : undefined"
      :target="labelLink ? '_blank' : undefined"
    >
      <label
        :id="labelId"
        v-if="blockData.content.label"
        v-html="blockData.content.label"
      >
      </label>
    </component>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from "vue";
import { vIntersectionObserver } from "@vueuse/components";
import { useGridWidthFromYaml } from "./useGridWidthFromYaml";

const props = defineProps({
  blockData: {
    type: Object,
    required: true,
  },
});

const imageLink = computed(() => {
  return props.blockData.content.link;
});

const labelId = computed<string>(() => {
  return `label-id-${Math.random() * 1000000}`;
});

const { columnsClass } = useGridWidthFromYaml(props.blockData);

const isVideo = computed(() => {
  return props.blockData.content["is-video"];
});

const labelLink = computed(() => {
  return props.blockData.content["label-link"];
});

const showControls = computed(() => {
  if (props.blockData.content["show-controls"] === undefined) {
    return true;
  }
  return props.blockData.content["show-controls"];
});

const videoEl = ref<HTMLVideoElement | null>(null);

async function onIntersectionObserver([entry]: IntersectionObserverEntry[]) {
  if (props.blockData.content["try-autoplay"] && videoEl.value) {
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
      } catch (err) {
        console.log("an error occured when trying to pause the video");
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@use "@/scss/utils/_grid.scss" as grid;

.full-image {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;

  &.col-span-4-start-5 {
    @media (max-width: 768px) {
      grid-column: 2 / span 10;
    }
  }

  &.col-span-6-start-4 {
    @media (max-width: 1024px) {
      grid-column: 2 / span 10;
    }
  }

  &.col-span-10-start-2 {
    @media (max-width: 1024px) {
      grid-column: span 12;
    }
  }

  &.full {
    grid-column: 1 / -1;
    width: 100vw;
    margin-left: calc(-1 * grid.$container-padding);
    margin-right: calc(-1 * grid.$container-padding);
  }
}

.full-image__image {
  width: 100%;
  object-fit: cover;
}

label,
a label {
  margin-top: calc-rem(50);
  text-align: center;
  color: var(--color-grijs-10);
  display: block;
  cursor: pointer;
}
</style>
