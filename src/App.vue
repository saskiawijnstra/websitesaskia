<template>
  <header-bar />
  <MobileMenu />
  <div class="content-wrapper">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>

  <footer-bar />
</template>

<script setup lang="ts">
import headerBar from "./components/header/header-bar.vue";
import footerBar from "./components/footer-bar.vue";
import { useTitle } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import MobileMenu from "./components/MobileMenu.vue";

const { t } = useI18n();
const title = useTitle();

title.value = t("page-title-prefix");
</script>

<style lang="scss">
.content-wrapper {
  min-height: 100vh;
}
</style>
