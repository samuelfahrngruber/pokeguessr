<script setup lang="ts">
import { useGenerationListStore } from '@/stores/generation-list';
import CurrentQuestion from '../components/CurrentQuestion.vue';
import PastQuestions from '../components/PastQuestions.vue';
import PokemonFilter from '../components/PokemonFilter.vue';
import PokemonSelector from '../components/PokemonSelector.vue';

const generationListStore = useGenerationListStore();
generationListStore.fetch([1]);

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
