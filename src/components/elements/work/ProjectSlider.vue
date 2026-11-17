<template>
  <section
    class="project-slider"
    aria-roledescription="carousel"
    :aria-label="carouselLabel"
    @mouseenter="pause"
    @mouseleave="resume"
    @focusin="pause"
    @focusout="resume"
    @touchstart.passive="pause"
    @touchend.passive="resume"
  >
    <div class="slider-wrapper">
      <button
        v-if="images.length > 1"
        class="slider-button prev"
        type="button"
        :aria-label="labels.prev"
        @click="goTo(activeIndex - 1)"
      >
        <arrow-right />
      </button>
      <button
        v-if="images.length > 1"
        class="slider-button next"
        type="button"
        :aria-label="labels.next"
        @click="goTo(activeIndex + 1)"
      >
        <arrow-right />
      </button>

      <ul
        class="slider-track"
        ref="trackEl"
        tabindex="0"
        :style="aspectRatio ? { aspectRatio } : undefined"
        @scroll.passive="onScroll"
        @keydown.left.prevent="goTo(activeIndex - 1)"
        @keydown.right.prevent="goTo(activeIndex + 1)"
      >
        <li
          v-for="(image, index) in images"
          :key="image.path"
          class="slide"
          role="group"
          aria-roledescription="slide"
          :aria-label="`${index + 1} / ${images.length}`"
        >
          <video
            v-if="image['is-video']"
            :src="image.path"
            :poster="image.poster"
            :aria-label="image.alt?.[locale] || undefined"
            playsinline
            muted
            loop
            autoplay
            @loadedmetadata="index === 0 && onFirstMediaLoad($event)"
          ></video>
          <img
            v-else
            :src="image.path"
            :alt="image.alt?.[locale] || ''"
            :loading="index === 0 ? 'eager' : 'lazy'"
            draggable="false"
            @load="index === 0 && onFirstMediaLoad($event)"
          />
        </li>
      </ul>
    </div>

    <div v-if="images.length > 1" class="slider-dots">
      <button
        v-for="(image, index) in images"
        :key="image.path"
        type="button"
        class="dot"
        :class="{ active: index === activeIndex }"
        :aria-label="`${labels.goTo} ${index + 1}`"
        :aria-current="index === activeIndex"
        @click="goTo(index)"
      />
    </div>

    <div class="slider-text">
      <!-- h2, like project-teaser.vue, so the title gets the same global h2 styling (24px) -->
      <h2 class="slider-title"><slot name="title" /></h2>
      <p class="slider-description"><slot name="description" /></p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import ArrowRight from "@/assets/images/arrow-right.svg?component";

type SlideImage = {
  path: string;
  poster?: string;
  ["is-video"]?: boolean;
  alt?: Record<string, string>;
};

const props = withDefaults(
  defineProps<{
    images: SlideImage[];
    label?: string;
    /** time between automatic slides, in milliseconds */
    interval?: number;
  }>(),
  { interval: 3000 },
);

const { locale } = useI18n();

const trackEl = ref<HTMLUListElement>();
const activeIndex = ref(0);

// The slider takes the proportions of the first image, so its height matches
// a normal thumbnail of the same width (images in a slider should share one ratio).
const aspectRatio = ref<string>();

// works for both an image (naturalWidth) and a video (videoWidth)
function onFirstMediaLoad(event: Event) {
  const el = event.target as HTMLImageElement & HTMLVideoElement;
  const width = el.naturalWidth || el.videoWidth;
  const height = el.naturalHeight || el.videoHeight;
  if (width && height) {
    aspectRatio.value = `${width} / ${height}`;
  }
}

const labels = computed(() =>
  locale.value === "nl"
    ? { prev: "Vorige afbeelding", next: "Volgende afbeelding", goTo: "Ga naar afbeelding" }
    : { prev: "Previous image", next: "Next image", goTo: "Go to image" },
);

const carouselLabel = computed(() => props.label || "Image slider");

function onScroll() {
  const el = trackEl.value;
  if (!el || !el.clientWidth) return;
  activeIndex.value = Math.round(el.scrollLeft / el.clientWidth);
}

// People with "reduce motion" switched on get an instant change instead of a slide.
function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

function scrollToIndex(index: number) {
  const el = trackEl.value;
  const count = props.images.length;
  if (!el || !count) return;
  const wrapped = (index + count) % count;
  el.scrollTo({ left: wrapped * el.clientWidth, behavior: scrollBehavior() });
}

// Manual navigation (arrows, dots, keyboard). Wraps around at both ends.
function goTo(index: number) {
  scrollToIndex(index);
  start(); // restart the 3-second countdown
}

// --- autoplay ---------------------------------------------------------------
let timer: number | undefined;
let paused = false;

function start() {
  stop();
  if (paused || props.images.length < 2) return;
  timer = window.setInterval(() => {
    scrollToIndex(activeIndex.value + 1);
  }, props.interval);
}

function stop() {
  if (timer !== undefined) {
    window.clearInterval(timer);
    timer = undefined;
  }
}

function pause() {
  paused = true;
  stop();
}

function resume() {
  paused = false;
  start();
}

onMounted(start);
onUnmounted(stop);
</script>

<style lang="scss" scoped>
.project-slider {
  // sits in the 12-column "content" grid of WorkView
  grid-column: span 6;
  min-width: 0;

  @media (max-width: 768px) {
    grid-column: 1 / -1;
    margin-bottom: 40px;
  }

  .slider-wrapper {
    position: relative;
  }

  .slider-track {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    border-radius: 0;

    &::-webkit-scrollbar {
      display: none;
    }

    &:focus-visible {
      outline: 2px solid var(--color-default-text);
      outline-offset: 4px;
    }
  }

  .slide {
    flex: 0 0 100%;
    scroll-snap-align: start;
    margin: 0;
    padding: 0;

    img,
    video {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 0;
      object-fit: cover;
      user-select: none;
    }
  }

  .slider-button {
    position: absolute;
    top: 50%;
    z-index: 1;
    display: grid;
    place-items: center;
    height: 32px;
    width: 32px;
    border: none;
    border-radius: 50%;
    background-color: var(--color-default-text);
    cursor: pointer;

    &::v-deep(path) {
      fill: var(--color-default-background);
    }

    &.prev {
      left: 12px;
      transform: translateY(-50%) rotate(180deg);
    }

    &.next {
      right: 12px;
      transform: translateY(-50%);
    }
  }

  .slider-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 12px;

    .dot {
      height: 8px;
      width: 8px;
      padding: 0;
      border: none;
      border-radius: 50%;
      background-color: var(--color-default-text);
      opacity: 0.3;
      cursor: pointer;
      transition: opacity 0.2s ease-in-out;

      &.active {
        opacity: 1;
      }
    }
  }

  // same spacing as project-teaser.vue (26px between image, title and text)
  .slider-text {
    display: flex;
    flex-direction: column;
    gap: calc-rem(26px);
    margin-top: calc-rem(26px);

    .slider-title,
    .slider-description {
      margin: 0;
    }
  }
}
</style>