<template>
  <div class="header-bar grid-container" :class="`header-style-${colorScheme}`">
    <div class="content col-span-12">
      <h1>
        <!-- <img :alt="t('page-logo-alt')" :src="logoUrl" /> -->
        <figure class="logo-graphic" :aria-label="t('page-logo-alt')">
          <logo-svg />
        </figure>
      </h1>

      <nav>
        <router-link to="/work">{{
          t("navigation.link-labels.work")
        }}</router-link>
        <router-link to="/about">{{
          t("navigation.link-labels.about")
        }}</router-link>
      </nav>

      <div class="settings">
        <color-scheme-switch />
        <locale-switch />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import colorSchemeSwitch from "./color-scheme-switch.vue";
import localeSwitch from "./locale-switch.vue";
import LogoSvg from "@/assets/images/logo.svg?component";
import { useUiStore } from "../../stores/uiStore";
import { storeToRefs } from "pinia";

const { t } = useI18n();

const uiStore = useUiStore();
const { colorScheme } = storeToRefs(uiStore);
</script>

<style lang="scss" scoped>
.header-bar {
  overflow: hidden;
  min-height: calc-rem(153px);
  align-items: center;
  justify-content: center;
  // background-color: var(--color-niet-wit);
  &.header-style-dark {
    // background-color: var(--color-niet-zwart);
    .content {
      h1 {
        .logo-graphic {
          &::v-deep(path) {
            fill: var(--color-niet-wit);
          }
        }
      }
      nav {
        a {
          color: var(--color-niet-wit);
        }
      }
    }
  }

  .content {
    display: flex;
    justify-content: space-between;
    h1 {
      margin: 0;
      padding: 0;

      .logo-graphic {
        margin: 0;
        &::v-deep(path) {
          transition: fill 0.3s linear;
          fill: var(--color-niet-zwart);
        }
      }
    }

    nav,
    .settings {
      display: flex;
      align-items: center;
      gap: 40px;

      a {
        color: var(--color-niet-zwart);
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }

        &.router-link-active {
          color: var(--color-middle-grijs);
          cursor: default;
          &:hover {
            text-decoration: none;
          }
        }
      }
    }

    .settings,
    h1 {
      flex-grow: 1;
      flex-basis: 0;
    }

    .settings {
      justify-content: flex-end;
    }
  }
}
</style>
