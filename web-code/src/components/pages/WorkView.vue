<template>
  <div class="content-page work-view">
    <article class="">
      <!-- Discover my Work -->
      <div class="discover-work-list grid-container">
        <div class="introduction col-span-6">
          <h1 v-html="yamlDataWork.discover.title[locale]"></h1>
        </div>
        <br />
        <div class="content col-span-12">
          <project-teaser
            v-for="project in projects"
            :key="project.id"
            :project-id="project.id"
            :thumbnail-path="project.thumbnail.path"
            :thumbnail-alt-text="project.thumbnail.alt[locale]"
          >
            <template #title>
              <span v-html="project.title[locale]" />
            </template>
            <template #description>
              <span v-html="project.description[locale]" />
            </template>
          </project-teaser>
        </div>
      </div>

      <div class="factor-e-box" :class="`color-scheme-${colorScheme}`">
        <div class="grid-container">
          <div class="introduction col-span-6">
            <!-- this h2 looks like the h1-style. there sould only be one h1 per page (WCAG) -->
            <h2 class="h1">{{ yamlDataWork["factor-e"].title[locale] }}</h2>
            <p v-html="yamlDataWork['factor-e'].description[locale]"></p>
          </div>
          <div class="twin-qels-teaser col-span-6">
            <router-link to="work/twin-qels">
              <div class="screenshots">
                <img
                  v-for="image in yamlDataWork['factor-e']['twin-qels-teaser']
                    .images"
                  :src="`/images/projects/twin-qels-teaser-screenshots/${image['image-name']}`"
                  :alt="image['alt-text'][locale]"
                />
              </div>
              <p>TwinQels</p>
            </router-link>
          </div>
        </div>
        <div class="scroll-wrapper">
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
                v-for="project in factorEShowcaseProjects"
                :key="project.id"
                class="gallery-item"
              >
                <router-link :to="`work/${project.id}`">
                  <img
                    :src="project.thumbnail.path"
                    :alt="project.thumbnail.alt[locale]"
                  />
                  <p class="caption">{{ project.title[locale] }}</p>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="more-designs grid-container">
        <h2 class="h1 col-span-6">
          {{ yamlDataWork["more-designs"].title[locale] }}
        </h2>
        <ul class="design-list col-span-12-start-1">
          <li class="col-span-4" v-for="entry in moreDesignsData">
            <router-link :to="`/work/${entry.id}`">
              <img
                :src="entry.thumbnail.path"
                :alt="entry.thumbnail.alt[locale]"
              />
              <p v-html="entry.title[locale]"></p>
            </router-link>
          </li>
        </ul>
      </div>
    </article>
    <grid-test />
  </div>
</template>

<script setup lang="ts">
import gridTest from "../grid-test.vue";
import ProjectTeaser from "../elements/work/project-teaser.vue";
import yamlDataWork from "@/content/work-page-data.yaml";
import { useI18n } from "vue-i18n";
import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";
import { useUiStore } from "../../stores/uiStore";
import { storeToRefs } from "pinia";
import ArrowRight from "@/assets/images/arrow-right.svg?component";

const { locale } = useI18n();

const projects = computed(() => {
  return yamlDataWork.discover.projects;
});

const factorEShowcaseProjects = computed(() => {
  return yamlDataWork["factor-e"]["showcase"];
});

const moreDesignsData = computed(() => {
  return yamlDataWork["more-designs"].projects;
});

const uiStore = useUiStore();
const { colorScheme } = storeToRefs(uiStore);

const scrollContainerEl = ref<HTMLDivElement>();

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
  window.addEventListener("resize", updateScrollState);
  scrollContainerEl.value?.addEventListener("scroll", updateScrollState);
  nextTick(() => updateScrollState()); // initial check
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScrollState);
  scrollContainerEl.value?.removeEventListener("scroll", updateScrollState);
});
</script>

