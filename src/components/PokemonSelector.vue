<script setup lang="ts">
import { computed, ref } from 'vue';

import PokemonIcon from './PokemonIcon.vue';
import { usePokemonListStore, type Pokemon } from '@/stores/pokemon-list';
import { useGameStore } from '@/stores/game';
import { boundedValue } from '../utils/bounded-value';

const pokemonListStore = usePokemonListStore();
const gameStore = useGameStore();

const searchTerm = ref('');

const suggestions = computed(() => pokemonListStore.search(searchTerm.value));
const highlightedSuggestion = ref(0);

const changeSuggestion = (delta: number) => (ev: KeyboardEvent) => {
  if (delta !== 0) {
    ev.preventDefault();
  }
  let newSuggestionIdx = highlightedSuggestion.value + delta;
  highlightedSuggestion.value = boundedValue(0, newSuggestionIdx, suggestions.value.length - 1);
};

const submitAnswer = (answer: Pokemon | undefined) => {
  if (answer) {
    searchTerm.value = '';
    gameStore.submitAnswer(answer);
  }
};
</script>

<template>
  <div>
    <label for="pokemon-search-bar">Your Guess: </label>
    <input
      id="pokemon-search-bar"
      type="text"
      v-model="searchTerm"
      @keydown.down="changeSuggestion(+1)($event)"
      @keydown.up="changeSuggestion(-1)($event)"
      @keydown.enter="submitAnswer(suggestions[highlightedSuggestion])"
    />
    <ul v-for="(pokemon, idx) in suggestions" :key="pokemon.num">
      <li>
        <div :class="idx === highlightedSuggestion ? 'highlighted suggestion' : 'suggestion'">
          {{ pokemon.name }}
          <button @click="submitAnswer(pokemon)">pick</button>
          <PokemonIcon :pokemon="pokemon"></PokemonIcon>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.suggestion {
  display: flex;
  align-items: center;
}
.highlighted {
  background-color: var(--pg-background-color-accent);
  color: var(--pg-text-color-onaccent);
}
</style>
