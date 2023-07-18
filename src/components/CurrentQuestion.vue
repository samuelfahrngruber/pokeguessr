<script setup lang="ts">
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();
</script>

<template>
  <div>
    <h3>{{ gameStore.game.currentRound?.question }}</h3>
    <button @click="gameStore.skipQuestion">skip</button>
  </div>
</template>

<style scoped></style>
