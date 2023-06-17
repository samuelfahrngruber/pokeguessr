<script setup lang="ts">
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();
</script>

<template>
  <div class="current-question">
    <h3>{{ gameStore.game.currentRound?.question }}</h3>
    <button @click="gameStore.skipQuestion">skip</button>
  </div>
</template>

<style scoped>
.current-question {
  padding: 8px;
  border: thin solid black;
}
</style>
