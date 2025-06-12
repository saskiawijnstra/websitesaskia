<template>
  <div class="project-teaser col-span-6">
    <router-link :to="{ path: `/work/${projectId}` }">
      <project-thumbnail
        :thumbnail-path="thumbnailData.path"
        :poster-path="thumbnailData.poster"
        :is-video="thumbnailData['is-video']"
        :alt-text="thumbnailData.alt[locale as 'en' | 'nl']"
      />
      <h2>
        <slot name="title"></slot>
      </h2>
    </router-link>
    <p>
      <slot name="description"></slot>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import projectThumbnail from "./project-thumbnail.vue";

const { locale } = useI18n();

defineProps<{
  thumbnailData: {
    path: string;
    poster?: string;
    ["is-video"]?: boolean;
    alt: {
      en: string;
      nl: string;
    };
  };
  projectId: string;
}>();
</script>
<style lang="scss" scoped>
.project-teaser {
  display: flex;
  flex-direction: column;
  gap: calc-rem(26px);

  a {
    text-decoration: none;
    color: var(--color-default-text);
  }
}
</style>
