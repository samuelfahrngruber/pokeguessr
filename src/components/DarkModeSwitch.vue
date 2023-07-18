<script setup lang="ts">
import { ref } from 'vue';

const prefersDark = ref(false);

const applyDarkMode = () => {
  if (prefersDark.value) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
};

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
  prefersDark.value = !!matches;
  applyDarkMode();
});
</script>

<template>
  <label><input type="checkbox" v-model="prefersDark" @change="applyDarkMode" />Dark Mode</label>
</template>

<style scoped></style>
