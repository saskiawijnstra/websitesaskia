<template>
  <!-- <div class="grid-container grid-test">
    <div class="col-span-12 grid-block"></div>
  </div>
  <div class="grid-container grid-test">
    <div class="col-span-6 grid-block"></div>
    <div class="col-span-6 grid-block"></div>
  </div>

  <div class="grid-container grid-test">
    <div class="col-span-4 grid-block"></div>
    <div class="col-span-4 grid-block"></div>
    <div class="col-span-4 grid-block"></div>
  </div>

  <div class="grid-container grid-test">
    <div class="col-span-3 grid-block"></div>
    <div class="col-span-3 grid-block"></div>
    <div class="col-span-3 grid-block"></div>
    <div class="col-span-3 grid-block"></div>
  </div>

  <div class="grid-container grid-test">
    <div class="col-span-8 grid-block"></div>
    <div class="col-span-4 grid-block"></div>
  </div>

  <div class="grid-container grid-test">
    <div class="col-span-8-start-3 grid-block"></div>
  </div>

  <div class="grid-container grid-test">
    <div class="col-span-4-start-3 grid-block"></div>
    <div class="col-span-4 grid-block"></div>
  </div> -->

  <transition name="fade">
    <div v-if="showReferenceGrid" class="reference-grid">
      <div class="grid-container grid-test">
        <div class="grid-block col-span-1-start-1"></div>
        <div class="grid-block col-span-1-start-2"></div>
        <div class="grid-block col-span-1-start-3"></div>
        <div class="grid-block col-span-1-start-4"></div>
        <div class="grid-block col-span-1-start-5"></div>
        <div class="grid-block col-span-1-start-6"></div>
        <div class="grid-block col-span-1-start-7"></div>
        <div class="grid-block col-span-1-start-8"></div>
        <div class="grid-block col-span-1-start-9"></div>
        <div class="grid-block col-span-1-start-10"></div>
        <div class="grid-block col-span-1-start-11"></div>
        <div class="grid-block col-span-1-start-12"></div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const showReferenceGrid = ref(false);

function onKeyPress(event: KeyboardEvent) {
  if (event.key.toLowerCase() === "g" && event.shiftKey) {
    event.preventDefault();
    showReferenceGrid.value = !showReferenceGrid.value;
  }
}

onMounted(() => {
  window.addEventListener("keypress", onKeyPress);
});

onUnmounted(() => {
  window.removeEventListener("keypress", onKeyPress);
});
</script>

<style lang="scss" scoped>
.grid-test {
  margin-top: 2rem;

  .grid-block {
    background-color: var(--color-middle-grijs);
    height: 50px;
  }
}

.reference-grid {
  position: fixed;
  margin: 0;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  pointer-events: none;
  .grid-container {
    height: 100%;
  }
  .grid-block {
    height: 100%;
    background-color: rgba(255, 0, 0, 0.1);
  }
}
</style>
