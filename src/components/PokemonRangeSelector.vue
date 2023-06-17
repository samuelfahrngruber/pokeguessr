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
    <span>Select pokemon # range</span>
    <br />
    <label for="from-input">From: </label>
    <input id="from-input" type="number" v-model.number="from" />
    <label for="to-input">To: </label>
    <input id="to-input" type="number" v-model.number="to" />
    <br />
    <button @click="applyRange">apply</button>
  </div>
</template>

<style scoped>
.range-selector {
  padding: 8px;
  border: thin solid black;
}
</style>
