<script setup lang="ts">
import { useGenerationListStore } from '@/stores/generation-list';
import CurrentQuestion from '../components/CurrentQuestion.vue';
import PastQuestions from '../components/PastQuestions.vue';
import PokemonFilter from '../components/PokemonFilter.vue';
import PokemonSelector from '../components/PokemonSelector.vue';
import CardContainer from '@/components/CardContainer.vue';

const generationListStore = useGenerationListStore();
generationListStore.fetch();
</script>

<template>
  <div class="game-container">
    <PokemonFilter></PokemonFilter>
    <CardContainer>
      <CurrentQuestion></CurrentQuestion>
    </CardContainer>
    <CardContainer>
      <PokemonSelector></PokemonSelector>
    </CardContainer>
    <CardContainer>
      <PastQuestions></PastQuestions>
    </CardContainer>
  </div>
</template>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  padding: var(--pg-spacing-m);
  gap: var(--pg-spacing-m);
}
</style>
