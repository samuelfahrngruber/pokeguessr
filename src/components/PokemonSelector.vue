<script setup lang="ts">
import { computed, ref } from 'vue';

import { usePokemonListStore, type Pokemon } from '@/stores/pokemon-list';
import { boundedValue } from '../utils/bounded-value';

const props = defineProps<{
  onSelect: (pokemon: Pokemon) => void;
}>();

const pokemonListStore = usePokemonListStore();

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

const submitAnswer = (ev: KeyboardEvent) => {};
</script>

<template>
  <div>
    <input
      type="text"
      v-model="searchTerm"
      @keydown.down="changeSuggestion(+1)($event)"
      @keydown.up="changeSuggestion(-1)($event)"
      @keydown.enter="submitAnswer"
    />
    <ul v-for="(pokemon, idx) in suggestions">
      <li>
        <div :class="idx === highlightedSuggestion ? 'highlighted-suggestion' : undefined">
          {{ pokemon.name }}
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.highlighted-suggestion {
  background-color: red;
  color: white;
}
</style>
