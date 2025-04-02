<template>
    <div class="header-bar">
        <h1>{{t('page-logo-alt')}}</h1>
    </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
const {t} = useI18n();
</script>

<style lang="scss" scoped>
.header-bar {
    width: 100%;
    background-color: purple;
}
</style>