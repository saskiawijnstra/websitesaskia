<template>
  <article class="about">
    <div class="introduction-1 block grid-container">
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
    </div>
    <div class="introduction-2 block grid-container">
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
                <span
                  v-for="(link, index) in linkData.links"
                  :key="link.target"
                >
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
    </div>

    <div class="experiences block grid-container">
      <h3 class="col-span-12">{{ data.experience.heading[locale] }}</h3>
      <dl class="col-span-4-start-1">
        <div
          class="experience"
          v-for="(experience, index) in data.experience.experiences"
          :key="index"
        >
          <img :src="experience['icon-path']" />
          <div class="text">
            <dt>{{ experience.title[locale] }}</dt>
            <dd>
              <span>{{ experience.description[locale] }}</span>
              <span>{{ experience.time[locale] }}</span>
            </dd>
          </div>
        </div>
      </dl>
      <div class="tilted-images col-span-6-start-6">
        <img
          class="img-1"
          :src="data.experience['image-1'].url"
          :alt="data.experience['image-1'].alt[locale]"
        />
        <img
          class="img-2"
          :src="data.experience['image-2'].url"
          :alt="data.experience['image-2'].alt[locale]"
        />
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
  .block {
    margin-bottom: 100px;
  }
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

.experiences {
  h3 {
    font-size: calc-rem(24px);
    margin-bottom: 60px;
  }
  .experience {
    display: flex;
    align-items: center;
    gap: 45px;
    margin-bottom: 30px;

    img {
      width: 84px;
    }

    dt,
    dd {
      line-height: calc-rem(28px);
      width: 300px;
    }

    dt {
      font-weight: 700;
    }

    dd {
      span {
        display: block;
      }
    }
  }
}

.tilted-images {
  .img-1 {
    width: 820px;
    max-width: 100%;

    transform: rotate(-5.68deg);
  }

  .img-2 {
    width: 712px;
    max-width: 90%;
    transform: translateX(100px) rotate(5.38deg);
  }
}

dd,
dt,
dl {
  margin: 0;
  padding: 0;
}
</style>
