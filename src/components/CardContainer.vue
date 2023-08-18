<script setup lang="ts"></script>

<template>
  <div>
    <hr />
    <slot />
  </div>
</template>

<style scoped>
.card {
  border-color: var(--pg-border-color-neutral);
  border-radius: var(--pg-border-radius);
  border-width: var(--pg-border-width);
  border-style: var(--pg-border-style);
}
</style>
