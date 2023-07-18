import { extractIdFromUrl, getGenerationsUrl, getIconUrl } from '@/utils/urls';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Generation {
  name: string;
  num: number;
  icon: string;
  speciesUrls: string[];
}

export interface GenerationList {
  generations: Generation[];
  selectedGenerations: number[];
}

export const useGenerationListStore = defineStore('generation-list', () => {
  const list = ref<GenerationList>({ selectedGenerations: [1], generations: [] });

  const fetchGenerations = async () => {
    const allGenerationStubs = await fetch(getGenerationsUrl()).then((res) => res.json());
    const generationPromises = allGenerationStubs.results.map((genStub: any) =>
      fetch(genStub.url).then((res) => res.json()),
    );
    const generations = await Promise.all(generationPromises);
    list.value = {
      selectedGenerations: list.value.selectedGenerations,
      generations: generations.map((gen) => ({
        name: `Gen #${gen.id}`,
        num: gen.id,
        icon: getIconUrl(extractIdFromUrl(gen.pokemon_species[gen.pokemon_species.length - 1].url)),
        speciesUrls: gen.pokemon_species.map((species: any) => species.url),
      })),
    };
  };

  const changeGenerationSelection = (generationNum: number, selected: boolean) => {
    if (selected) {
      list.value = {
        ...list.value,
        selectedGenerations: [...list.value.selectedGenerations, generationNum],
      };
    } else {
      list.value = {
        ...list.value,
        selectedGenerations: list.value.selectedGenerations.filter(
          (selectedGenNum) => selectedGenNum != generationNum,
        ),
      };
    }
  };

  const selectGeneration = (generationNum: number) =>
    changeGenerationSelection(generationNum, true);

  const deselectGeneration = (generationNum: number) =>
    changeGenerationSelection(generationNum, false);

  return {
    list,
    fetch: fetchGenerations,
    changeGenerationSelection,
    selectGeneration,
    deselectGeneration,
  };
});
