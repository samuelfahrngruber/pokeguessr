<script setup lang="ts">
import { useGenerationListStore } from '@/stores/generation-list';
import { usePokemonListStore } from '@/stores/pokemon-list';
import { ref } from 'vue';

const generationListStore = useGenerationListStore();
const pokemonListStore = usePokemonListStore();

const selectionMode = ref(false);
</script>

<template>
  <div v-if="selectionMode">
    <span>Select pokemon generation range</span>
    <ul class="gen-list">
      <li class="gen-item" v-for="gen in generationListStore.list.generations" :key="gen.num">
        <label>
          <input
            type="checkbox"
            @change="(e: any) => generationListStore.changeGenerationSelection(gen, e.target.checked)"
            :checked="generationListStore.isSelected(gen)"
          />
          {{ gen.name }}
          <!-- pokemon icon -->
        </label>
      </li>
    </ul>
    <button
      @click="
        () => {
          pokemonListStore.fetch();
          selectionMode = false;
        }
      "
    >
      apply
    </button>
  </div>
  <div v-else>
    <span>Selected Generations: </span>
    <span v-for="(gen, idx) in generationListStore.list.selectedGenerations" :key="gen.icon">
      <span v-if="idx !== 0">, </span>
      <span>{{ gen.name }}</span>
    </span>
    <button
      @click="
        () => {
          selectionMode = true;
        }
      "
    >
      change
    </button>
  </div>
</template>

<style scoped></style>
