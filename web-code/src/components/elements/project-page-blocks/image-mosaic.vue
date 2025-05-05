<template>
  <div class="project-block image-mosaic col-span-12">
    <div
      class="column"
      :class="`col-span-4-start-${index * 4 + 1}`"
      v-for="(column, index) in blockData.content.columns"
    >
      <img
        v-for="(item, index) in column.images"
        :key="index"
        :src="item.url"
        :alt="item.alt?.length > 0 ? item.alt : `image ${index + 1}`"
        class="image"
      />
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
import { computed, onMounted, onUnmounted, ref } from "vue";

const props = defineProps({
  blockData: {
    type: Object,
    required: true,
  },
});

const query = window.matchMedia("(max-width: 640px)");

const columnCount = ref(3);

const labelId = computed<string>(() => {
  return `label-id-${Math.random() * 1000000}`;
});

function getColumnCount() {
  let colCount = 3;

  if (props.blockData["max-column-count"]) {
    colCount = props.blockData["max-column-count"];
  }

  if (query.matches) {
    if (props.blockData["min-column-count"]) {
      colCount = props.blockData["min-column-count"];
    }
  }
  columnCount.value = colCount;
}

onMounted(() => {
  getColumnCount();
  query.addEventListener("change", getColumnCount);
});

onUnmounted(() => {
  query.removeEventListener("change", getColumnCount);
});
</script>

<style lang="scss" scoped>
.image-mosaic {
  $gap-size: calc-rem(50);
  display: grid;
  height: max-content;
  grid-template-columns: subgrid;

  /* column-count: 3;
  column-gap: 1rem; */

  .column {
    display: flex;
    flex-direction: column;
    gap: $gap-size;
    align-items: center;
    justify-content: center;
  }
}

.image {
  width: 100%;
  display: block;
}

label {
  margin-top: calc-rem(50);
  text-align: center;
  color: var(--color-grijs-10);
  font-size: calc-rem(16);
}
</style>
