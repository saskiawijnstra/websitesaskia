<template>
  <footer class="footer-bar grid-container">
    <figure
      class="logo-graphic col-span-3-start-1"
      :aria-label="t('page-logo-alt')"
    >
      <logo-svg />
    </figure>

    <div class="contact col-span-3-start-4">
      <a :href="t('footer.contact.mail')">{{ t("footer.contact.mail") }}</a>
      <a :href="`tel:${t('footer.contact.phone')}`">
        {{ t("footer.contact.phone") }}
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import LogoSvg from "@/assets/images/logo.svg?component";
const { t } = useI18n();
</script>

<style lang="scss" scoped>
.footer-bar {
  align-items: center;
  $padding: 104px;
  padding-top: $padding;
  padding-bottom: $padding;
  figure {
    margin: 0;
  }
  .contact {
    a {
      display: block;
      color: var(--color-default-text);
      text-decoration: none;
      line-height: calc-rem(28px);
    }
  }
}
</style>
