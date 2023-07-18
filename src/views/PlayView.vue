<script setup lang="ts">
import { useGenerationListStore } from '@/stores/generation-list';
import CurrentQuestion from '../components/CurrentQuestion.vue';
import PastQuestions from '../components/PastQuestions.vue';
import PokemonFilter from '../components/PokemonFilter.vue';
import PokemonSelector from '../components/PokemonSelector.vue';

const generationListStore = useGenerationListStore();
generationListStore.fetch();
</script>

<template>
  <div>
    <h3>This is the play page</h3>
    <hr />
    <PokemonFilter></PokemonFilter>
    <hr />
    <CurrentQuestion></CurrentQuestion>
    <hr />
    <PokemonSelector></PokemonSelector>
    <hr />
    <PastQuestions></PastQuestions>
  </div>
</template>

<style scoped></style>
