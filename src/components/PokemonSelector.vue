<script setup lang="ts">
import { computed, ref } from 'vue';

import { usePokemonListStore, type Pokemon } from '@/stores/pokemon-list';
import { useGameStore } from '@/stores/game';
import { boundedValue } from '../utils/bounded-value';

const props = defineProps<{
  onSelect: (pokemon: Pokemon) => void;
}>();

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
  <div class="pokemon-selector">
    <label for="pokemon-search-bar">Your Guess: </label>
    <input
      id="pokemon-search-bar"
      type="text"
      v-model="searchTerm"
      @keydown.down="changeSuggestion(+1)($event)"
      @keydown.up="changeSuggestion(-1)($event)"
      @keydown.enter="submitAnswer(suggestions[highlightedSuggestion])"
    />
    <ul v-for="(pokemon, idx) in suggestions">
      <li>
        <div :class="idx === highlightedSuggestion ? 'highlighted-suggestion' : undefined">
          {{ pokemon.name }} <button @click="submitAnswer(pokemon)">pick</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.pokemon-selector {
  padding: 8px;
  border: thin solid black;
}
.highlighted-suggestion {
  background-color: blue;
  color: white;
}
</style>
