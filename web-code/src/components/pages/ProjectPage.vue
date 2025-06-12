<template>
  <div class="content-page project-page">
    <article class="grid-container">
      <div class="blocks-wrapper col-span-12">
        <component
          v-for="(blockData, index) in layoutBlocks"
          :key="index"
          :is="getComponentName(blockData.type)"
          :block-data="blockData"
        />
      </div>

      <div class="back-link-wrapper col-span-12">
        <router-link class="back-link" to="/">{{
          t("project-page-backlink")
        }}</router-link>
      </div>
    </article>

    <grid-test />
  </div>
</template>

<script setup lang="ts">
type LayoutBlock = {
  type: string;
  [key: string]: unknown;
};

import { computed, type Component, ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

import gridTest from "../grid-test.vue";
import HeroMedia from "../elements/project-page-blocks/HeroMedia.vue";
import MetaInfoRow from "../elements/project-page-blocks/MetaInfoRow.vue";
import TextBlock from "../elements/project-page-blocks/TextBlock.vue";
import ImageRow from "../elements/project-page-blocks/ImageRow.vue";
import ImageRow4Tilted from "../elements/project-page-blocks/ImageRow4Tilted.vue";
import QuoteBlock from "../elements/project-page-blocks/QuoteBlock.vue";
import FullImage from "../elements/project-page-blocks/FullImage.vue";
import ColorSwatchRow from "../elements/project-page-blocks/ColorSwatchRow.vue";
import AppScreensGrid from "../elements/project-page-blocks/AppScreensGrid.vue";
import ImageMosaic from "../elements/project-page-blocks/image-mosaic.vue";
import SwipeGallery from "../elements/project-page-blocks/SwipeGallery.vue";

import { useI18n } from "vue-i18n";
import { useTitle } from "@vueuse/core";

const { t, locale } = useI18n();

const route = useRoute();

const title = useTitle();

const currentProject = computed(() => {
  return route.params.projectId;
});

const PROJECT_DATA = import.meta.glob("../../content/projects/**.yaml");

const currentProjectData = computed(async () => {
  const id = currentProject.value;

  const entries = await Promise.all(
    Object.entries(PROJECT_DATA)
      .filter(([path]) => path.endsWith(`_${locale.value}.yaml`))
      .map(async ([path, importer]: [string, any]) => {
        const data = await importer();
        return { data: data.default, path };
      }),
  );

  const dataEntry = entries.find((entry) => entry.data?.projectId === id);

  if (!dataEntry) {
    console.warn(`No project found with id: "${id}".`);
    return { content: "404" };
  }

  title.value = `${t("page-title-prefix")} ${dataEntry.data.page.title ? "| " + dataEntry.data.page.title : ""}`;

  return dataEntry.data;
});

const layoutBlocks = ref<LayoutBlock[]>([]);

const loadProjectData = async () => {
  const projectData = await currentProjectData.value;

  if (projectData && projectData.page?.sections) {
    layoutBlocks.value = [...projectData.page.sections];
  }
};

onMounted(loadProjectData);

watch(locale, async () => {
  await loadProjectData();
});

const getComponentName = (type: string) => {
  const componentMap: Record<string, Component> = {
    "hero-media": HeroMedia,
    "meta-info-row": MetaInfoRow,
    "text-block": TextBlock,
    "image-row": ImageRow,
    "image-row-4-tilted": ImageRow4Tilted,
    "quote-block": QuoteBlock,
    "full-image": FullImage,
    "color-swatch-row": ColorSwatchRow,
    "app-screens-grid": AppScreensGrid,
    "image-mosaic": ImageMosaic,
    "swipe-gallery": SwipeGallery,
  };

  return componentMap[type] || "UnknownBlock";
};
</script>

<style lang="scss" scoped>
.project-page {
  article {
    .blocks-wrapper {
      display: grid;
      grid-template-columns: subgrid;

      &::v-deep(.project-block) {
        margin-top: 50px;
        margin-bottom: 50px;

        @media (max-width: 1024px) {
          margin-top: 25px;
          margin-bottom: 25px;
        }
      }
    }
    .back-link {
      margin-top: 50px;
      margin-bottom: 50px;
      display: grid;
      text-align: center;
      color: var(--color-default-text);
      text-decoration: none;

      &:hover {
        color: var(--color-text-hover);
      }
    }
  }
}
</style>
