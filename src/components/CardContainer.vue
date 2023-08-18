<script setup lang="ts"></script>

<template>
  <div class="card">
    <hr class="card-divider" />
    <slot />
  </div>
</template>

<style scoped>
.card {
  border-color: var(--pg-border-color-neutral);
  border-radius: var(--pg-border-radius);
  border-width: var(--pg-border-width);
  border-style: var(--pg-border-style);

  padding: var(--pg-spacing-m);
}

.card-divider {
  display: none;
}
</style>
