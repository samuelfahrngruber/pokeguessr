<script setup lang="ts">
import { usePokemonListStore } from '@/stores/pokemon-list';
import MyComponent from '../components/MyComponent.vue';
import PokemonSelector from '../components/PokemonSelector.vue';

const pokemonListStore = usePokemonListStore();
pokemonListStore.fetchRange(1, 151);

const onPokemonSelected = () => {};
</script>

<template>
  <h3>This is the play page</h3>
  <PokemonSelector :on-select="onPokemonSelected"></PokemonSelector>
  <MyComponent></MyComponent>
</template>

<style scoped></style>
