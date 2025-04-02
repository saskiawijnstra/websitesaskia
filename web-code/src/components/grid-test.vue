<template>
  <div class="grid-container grid-test">
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
    <div class="col-span-4-start-3  grid-block"></div>
    <div class="col-span-4 grid-block"></div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/scss/utils/_grid.scss";

.grid-test {
  margin-top: 2rem;
  .grid-block {
    background-color: var(--color-middle-grijs);
    height: 50px;
  }
}
</style>
