<script setup lang="ts">
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();
</script>

<template>
  <div>
    <ul>
      <li v-for="(round, idx) in gameStore.game.pastRounds" :key="idx">
        <div v-if="round.correct" class="correct-question">
          {{ `${round.question} - Correct! It's ${round.answer.name}!` }}
        </div>
        <div v-else class="incorrect-question">
          <span>{{ `${round.question} ` }} </span>
          <span v-if="round.guess === undefined">Not answered!</span>
          <span v-else>{{ `Wrong! Your Answer: #${round.guess.num} ${round.guess.name}` }}</span>
          <span>{{ ` - Correct Answer: ${round.answer.name}` }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.correct-question {
  color: var(--pg-text-color-success);
}
.incorrect-question {
  color: var(--pg-text-color-fail);
}
</style>
