<template>
  <div class="content-page">
    <article class="">
      <div class="work-list grid-container">
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

// Change this to 'nl' or 'en' depending on user preference
const { locale } = useI18n();

const projects = computed(() => {
  return yamlDataWork.discover.projects;
});
</script>

<style lang="scss" scoped>
.work-list {
  .content {
    display: grid;
    grid-template-columns: subgrid;

    row-gap: calc-rem(140px);
    > :nth-child(even) {
      transform: translateY(calc-rem(-73px));
    }
  }
}
</style>
