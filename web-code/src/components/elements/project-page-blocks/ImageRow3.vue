<template>
  <div class="project-block image-row-3 col-span-12">
    <div
      v-for="(item, index) in blockData.content.images"
      :key="index"
      class="image-label-combo col-span-4"
    >
      <img
        :src="item.image.url"
        :alt="item.image.alt"
        class="image-row-3__image"
      />
      <label
        :id="labelId"
        v-if="blockData.content.label"
        v-html="blockData.content.label"
      >
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

defineProps({
  blockData: {
    type: Object,
    required: true,
  },
});

const labelId = computed<string>(() => {
  return `label-id-${Math.random() * 1000000}`;
});
</script>

<style lang="scss" scoped>
.image-row-3 {
  display: flex;
  // gap: 1rem;
  // justify-content: center;
  // flex-wrap: wrap;

  display: grid;
  // grid-template-columns: repeat(3, 1fr);
  grid-template-columns: subgrid;
}

.image-label-combo {
  .image-row-3__image {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  label {
    margin-top: calc-rem(50);
    text-align: center;
    color: var(--color-grijs-10);
  }
}
</style>
