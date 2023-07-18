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

const getGenerationIconUrlSmart = (gen: any) =>
  getIconUrl(Math.max(...gen.pokemon_species.map((species: any) => extractIdFromUrl(species.url))));

const getGenerationIconUrl = (gen: any) => {
  switch (gen.id) {
    case 1:
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png'; // mewtwo
    case 2:
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/245.png'; // suicune
    case 3:
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/384.png'; // rayquaza
    case 4:
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10007.png'; // giratina origin
    case 5:
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/646.png'; // kyurem
    case 6:
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/720.png'; // hoopa
    case 7:
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/789.png'; // cosmog
    case 8:
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/897.png'; // spectrier
    case 9:
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/967.png'; // cyclizar
    default:
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
  }
};

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
        icon: getGenerationIconUrl(gen),
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
