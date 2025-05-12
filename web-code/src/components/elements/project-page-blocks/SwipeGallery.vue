<template>
  <div class="project-block swipe-gallery full">
    <div class="scroll-wrapper" :class="`color-scheme-${colorScheme}`">
      <transition name="fade">
        <button
          v-if="canScrollLeft"
          class="scroll-button left"
          @click="scrollNext(-1)"
        >
          <arrow-right />
        </button>
      </transition>

      <transition name="fade">
        <button
          v-if="canScrollRight"
          class="scroll-button right"
          @click="scrollNext(1)"
        >
          <arrow-right />
        </button>
      </transition>

      <div class="horizontal-scroll-gallery" ref="scrollContainerEl">
        <div class="gallery-track">
          <div
            v-for="(image, index) in blockData.content.images"
            :key="index"
            class="gallery-item"
          >
            <img
              :src="image.url"
              :alt="image.alt"
              :style="
                image['is-portrait']
                  ? `width: ${blockData.height}px`
                  : `height: ${blockData.height}px`
              "
            />
          </div>
        </div>
      </div>
    </div>
    <label v-if="blockData.content.label" v-html="blockData.content.label">
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from "vue";
import ArrowRight from "@/assets/images/arrow-right.svg?component";
import { storeToRefs } from "pinia";
import { useUiStore } from "../../../stores/uiStore";

defineProps({
  blockData: { type: Object, required: true },
});

const uiStore = useUiStore();
const { colorScheme } = storeToRefs(uiStore);

const scrollContainerEl = ref<HTMLDivElement | null>(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(false);

function updateScrollState() {
  const el = scrollContainerEl.value;
  if (!el) return;
  canScrollLeft.value = el.scrollLeft > 0;
  canScrollRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth;
}

function scrollNext(direction: -1 | 1) {
  scrollContainerEl.value?.scrollBy({
    left: 300 * direction,
    behavior: "smooth",
  });
}

onMounted(() => {
  scrollContainerEl.value?.addEventListener("scroll", updateScrollState);
  nextTick(() => updateScrollState());
});

onUnmounted(() => {
  scrollContainerEl.value?.removeEventListener("scroll", updateScrollState);
});
</script>

<style lang="scss" scoped>
@use "@/scss/utils/_grid.scss" as grid;

.swipe-gallery {
  width: 100%;

  &.full {
    grid-column: 1 / -1;
    width: 100vw;
    margin-left: calc(-1 * grid.$container-padding);
    margin-right: calc(-1 * grid.$container-padding);
  }
}
.scroll-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &::after,
  &::before {
    // scroll gradient
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    pointer-events: none;
    transform: translateY(-5%);
    height: 110%;
    background: linear-gradient(
      90deg,
      #16161600 0%,
      var(--color-default-background) 100%
    );
    width: 44.5px;
  }

  &::before {
    right: auto;
    left: 0;
    transform: translateY(-5%) rotate(180deg);
  }
  &.color-scheme-light {
    &::after,
    &::before {
      background: linear-gradient(
        90deg,
        rgba(223, 227, 237, 0) 0%,
        var(--color-default-background) 100%
      );
    }
  }
}

.scroll-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%) translateY(calc-rem(-10px)); // 10 is the offset from the tracks margin bottom
  border: none;
  border-radius: 50%;
  background-color: var(--color-default-text);
  height: 32px;
  width: 32px;
  z-index: 1;
  display: grid;
  place-items: center;
}

.scroll-button.left {
  left: 2%;
  transform: translateY(-50%) translateY(calc-rem(-10px)) rotate(-180deg); // 10 is the offset from the tracks margin bottom
}

.scroll-button.right {
  right: 2%;
}

.scroll-button ::v-deep(path) {
  fill: var(--color-default-background);
}

.horizontal-scroll-gallery {
  height: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  touch-action: pan-x;
  scroll-padding-left: 45px;
  box-sizing: border-box;
  padding: 0 45px;
  padding-bottom: calc-rem(20);
}

.gallery-track {
  display: flex;
  height: 100%;
  gap: 2rem;
  min-width: max-content;
  align-items: center;
}

.gallery-item {
  flex: 0 0 auto;
  scroll-snap-align: start;
}

.gallery-item img {
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
label {
  display: block;
  margin: 0 auto;
  margin-top: calc-rem(50);
  text-align: center;
  color: var(--color-grijs-10);
}
</style>
