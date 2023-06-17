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
  currentRound: Round;
  pastRounds: FinishedRound[];
}

export const useGameStore = defineStore('game', () => {
  const pokemonListStore = usePokemonListStore();

  const generateNewQuestion = () => {
    const answer = pickRandom(pokemonListStore.list.pokemons);
    const question = `#${answer.num}`;
    return { question, answer };
  };

  const game = ref<Game>({ currentRound: generateNewQuestion(), pastRounds: [] });

  const skipQuestion = () => {
    game.value.pastRounds.push({
      ...game.value.currentRound,
      correct: false,
    });
  };

  const submitAnswer = (guess: Pokemon) => {
    game.value.pastRounds.push({
      ...game.value.currentRound,
      guess,
      correct: guess.num === game.value.currentRound.answer.num,
    });
  };

  return { game, skipQuestion, submitAnswer };
});
