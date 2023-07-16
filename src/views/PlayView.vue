<script setup lang="ts">
import { filterByGeneration, usePokemonListStore } from '@/stores/pokemon-list';
import PokemonSelector from '../components/PokemonSelector.vue';
import PokemonFilter from '../components/PokemonFilter.vue';
import CurrentQuestion from '../components/CurrentQuestion.vue';
import PastQuestions from '../components/PastQuestions.vue';

const pokemonListStore = usePokemonListStore();
pokemonListStore.fetch(filterByGeneration(1, 1));

const onPokemonSelected = () => {};
</script>

<template>
  <div class="container">
    <h3>This is the play page</h3>
    <PokemonFilter></PokemonFilter>
    <CurrentQuestion></CurrentQuestion>
    <PokemonSelector :on-select="onPokemonSelected"></PokemonSelector>
    <PastQuestions></PastQuestions>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
