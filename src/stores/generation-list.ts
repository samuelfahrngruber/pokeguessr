import { extractIdFromUrl, getGenerationUrl, getIconUrl } from '@/utils/urls';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { usePokemonListStore } from './pokemon-list';

export interface Generation {
  name: string;
  icon: string;
  speciesUrls: string[];
}

export interface GenerationList {
  generations: Generation[];
}

export const useGenerationListStore = defineStore('generation-list', () => {
  const list = ref<GenerationList>({ generations: [] });

  const pokemonListStore = usePokemonListStore();

  const fetchGenerations = async (generationNumbers: number[]) => {
    const generationPromises = generationNumbers.map((num) =>
      fetch(getGenerationUrl(num)).then((res) => res.json()),
    );
    const generations = await Promise.all(generationPromises);
    list.value = {
      generations: generations.map((gen) => ({
        name: `Gen #${gen.id}`,
        icon: getIconUrl(extractIdFromUrl(gen.pokemon_species[gen.pokemon_species.length - 1].url)),
        speciesUrls: gen.pokemon_species.map((species: any) => species.url),
      })),
    };
    pokemonListStore.fetch(list.value);
  };

  return { list, fetch: fetchGenerations };
});
