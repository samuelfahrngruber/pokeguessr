<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import DarkModeSwitch from './components/DarkModeSwitch.vue';
</script>

<template>
  <header>
    <h1>Pokeguessr</h1>
    <DarkModeSwitch />
    <nav>
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
      </ul>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped></style>
