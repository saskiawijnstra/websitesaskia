<template>
  <footer
    class="footer-bar"
    :class="`background-style-${backgroundStyle} color-scheme-${colorScheme}`"
  >
    <div class="footer-content grid-container">
      <router-link to="/">
        <figure
          class="logo-graphic col-span-3-start-1"
          :aria-label="t('page-logo-alt')"
        >
          <logo-svg />
        </figure>
      </router-link>

      <div class="contact col-span-3-start-2">
        <a :href="t('footer.contact.mail')">{{ t("footer.contact.mail") }}</a>
        <a :href="`tel:${t('footer.contact.phone')}`">
          {{ t("footer.contact.phone") }}
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import LogoSvg from "@/assets/images/logo.svg?component";
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useUiStore } from "../stores/uiStore";
import { storeToRefs } from "pinia";
const { t } = useI18n();

const uiStore = useUiStore();

const { colorScheme } = storeToRefs(uiStore);

const route = useRoute();

const backgroundStyle = computed(() => {
  if (route.name === "project-page") {
    return "project-page";
  }
  return "default";
});
</script>

<style lang="scss" scoped>
@use "sass:math";
.footer-bar {
  $padding: 104px;
  padding-top: $padding;
  padding-bottom: $padding;
  background-color: var(--color-grijs-1);
  margin: 0;
  width: 100%;
  max-width: none;
  margin-top: 52px;
  box-sizing: border-box;
  display: block;

  &.color-scheme-light {
    background-color: var(--color-grijs-6);

    figure {
      &::v-deep(path) {
        fill: var(--color-default-text);
      }
    }
  }
  &.background-style-project-page {
    background-color: var(--color-default-background);

    &.color-scheme-light {
      background-color: var(--color-default-background);
    }
  }

  .footer-content {
    display: grid;
    grid-template-columns: subgrid;
    align-items: center;
    @media (max-width: 800px) {
      display: flex;
      flex-direction: column;
      gap: 32px;
      padding-bottom: 50px;
      align-items: center;
    }
    figure {
      margin: 0;
    }
    .contact {
      @media (max-width: 800px) {
        text-align: center;
      }
      a {
        display: block;
        color: var(--color-default-text);
        line-height: calc-rem(28px);
      }
    }
  }
}
</style>
