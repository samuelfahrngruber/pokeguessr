<script setup lang="ts">
import { usePokemonListStore } from '@/stores/pokemon-list';
import PokemonSelector from '../components/PokemonSelector.vue';
import PokemonRangeSelector from '../components/PokemonRangeSelector.vue';
import CurrentQuestion from '../components/CurrentQuestion.vue';
import PastQuestions from '../components/PastQuestions.vue';

const pokemonListStore = usePokemonListStore();
pokemonListStore.fetchRange(1, 151);

const onPokemonSelected = () => {};
</script>

<template>
  <div class="container">
    <h3>This is the play page</h3>
    <PokemonRangeSelector></PokemonRangeSelector>
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
