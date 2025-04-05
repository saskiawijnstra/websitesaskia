<template>
  <header-bar />

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <article class="grid-container">
    <div class="content col-span-6-start-4">
      <h1>Discover my <strong>Work</strong></h1>

      {{ t("page-logo-alt") }}

      <h2>
        <strong><i>Nulla esse incididunt</i></strong> sint minim deserunt
      </h2>

      <h3>Inter 16px Do occaecat nulla laborum</h3>

      <p>
        Et Lorem aliquip mollit dolore nostrud proident adipisicing dolor nulla
        ullamco nulla esse sit magna. Consectetur duis laborum sint in enim.
        Nostrud est labore consequat ut fugiat aute laboris. Enim eu excepteur
        culpa deserunt ullamco ad commodo labore proident non aliquip ipsum.
        Cupidatat enim nisi dolor do pariatur ipsum. Non laboris veniam
        adipisicing sint sunt nisi fugiat irure sint duis. Id fugiat ex qui
        nostrud amet est reprehenderit fugiat.
      </p>
    </div>
  </article>

  <grid-test />
  <footer-bar />
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import GridTest from "./components/grid-test.vue";
import headerBar from "./components/header/header-bar.vue";
import footerBar from "./components/footer-bar.vue";

const { t } = useI18n();
</script>

<style lang="scss"></style>
