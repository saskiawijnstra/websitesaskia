<template>
  <header-bar />
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
</script>

<style lang="scss">
.content-wrapper {
  min-height: 100vh;
}
</style>
