import { getIconUrl } from '@/utils/urls';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useGenerationListStore } from './generation-list';

const extractName = (rawPokemon: any) => rawPokemon.name;
const extractNum = (rawPokemon: any) => rawPokemon.id;
const extractImgUrl = (rawPokemon: any) => getIconUrl(rawPokemon.id);
const extractTags = (rawPokemon: any) => rawPokemon.names.map((nameInfo: any) => nameInfo.name);

export interface Pokemon {
  name: string;
  num: number;
  imgUrl: string;
  tags: string[];
}

export interface PokemonList {
  pokemons: Pokemon[];
}

export const usePokemonListStore = defineStore('pokemon-list', () => {
  const list = ref<PokemonList>({ pokemons: [] });

  const search = computed(() => (term: string) => {
    if (term.trim().length === 0) {
      return [];
    }
    return list.value.pokemons.filter(
      (pokemon) =>
        pokemon.name.toLocaleLowerCase().includes(term.toLowerCase()) ||
        pokemon.tags.some((tag) => tag.toLocaleLowerCase().includes(term.toLowerCase())),
    );
  });

  const generationListStore = useGenerationListStore();

  const fetchPokemonList = async () => {
    const speciesUrls: string[] = [];
    const generations = generationListStore.list;
    generations.generations
      .filter((gen) => generationListStore.isSelected(gen))
      .forEach((gen) => {
        gen.speciesUrls.forEach((speciesUrl) => speciesUrls.push(speciesUrl));
      });
    const fetchedSpeciesPromises = speciesUrls.map((speciesUrl) =>
      fetch(speciesUrl).then((res) => res.json()),
    );
    const fetchedSpecies = await Promise.all(fetchedSpeciesPromises);
    list.value = {
      pokemons: fetchedSpecies.map((rawPokemon) => ({
        name: extractName(rawPokemon),
        num: extractNum(rawPokemon),
        imgUrl: extractImgUrl(rawPokemon),
        tags: extractTags(rawPokemon),
      })),
    };
  };

  return { list, search, fetch: fetchPokemonList };
});
