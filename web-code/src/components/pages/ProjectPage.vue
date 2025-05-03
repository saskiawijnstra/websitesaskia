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
import { computed, type Component } from "vue";
import { useRoute } from "vue-router";

import gridTest from "../grid-test.vue";
import HeroMedia from "../elements/project-page-blocks/HeroMedia.vue";
import MetaInfoRow from "../elements/project-page-blocks/MetaInfoRow.vue";
import TextBlock from "../elements/project-page-blocks/TextBlock.vue";
import ImageRow3 from "../elements/project-page-blocks/ImageRow3.vue";
import ImageRow4Tilted from "../elements/project-page-blocks/ImageRow4Tilted.vue";
import QuoteBlock from "../elements/project-page-blocks/QuoteBlock.vue";
import FullImage from "../elements/project-page-blocks/FullImage.vue";
import ColorSwatchRow from "../elements/project-page-blocks/ColorSwatchRow.vue";

import { useI18n } from "vue-i18n";

const { t } = useI18n();

const route = useRoute();

const currentProject = computed(() => {
  return route.params.projectId;
});

const PROJECT_DATA = import.meta.glob("../../content/projects/**.yaml", {
  eager: true,
});

const currentProjectData = computed(() => {
  const id = currentProject.value;

  const dataEntryWrapper = Object.values(PROJECT_DATA).find(
    (data: any) => data.default?.projectId === id,
  );

  // @ts-ignore
  if (!dataEntryWrapper || !dataEntryWrapper.default) {
    console.warn(`No project found with id: "${id}".`);
    return { content: "404" };
  }

  // @ts-ignore
  return dataEntryWrapper.default;
});

const layoutBlocks = computed(() => {
  return [...currentProjectData.value.page?.sections];
});

const getComponentName = (type: string) => {
  const componentMap: Record<string, Component> = {
    "hero-media": HeroMedia,
    "meta-info-row": MetaInfoRow,
    "text-block": TextBlock,
    "image-row-3": ImageRow3,
    "image-row-4-tilted": ImageRow4Tilted,
    "quote-block": QuoteBlock,
    "full-image": FullImage,
    "color-swatch-row": ColorSwatchRow,
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
      }
    }
    .back-link {
      margin-top: 50px;
      display: grid;
      text-align: center;
      color: var(--color-default-text);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
