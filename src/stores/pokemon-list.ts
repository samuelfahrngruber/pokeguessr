import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

const getPokemonUrl = (num: number) => `https://pokeapi.co/api/v2/pokemon/${num}`;
const getSpeciesUrl = (num: number) => `https://pokeapi.co/api/v2/pokemon-species/${num}`;

const extractName = (rawPokemon: any) => rawPokemon.name;
const extractNum = (rawPokemon: any) => rawPokemon.id;
const extractImgUrl = (rawPokemon: any) => rawPokemon.sprites.front_default;
const extractTags = (rawPokemon: any) => rawPokemon.names.map((nameInfo: any) => nameInfo.name);

interface Pokemon {
  name: string;
  num: number;
  imgUrl: string;
  tags: string[];
}

interface PokemonList {
  pokemons: Pokemon[];
}

export const useSettingsStore = defineStore('settings', () => {
  const list = ref<PokemonList>({ pokemons: [] });

  const search = computed((term: string) =>
    list.value.pokemons.filter(
      (pokemon) =>
        pokemon.name.toLocaleLowerCase().includes(term.toLowerCase()) ||
        pokemon.tags.some((tag) => tag.toLocaleLowerCase().includes(term.toLowerCase())),
    ),
  );

  const fetchRange = async (from: number, to: number) => {
    const fetchedPokemonPromises: Promise<any>[] = [];
    const fetchedSpeciesPromises: Promise<any>[] = [];
    for (let i = from; i <= to; i++) {
      fetchedPokemonPromises.push(fetch(getPokemonUrl(i)).then((res) => res.json()));
      fetchedSpeciesPromises.push(fetch(getSpeciesUrl(i)).then((res) => res.json()));
    }
    const fetchedPokemons = await Promise.all(fetchedPokemonPromises);
    const fetchedSpecies = await Promise.all(fetchedSpeciesPromises);
    const mergedData = [];
    for (let i = 0; i < fetchedPokemons.length; i++) {
      mergedData.push({ ...fetchedPokemons[i], ...fetchedSpecies[i] });
    }
    list.value = {
      pokemons: mergedData.map((rawPokemon) => ({
        name: extractName(rawPokemon),
        num: extractNum(rawPokemon),
        imgUrl: extractImgUrl(rawPokemon),
        tags: extractTags(rawPokemon),
      })),
    };
  };

  return { list, search, fetchRange };
});
