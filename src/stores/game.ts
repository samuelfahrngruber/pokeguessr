import { defineStore } from 'pinia';

import { usePokemonListStore, type Pokemon } from './pokemon-list';
import { ref } from 'vue';
import { pickRandom } from '@/utils/pick-random';

export interface Round {
  question: string;
  answer: Pokemon;
}

export interface FinishedRound extends Round {
  correct: boolean;
  guess?: Pokemon;
}

export interface Game {
  currentRound: Round | undefined;
  pastRounds: FinishedRound[];
}

export const useGameStore = defineStore('game', () => {
  const pokemonListStore = usePokemonListStore();

  const generateNewQuestion = () => {
    const answer = pickRandom(pokemonListStore.list.pokemons);
    if (answer === undefined) {
      return undefined;
    }
    const question = `#${answer.num}`;
    return { question, answer };
  };

  const game = ref<Game>({ currentRound: generateNewQuestion(), pastRounds: [] });

  const submitAnswer = (guess: Pokemon | undefined) => {
    if (game.value.currentRound) {
      game.value.pastRounds.push({
        ...game.value.currentRound,
        guess,
        correct: guess?.num === game.value.currentRound.answer.num,
      });
    }
    game.value.currentRound = generateNewQuestion();
  };

  const skipQuestion = () => submitAnswer(undefined);

  return { game, skipQuestion, submitAnswer };
});
