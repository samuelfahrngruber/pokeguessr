<script setup lang="ts">
import { RouterView } from 'vue-router';
import DarkModeSwitch from './components/DarkModeSwitch.vue';
</script>

<template>
  <header>
    <h1>Pokeguessr</h1>
    <DarkModeSwitch />
  </header>
  <RouterView />
</template>

<style scoped></style>
