<script setup lang="ts">
import type { Pokemon } from '@/stores/pokemon-list';
import PokemonIcon from './PokemonIcon.vue';

defineProps<{
  pokemon: Pokemon;
}>();
</script>

<template>
  <span class="pokemon-name">
    <span>{{ pokemon.name }}</span>
    <PokemonIcon class="sprite" :pokemon="pokemon" aria-hidden="true" />
  </span>
</template>

<style scoped>
.pokemon-name {
  display: inline-block;
  position: relative;
  padding-right: calc(40px + 0.25rem);
}

.sprite {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>
