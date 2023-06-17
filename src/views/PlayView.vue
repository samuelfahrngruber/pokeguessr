<script setup lang="ts">
import { usePokemonListStore } from '@/stores/pokemon-list';
import MyComponent from '../components/MyComponent.vue';
import PokemonSelector from '../components/PokemonSelector.vue';
import PokemonRangeSelector from '../components/PokemonRangeSelector.vue';

const pokemonListStore = usePokemonListStore();
pokemonListStore.fetchRange(1, 151);

const onPokemonSelected = () => {};
</script>

<template>
  <div class="container">
    <h3>This is the play page</h3>
    <PokemonRangeSelector></PokemonRangeSelector>
    <PokemonSelector :on-select="onPokemonSelected"></PokemonSelector>
    <MyComponent></MyComponent>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
