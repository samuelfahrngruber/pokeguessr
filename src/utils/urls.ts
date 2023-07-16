export const getPokemonUrl = (num: number) => `https://pokeapi.co/api/v2/pokemon/${num}`;
export const getSpeciesUrl = (num: number) => `https://pokeapi.co/api/v2/pokemon-species/${num}`;
// This is only to avoid round trips through multiple request just for the icon
export const getIconUrl = (num: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${num}.png`;
export const getGenerationUrl = (num: number) => `https://pokeapi.co/api/v2/generation/${num}`;

export const extractIdFromUrl = (url: string): number => Number(url.split('/').pop());
