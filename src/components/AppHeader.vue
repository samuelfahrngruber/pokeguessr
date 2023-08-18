<script setup lang="ts">
import DarkModeSwitch from './DarkModeSwitch.vue';
</script>

<template>
  <div class="header-container">
    <h1 class="title">Pokeguessr</h1>
    <DarkModeSwitch />
  </div>
</template>

<style scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: var(--pg-background-color-accent);
  color: var(--pg-text-color-onaccent);

  padding: var(--pg-spacing-m);
}
.title {
  margin: 0;
}
</style>
