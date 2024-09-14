<template>
  <div class="container">
    <header class="layout-default__header">
      <NavBar></NavBar>
    </header>
    <main class="layout-default__main">
      <slot />
    </main>
    <footer class="layout-default__footer"></footer>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>
<style scoped lang="scss">
.container {
  display: grid;
  grid-template-areas:
    'header'
    'main'
    'footer';
  grid-template-rows: 60px 1fr auto;

  .layout-default {
    &__header {
      grid-area: header;
      display: flex;
      align-items: center;
      // background-color: var(--color-background-header);
      background-image: linear-gradient(
        to bottom,
        var(--color-background-header) 50%,
        #212170 90%,
        #ffffff 100%
      );
    }
    &__main {
      grid-area: main;
    }
    &__footer {
      grid-area: footer;
    }
  }
}
</style>
