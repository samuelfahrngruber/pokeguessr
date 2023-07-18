<script setup lang="ts">
import type { Pokemon } from '@/stores/pokemon-list';
import 'pikasprite/build/spritesheet.css';

const props = defineProps<{
  pokemon: Pokemon;
}>();
</script>

<template>
  <span :class="`pkspr-dex-${String(props.pokemon.num).padStart(4, '0')}`"></span>
</template>

<style scoped></style>
