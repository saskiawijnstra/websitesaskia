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
      <p>
        <slot name="description"></slot>
        <arrow-right class="link-arrow" />
      </p>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import projectThumbnail from "./project-thumbnail.vue";
import ArrowRight from "@/assets/images/arrow-right.svg?component";

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

  .link-arrow {
    transform: translateX(0) translateY(0.2rem);
    transition: transform 0.2s ease-in-out;
    width: 18px;
    height: 16px;
    margin-left: 0.5rem;

    &::v-deep(path) {
      fill: var(--color-default-text);
    }
  }

  a {
    text-decoration: none;
    color: var(--color-default-text);

    &:hover {
      .link-arrow {
        transform: translateX(12px) translateY(0.2rem);
      }
    }
  }
}
</style>
