<template>
  <article class="about grid-container">
    <quote-block
      :blockData="{
        textAlign: 'left',
        content: {
          text: data.introduction.quote[locale],
        },
      }"
    />

    <FullImage
      style="margin-top: 100px"
      :blockData="{
        content: {
          url: data.introduction.image.url,
          alt: data.introduction.image.alt,
          width: 'grid-10',
        },
      }"
    />

    <div class="introtext col-span-6-start-4">
      <h1>{{ data.introduction.text.title[locale] }}</h1>
      <p v-html="data.introduction.text.article[locale]"></p>
    </div>

    <div class="jump-links col-span-3"></div>
  </article>
</template>

<script lang="ts" setup>
import yamlDataAbout from "@/content/about-page-data.yaml";
import QuoteBlock from "../elements/project-page-blocks/QuoteBlock.vue";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import FullImage from "../elements/project-page-blocks/FullImage.vue";

const data = computed(() => yamlDataAbout);

const { locale } = useI18n();
</script>

<style lang="scss" scoped>
.about {
  h1 {
    font-weight: 600;
  }
  p {
    line-height: calc-rem(28px);
  }
  a,
  ::v-deep(a) {
    text-decoration: none;
    color: var(--color-default-text);
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
