<template>
  <article class="about">
    <GridTest />
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

    <div class="education block grid-container">
      <img
        class="col-span-4-start-1"
        :src="data.education.portrait.url"
        :alt="data.education.portrait.alt[locale]"
      />

      <dl class="col-span-6-start-6">
        <h3 class="col-span-12">{{ data.education.heading[locale] }}</h3>
        <div
          class="education-entry"
          v-for="(education, index) in data.education.educations"
          :key="index"
          :class="{ indented: education.indent }"
        >
          <img :src="education['icon-path']" />
          <div class="text">
            <dt>{{ education.title[locale] }}</dt>
            <dd v-html="education.description[locale]"></dd>
            <dd>{{ education.time[locale] }}</dd>
          </div>
        </div>
      </dl>
    </div>

    <div class="skills block grid-container">
      <div class="skills-lists col-span-6">
        <div
          v-for="(list, index) in data.skills.lists"
          :key="index"
          class="skill-list"
        >
          <h3>{{ list.heading[locale] }}</h3>
          <ul>
            <li v-for="(item, idx) in list.items" :key="idx">
              <span>{{ item[locale] }}</span>
              <template v-if="item.subitems">
                <ul>
                  <li v-for="(subitem, subidx) in item.subitems" :key="subidx">
                    {{ subitem[locale] }}
                  </li>
                </ul>
              </template>
            </li>
          </ul>
        </div>
      </div>

      <div class="skills-images col-span-6-start-7">
        <img
          v-for="(image, index) in data.skills.images"
          :key="index"
          :src="image.url"
          :alt="image.alt[locale]"
          :class="'img-' + (index + 1)"
        />
      </div>
    </div>

    <div class="interests block grid-container">
      <h3 class="col-span-12">{{ data.interests.heading[locale] }}</h3>

      <div
        class="interest-category col-span-3"
        v-for="(category, index) in data.interests.categories"
        :key="index"
      >
        <img :src="category.icon" :alt="category.title[locale]" class="icon" />
        <h4>{{ category.title[locale] }}</h4>
        <ul>
          <li v-for="(item, idx) in category.items" :key="idx">
            {{ item[locale] }}
          </li>
        </ul>
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
import GridTest from "../grid-test.vue";
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

.introtext {
  @media (max-width: 1100px) {
    grid-column: 2 / span 10;
  }
}

.jump-links {
  align-self: center;
  display: flex;
  gap: 109px;
  flex-direction: column;
  margin: 0 auto;

  @media (max-width: 1100px) {
    width: 100%;
    grid-column: span 12;
    flex-direction: row;
    margin-top: 40px;
    gap: 20px;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
  }

  @media (max-width: 920px) {
    flex-direction: column;
    align-items: flex-start;
    width: max-content;
  }

  .jump-link {
    display: flex;
    align-items: center;
    gap: calc-rem(16);

    @media (max-width: 1100px) {
      min-width: 200px;
      max-width: 33%;
    }

    @media (max-width: 1100px) {
      min-width: 200px;
      max-width: 100%;
    }
  }

  dt {
    margin-bottom: 5px;
  }
}

h3 {
  font-size: calc-rem(24px);
  margin-bottom: 60px;
}

.experiences {
  @media (max-width: 1100px) {
    // display: block;
    // border: 1px solid red;
  }
  dl {
    @media (max-width: 1100px) {
      grid-column: 1 / span 12;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    @media (max-width: 850px) {
      display: block;
    }
    .experience {
      display: flex;
      align-items: center;
      gap: 45px;
      margin-bottom: 30px;

      @media (max-width: 1100px) {
        // border: 2px solid green;
        width: 50%;
      }

      @media (max-width: 850px) {
        width: 100%;
        gap: 20px;
      }
      img {
        width: 84px;
        @media (max-width: 420px) {
          width: 64px;
        }
      }

      dt,
      dd {
        line-height: calc-rem(28px);
        min-width: 300px;

        @media (max-width: 600px) {
          min-width: 0;
        }
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
}

.tilted-images {
  @media (max-width: 1100px) {
    grid-column: 2 / span 10;
  }
  .img-1 {
    width: 820px;
    max-width: 100%;

    transform: rotate(-5.68deg);
  }

  .img-2 {
    width: 712px;
    max-width: 90%;
    transform: translateX(100px) rotate(5.38deg);

    @media (max-width: 600px) {
      transform: translateX(8%) rotate(5.38deg);
    }
  }
}

.education {
  h3 {
    font-size: calc-rem(24px);
    margin-bottom: 60px;
    margin-top: 0;
    padding-top: 0;
  }

  img {
    width: 100%;
  }

  .education-entry {
    display: flex;
    align-items: center;
    gap: 45px;
    margin-bottom: 30px;

    &.indented {
      margin-left: 50px; // kannst du an dein Grid anpassen
    }

    img {
      width: 84px;
    }

    dt,
    dd {
      line-height: calc-rem(28px);
    }

    dt {
      font-weight: 700;
    }

    dd {
      margin: 0;
    }

    dd + dd {
      margin-top: 5px;
    }
  }
}

.skills {
  .skills-lists {
    column-count: 2;

    .skill-list {
      break-inside: avoid-column;
      margin-bottom: 60px;

      h3 {
        margin-top: 0;
        margin-bottom: 40px;
      }

      ul {
        list-style: disc;
        padding-left: 20px;

        li {
          margin-bottom: 8px;
          margin: 0;
          line-height: calc-rem(28);

          ul {
            list-style: disc;
            padding-left: 20px;
            margin: 0px;
            columns: 2;
            column-gap: 30px;
          }
        }
      }
    }
  }

  .skills-images {
    position: relative;
    img {
      max-width: 45%;
      width: 562px;
      position: absolute;
    }

    .img-2 {
      width: 466px;
      transform: translateX(100%) translateY(40px) rotate(12deg);
      z-index: -1;
    }
  }
}

.interests {
  h3 {
    font-size: calc-rem(24px);
    margin-bottom: 60px;
    font-style: italic;
    font-weight: 700;
  }

  .interest-category {
    .icon {
      width: 64px;
      margin-bottom: 20px;
    }

    h4 {
      font-style: italic;
      font-weight: 600;
      margin: 0;
      margin-bottom: 0;
      line-height: calc-rem(28px);
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        line-height: calc-rem(28px);
      }
    }
  }
}

dd,
dt,
dl {
  margin: 0;
  padding: 0;
}
</style>
