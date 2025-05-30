<template>
  <transition name="fade">
    <div class="mobile-menu" v-if="isMenuVisible">
      <header-bar />
      <div class="content">
        <nav>
          <router-link @click="isMenuVisible = false" to="/">{{
            t("navigation.link-labels.work")
          }}</router-link>
          <router-link @click="isMenuVisible = false" to="/about">{{
            t("navigation.link-labels.about")
          }}</router-link>
        </nav>

        <div class="settings">
          <color-scheme-switch />
          <locale-switch />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useUiStore } from "../stores/uiStore";
import headerBar from "./header/header-bar.vue";
import { useI18n } from "vue-i18n";
import localeSwitch from "./header/locale-switch.vue";
import colorSchemeSwitch from "./header/color-scheme-switch.vue";

const uiStore = useUiStore();

const { isMenuVisible } = storeToRefs(uiStore);
const { t } = useI18n();
</script>

<style lang="scss" scoped>
.mobile-menu {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: var(--color-default-background);
  z-index: 1000;

  .content {
    width: 100%;
    height: calc(100vh - calc-rem(153px));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    nav {
      text-align: center;

      @media (max-height: 400px) {
        display: flex;
        gap: 20px;
      }

      a {
        display: block;
        color: var(--color-default-text);
        font-size: calc-rem(72px);

        @media (max-height: 600px) {
          font-size: calc-rem(52px);
        }

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

    .settings {
      margin-top: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;

      @media (max-height: 400px) {
        margin-top: 10px;
      }
    }
  }

  &.fade {
    &-enter-active,
    &-leave-active {
      transition: opacity 0.3s ease;
    }
    &-enter-from,
    &-leave-to {
      opacity: 0;
    }
  }
}
</style>
