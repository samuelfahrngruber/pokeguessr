export const getPokemonUrl = (num: number) => `https://pokeapi.co/api/v2/pokemon/${num}`;
export const getSpeciesUrl = (num: number) => `https://pokeapi.co/api/v2/pokemon-species/${num}`;
// This is only to avoid round trips through multiple request just for the icon
export const getIconUrl = (num: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png`;
export const getGenerationsUrl = () => `https://pokeapi.co/api/v2/generation`;
export const getGenerationUrl = (num: number) => `https://pokeapi.co/api/v2/generation/${num}`;

export const extractIdFromUrl = (url: string): number => {
  const tokens = url.split('/');
  let id;
  while (!(id = tokens.pop()));
  return Number(id);
};
