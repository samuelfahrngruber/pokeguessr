import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

const getPokemonUrl = (num: number) => `https://pokeapi.co/api/v2/pokemon/${num}`;
const getSpeciesUrl = (num: number) => `https://pokeapi.co/api/v2/pokemon-species/${num}`;
// This is only to avoid round trips through multiple request just for the icon
const getIconUrl = (num: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${num}.png`;
const getGenerationUrl = (num: number) => `https://pokeapi.co/api/v2/generation/${num}`;

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

export interface PokemonFilter {
  (): Promise<string[]>;
}

export const filterByNumber =
  (from: number, to: number): PokemonFilter =>
  async () => {
    if (from < 1 || to < from) {
      throw new Error('You cannot fetch this range of Pokemon!');
    }
    const urls = [];
    for (let i = from; i <= to; i++) {
      urls.push(getSpeciesUrl(i));
    }
    return urls;
  };

export const filterByGeneration =
  (fromGen: number, toGen: number): PokemonFilter =>
  async () => {
    if (fromGen < 1 || toGen < fromGen) {
      throw new Error('You cannot fetch this range of Generations!');
    }
    const generationPromises: Promise<any>[] = [];
    for (let i = fromGen; i <= toGen; i++) {
      generationPromises.push(fetch(getGenerationUrl(i)).then((res) => res.json()));
    }
    const generations = await Promise.all(generationPromises);
    const urls: string[] = [];
    generations.forEach((gen) =>
      gen.pokemon_species.forEach((species: { name: string; url: string }) =>
        urls.push(species.url),
      ),
    );
    return urls;
  };

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

  const fetchPokemonList = async (filter: PokemonFilter) => {
    const speciesUrls = await filter();
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
