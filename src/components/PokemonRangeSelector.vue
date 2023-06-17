<script setup lang="ts">
import { ref } from 'vue';

import { usePokemonListStore } from '@/stores/pokemon-list';

const pokemonListStore = usePokemonListStore();

const from = ref(1);
const to = ref(151);

const applyRange = () => {
  pokemonListStore.fetchRange(from.value, to.value);
};
</script>

<template>
  <div class="range-selector">
    <label for="from-input"></label>
    <input id="from-input" type="number" v-model.number="from" />
    <label for="to-input"></label>
    <input id="to-input" type="number" v-model.number="to" />
    <button @click="applyRange">refresh</button>
  </div>
</template>

<style scoped>
.range-selector {
  padding: 8px;
  border: thin solid black;
}
</style>
