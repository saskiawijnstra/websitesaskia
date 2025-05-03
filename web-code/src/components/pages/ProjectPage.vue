<template>
  <div class="content-page project-page">
    {{ currentProject }}

    <article class="grid-container">
      <div class="blocks-wrapper col-span-12">
        {{ currentProjectData }}...

        {{ layoutBlocks }}
        <br />

        <component
          v-for="(blockData, index) in layoutBlocks"
          :key="index"
          :is="getComponentName(blockData.type)"
          :block-data="blockData"
        />
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed, type Component } from "vue";
import { useRoute } from "vue-router";

import HeroMedia from "../elements/project-page-blocks/HeroMedia.vue";

const route = useRoute();

const currentProject = computed(() => {
  return route.params.projectId;
});

const PROJECT_DATA = import.meta.glob("../../content/projects/**.yaml", {
  eager: true,
});

const currentProjectData = computed(() => {
  const id = currentProject.value;
  console.log(Object.values(PROJECT_DATA));

  const dataEntryWrapper = Object.values(PROJECT_DATA).find(
    (data: any) => data.default?.projectId === id,
  );

  // @ts-ignore
  if (!dataEntryWrapper || !dataEntryWrapper.default) {
    console.warn(`Kein Projekt mit projectId "${id}" gefunden.`);
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
  };

  return componentMap[type] || "UnknownBlock";
};
</script>
