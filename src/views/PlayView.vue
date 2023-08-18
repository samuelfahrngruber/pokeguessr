<script setup lang="ts">
import CardContainer from '@/components/CardContainer.vue';
import CurrentQuestion from '@/components/CurrentQuestion.vue';
import PastQuestions from '@/components/PastQuestions.vue';
import PokemonFilter from '@/components/PokemonFilter.vue';
import PokemonSelector from '@/components/PokemonSelector.vue';
import { useGenerationListStore } from '@/stores/generation-list';
import { usePokemonListStore } from '@/stores/pokemon-list';

const generationListStore = useGenerationListStore();
const pokemonListStore = usePokemonListStore();

generationListStore.fetch();
pokemonListStore.fetch();
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
