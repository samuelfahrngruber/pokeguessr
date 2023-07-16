<script setup lang="ts">
import { ref } from 'vue';

import { useGenerationListStore } from '@/stores/generation-list';

const generationListStore = useGenerationListStore();

const from = ref(1);
const to = ref(3);

const applyFilter = () => {
  generationListStore.fetch(Array.from({ length: to.value - from.value + 1 }, (_, idx) => idx + 1));
};
</script>

<template>
  <div class="filter">
    <span>Select pokemon generation range</span>
    <br />
    <label for="from-input">From: </label>
    <input id="from-input" type="number" v-model.number="from" />
    <label for="to-input">To: </label>
    <input id="to-input" type="number" v-model.number="to" />
    <br />
    <button @click="applyFilter">apply</button>
  </div>
</template>

<style scoped>
.filter {
  padding: 8px;
  border: thin solid black;
}
</style>