<style lang="scss" scoped>
.work-view {
  p {
    line-height: calc-rem(28px);
  }
  .discover-work-list {
    .content {
      display: grid;
      grid-template-columns: subgrid;
      row-gap: calc-rem(140px);

      > :nth-child(even) {
        transform: translateY(calc-rem(-73px));

        @media (max-width: 768px) {
          transform: none;
        }
      }

      @media (max-width: 768px) {
        display: block;
      }
    }
  }

  .factor-e-box {
    background-color: var(--color-grijs-1);
    padding-top: 100px;
    padding-bottom: 118px;

    .introduction,
    .twin-qels-teaser {
      @media (max-width: 768px) {
        grid-column: 1 / span 12;
      }
    }

    .h1 {
      margin-top: 0;
      margin-bottom: 60px;
    }

    &.color-scheme-light {
      background-color: var(--color-area-background-lightmode);
      .scroll-wrapper {
        &::after {
          background: linear-gradient(
            90deg,
            rgba(223, 227, 237, 0) 0%,
            rgba(223, 227, 237, 1) 100%
          );
        }
      }
    }

    .twin-qels-teaser {
      // display: grid;
      // grid-template-columns: subgrid;
      .screenshots {
        display: flex;
        // gap: 30px;
        justify-content: space-between;
        img {
          display: block;
          width: calc(20%);
          object-fit: contain;
        }
      }

      a {
        text-decoration: none;
        color: var(--color-default-text);

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .scroll-wrapper {
      position: relative;
      width: 100vw;
      margin-top: 100px;

      .scroll-button {
        position: absolute;
        top: 41%;
        transform: translateY(-50%);
        border: none;
        border-radius: 50%;
        outline: none;
        background-color: var(--color-default-text);
        height: calc-rem(32);
        width: calc-rem(32);
        z-index: 1;
        display: grid;
        place-items: center;

        &::v-deep(path) {
          fill: var(--color-default-background);
        }

        &.left {
          left: 2%;
          transform: translateY(-50%) rotate(-180deg);
        }
        &.right {
          right: 2%;
        }
      }
      &::after {
        // scroll gradient
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        background: linear-gradient(
          90deg,
          #16161600 0%,
          var(--color-grijs-1) 100%
        );
        width: 44.5px;
      }
    }
    .horizontal-scroll-gallery {
      overflow-x: auto;
      // padding: 2rem 0;
      scroll-snap-type: x mandatory;
      touch-action: pan-x;
      scroll-padding-left: 45px;
      box-sizing: border-box;
      padding: 0 45px;

      .gallery-track {
        display: flex;
        gap: 2rem;
        min-width: max-content;
      }

      .gallery-item {
        flex: 0 0 auto;
        width: calc(50vw - 90px);
        aspect-ratio: 671 / 450;
        // height: 450px;
        scroll-snap-align: start;
        text-align: center;
        max-width: 610px;

        @media (max-width: 768px) {
          width: calc(70vw);
        }

        a {
          text-decoration: none;
          color: var(--color-default-text);
          text-align: left;

          &:hover {
            p {
              &::after {
                transform: translateX(12px);
              }
            }
          }

          p {
            display: flex;
            gap: 0.5rem;
            align-items: center;
            &::after {
              content: "";
              display: inline-block;
              transform: translateX(0);
              transition: transform 0.2s ease-in-out;
              width: 18px;
              height: 16px;
              background-image: url(@/assets/images/arrow-right.svg);
            }
          }
        }

        img {
          width: 100%;
          border-radius: 12px;
          height: 100%;
          object-fit: cover;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .caption {
          margin-top: 0.5rem;
          font-size: 1rem;
          font-weight: 500;
        }
      }
    }
  }

  .more-designs {
    .h1 {
      margin-top: calc-rem(121px);
      margin-bottom: calc-rem(100px);
    }
    ul {
      list-style: none;
      display: grid;
      grid-template-columns: subgrid;
      margin: 0;
      padding: 0;

      li {
        list-style: none;
        display: block;
        margin: 0;
        padding: 0;

        @media (max-width: 768px) {
          grid-column: span 6;
        }

        a {
          text-decoration: none;
          color: var(--color-default-text);

          &:hover {
            text-decoration: underline;
          }
        }
        img {
          display: block;
          object-fit: contain;
          aspect-ratio: 428 / 287;
          width: 100%;
        }
      }
    }
  }
}
</style>
