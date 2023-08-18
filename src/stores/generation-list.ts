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
  selectedGenerations: Generation[];
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
  const list = ref<GenerationList>({ selectedGenerations: [], generations: [] });

  const isSelected = (gen: Generation) =>
    list.value.selectedGenerations.some((selectedGen) => selectedGen.num === gen.num);

  const fetchGenerations = async () => {
    const allGenerationStubs = await fetch(getGenerationsUrl()).then((res) => res.json());
    const generationPromises = allGenerationStubs.results.map((genStub: any) =>
      fetch(genStub.url).then((res) => res.json()),
    );
    const generationsResponse = await Promise.all(generationPromises);
    const generations = generationsResponse.map((gen) => ({
      name: `Gen #${gen.id}`,
      num: gen.id,
      icon: getGenerationIconUrl(gen),
      speciesUrls: gen.pokemon_species.map((species: any) => species.url),
    }));
    list.value = {
      selectedGenerations: [generations[0]],
      generations,
    };
  };

  const changeGenerationSelection = (generation: Generation, selected: boolean) => {
    if (selected) {
      list.value = {
        ...list.value,
        selectedGenerations: [...list.value.selectedGenerations, generation],
      };
    } else {
      list.value = {
        ...list.value,
        selectedGenerations: list.value.selectedGenerations.filter(
          (selectedGen) => selectedGen.num != generation.num,
        ),
      };
    }
  };

  return {
    list,
    fetch: fetchGenerations,
    changeGenerationSelection,
    isSelected,
  };
});
