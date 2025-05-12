<template>
  <div class="project-block image-row-2 col-span-12">
    <div class="grid-wrapper col-span-12">
      <div
        v-for="(item, index) in blockData.content.images"
        :key="index"
        class="image-label-combo"
        :class="`col-span-${12 / columnCount}`"
      >
        <img
          :src="item.image.url"
          :alt="item.image.alt"
          class="image-row-2__image"
        />
        <label :id="labelId" v-if="item.image.label" v-html="item.image.label">
        </label>
      </div>
    </div>
    <label
      class="col-span-12"
      :id="labelId"
      v-if="blockData.content.label"
      v-html="blockData.content.label"
    >
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  blockData: {
    type: Object,
    required: true,
  },
});

const labelId = computed<string>(() => {
  return `label-id-${Math.random() * 1000000}`;
});

const columnCount = computed(() => props.blockData.columnCount || 3);
</script>

<style lang="scss" scoped>
.image-row-2 {
  // gap: 1rem;
  // justify-content: center;
  // flex-wrap: wrap;
  display: grid;
  grid-template-columns: subgrid;
  // grid-template-columns: repeat(3, 1fr);
  // grid-template-columns: repeat(2, 1fr);
  .grid-wrapper {
    display: grid;
    grid-template-columns: subgrid;
    // grid-template-columns: repeat(3, 1fr);
    // grid-template-columns: repeat(2, 1fr);
  }
}
.image-label-combo {
  .image-row-2__image {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
}

label {
  margin-top: calc-rem(50);
  text-align: center;
  color: var(--color-grijs-10);
}
</style>
