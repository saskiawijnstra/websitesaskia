<template>
  <div class="header-bar grid-container" :class="`header-style-${headerStyle}`">
    <div class="content col-span-12">
      <h1>
        <img :alt="t('page-logo-alt')" :src="logoUrl" />
      </h1>

      <nav>
        <router-link to="/work">Work</router-link>
        <router-link to="/about">About</router-link>
      </nav>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import LogoWhite from "@/assets/images/logowhite.png";
import LogoBlack from "@/assets/images/logoblack.png";

const { t } = useI18n();

const headerStyle = "light";

const logoUrl = computed(() => {
  if (headerStyle === "light") {
    return LogoBlack;
  }
  return LogoWhite;
});
</script>

<style lang="scss" scoped>
.header-bar {
  overflow: hidden;
  min-height: calc-rem(153px);
  align-items: center;
  justify-content: center;
  background-color: var(--color-niet-wit);
  &.header-style-dark {
    background-color: var(--color-niet-zwart);
    .content {
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
    }

    nav {
      display: flex;
      align-items: center;
      gap: 30px;

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
  }
}
</style>
