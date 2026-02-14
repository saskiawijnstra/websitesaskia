<template>
  <div
    class="project-block app-screens-masonry col-span-12"
    :style="`column-count: ${columnCount}`"
  >
    <img
      v-for="(item, index) in blockData.content.images"
      :key="index"
      :src="item.url"
      :alt="item.alt?.length > 0 ? item.alt : `App Screen ${index + 1}`"
      class="app-screen-image"
    />
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
  console.log(colCount);
}

onMounted(() => {
  getColumnCount();
  query.addEventListener("change", getColumnCount);
});

onUnmounted(() => {
  query.removeEventListener("change", getColumnCount);
});
</script>

<style scoped>
.app-screens-masonry {
  column-count: 3;
  column-gap: 1rem;
}

.app-screen-image {
  width: 100%;
  display: block;
  margin-bottom: 1rem;
}
</style>
