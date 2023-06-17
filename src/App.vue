<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <h1>Pokeguessr</h1>
    <nav>
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
      </ul>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped></style>
