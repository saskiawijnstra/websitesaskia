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

    <div class="jump-links col-span-3">
      <div
        class="jump-link"
        v-for="(linkData, index) in data.introduction['jump-links']"
        :key="index"
      >
        <link-arrow />
        <dl>
          <dt>
            {{ linkData.annotation[locale] }}
          </dt>
          <dd>
            <template v-if="linkData.type === 'annotated-link'">
              <router-link
                v-html="parseContent(linkData.name[locale])"
                :to="`/work/${linkData.target}`"
              >
              </router-link>
            </template>
            <template v-if="linkData.type === 'link-list'">
              <span v-for="(link, index) in linkData.links" :key="link.target">
                <router-link
                  v-html="parseContent(link.name[locale])"
                  :to="`/work/${link.target}`"
                >
                </router-link>
                <template v-if="index < linkData.links.length - 1">
                  {{ ", " }}
                </template>
              </span>
            </template>
          </dd>
        </dl>
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
import yamlDataAbout from "@/content/about-page-data.yaml";
import QuoteBlock from "../elements/project-page-blocks/QuoteBlock.vue";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import FullImage from "../elements/project-page-blocks/FullImage.vue";
import { useMarkdownParser } from "../elements/useMarkdownParser";
import LinkArrow from "../elements/LinkArrow.vue";
const data = computed(() => yamlDataAbout);

const { locale } = useI18n();

const { formatText } = useMarkdownParser();

function parseContent(content: string): string {
  return formatText(content);
}
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

.jump-links {
  align-self: center;
  display: flex;
  gap: 109px;
  flex-direction: column;

  .jump-link {
    display: flex;
    align-items: center;
    gap: calc-rem(16);
  }

  dt {
    margin-bottom: 5px;
  }
}

dd,
dt,
dl {
  margin: 0;
  padding: 0;
}
</style>
