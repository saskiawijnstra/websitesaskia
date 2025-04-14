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

      <div
        class="factor-e-box grid-container"
        :class="`color-scheme-${colorScheme}`"
      >
        <div class="introduction col-span-6">
          <!-- this h2 looks like the h1-style. there sould only be one h1 per page (WCAG) -->
          <h2 class="h1">{{ yamlDataWork["factor-e"].title[locale] }}</h2>
          <p v-html="yamlDataWork['factor-e'].description[locale]"></p>
        </div>
        <div class="twin-qels-teaser col-span-6">
          <div class="screenshots">
            <img
              v-for="image in yamlDataWork['factor-e']['twin-qels-teaser']
                .images"
              :src="`/images/projects/twin-qels-teaser-screenshots/${image['image-name']}`"
              :alt="image['alt-text'][locale]"
            />
          </div>
          <p>TwinQels</p>
        </div>
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
import { computed } from "vue";
import { useUiStore } from "../../stores/uiStore";
import { storeToRefs } from "pinia";

const { locale } = useI18n();

const projects = computed(() => {
  return yamlDataWork.discover.projects;
});

const uiStore = useUiStore();
const { colorScheme } = storeToRefs(uiStore);
</script>

<style lang="scss" scoped>
.work-view {
  .discover-work-list {
    .content {
      display: grid;
      grid-template-columns: subgrid;

      row-gap: calc-rem(140px);
      > :nth-child(even) {
        transform: translateY(calc-rem(-73px));
      }
    }
  }

  .factor-e-box {
    background-color: var(--color-grijs-1);
    padding-top: 100px;
    padding-bottom: 118px;

    .h1 {
      margin-top: 0;
    }

    &.color-scheme-light {
      background-color: var(--color-area-background-lightmode);
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
    }
  }
}
</style>
