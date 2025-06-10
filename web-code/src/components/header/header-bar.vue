<template>
  <div class="header-bar grid-container" :class="`header-style-${colorScheme}`">
    <div class="content col-span-12">
      <h1>
        <router-link to="/">
          <!-- <img :alt="t('page-logo-alt')" :src="logoUrl" /> -->
          <figure class="logo-graphic" :aria-label="t('page-logo-alt')">
            <logo-svg />
          </figure>
        </router-link>
      </h1>
      <template v-if="!isMobileLayout">
        <nav>
          <router-link to="/">{{
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
      </template>
      <button
        @click="toggleMenu"
        class="menu-button"
        :class="{ opened: isMenuVisible }"
        aria-label="Menu"
        v-else
      >
        <figure>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </figure>
      </button>
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
import { useMediaQuery } from "@vueuse/core";
import { watch } from "vue";

const { t } = useI18n();

const uiStore = useUiStore();
const { colorScheme, isMenuVisible } = storeToRefs(uiStore);

const isMobileLayout = useMediaQuery("(max-width: 1024px)");

watch(
  () => isMobileLayout.value,
  () => {
    if (!isMobileLayout.value) {
      isMenuVisible.value = false;
    }
  },
);

function toggleMenu() {
  isMenuVisible.value = !isMenuVisible.value;
}
</script>

<style lang="scss" scoped>
.header-bar {
  @include mixins.no-select();

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

    .menu-button {
      margin: 0;
      padding: 5px;
      display: grid;
      place-items: center;
      cursor: pointer;
      background: none;
      border: none;

      &.opened {
        figure {
          .bar {
            transform: translateX(0);

            &:first-child {
              transform: translateX(0) rotate(45deg);
            }
            &:last-child {
              transform: translateX(0) rotate(-45deg);
            }

            &:nth-child(2) {
              opacity: 0;
            }
          }
        }
      }

      figure {
        position: relative;
        display: block;
        width: 23px;
        height: 18px;
        margin: 0;
        overflow: visible;
        padding: 0;

        .bar {
          position: absolute;
          height: 2px;
          top: 50%;
          width: 100%;

          content: "";
          transition:
            transform 0.2s ease-in-out,
            opacity 0.2s linear;
          background-color: var(--color-default-text);
          transform: translateY(-50%);

          &:first-child {
            transform: translateY(-50%) translateY(-6px);
          }
          &:last-child {
            transform: translateY(-50%) translateY(6px);
          }
        }
      }
    }

    h1 {
      margin: 0;
      padding: 0;

      a {
        padding: 0;
        margin: 0;
        text-decoration: none;
      }

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
