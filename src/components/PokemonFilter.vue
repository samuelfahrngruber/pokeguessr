<script setup lang="ts">
import { useGenerationListStore } from '@/stores/generation-list';
import { usePokemonListStore } from '@/stores/pokemon-list';

const generationListStore = useGenerationListStore();
const pokemonListStore = usePokemonListStore();
</script>

<template>
  <div class="filter">
    <span>Select pokemon generation range</span>
    <ul class="gen-list">
      <li class="gen-item" v-for="gen in generationListStore.list.generations" :key="gen.num">
        <label>
          <input
            type="checkbox"
            @change="(e: any) => generationListStore.changeGenerationSelection(gen.num, e.target.checked)"
          />
          {{ gen.name }}
          <!-- pokemon icon -->
        </label>
      </li>
    </ul>
    <button @click="() => pokemonListStore.fetch()">apply</button>
  </div>
</template>

<style scoped></style>
