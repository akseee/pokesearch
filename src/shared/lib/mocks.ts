import type {
  NamedAPIResource,
  RawPokemonResponse,
  RawPokemonSpeciesResponse,
} from '../api/api.types';
import type { PokemonData } from '../types/pokemon.types';

export const mockPokemonResponse: RawPokemonResponse = {
  name: 'pikachu',
  id: 25,
  order: 25,
  sprites: {
    other: {
      'official-artwork': { front_default: 'image-url' },
      dream_world: { front_default: undefined },
    },
  },
  types: [{ type: { name: 'electric' } }],
  stats: [
    { base_stat: 35, stat: { name: 'hp' } },
    { base_stat: 55, stat: { name: 'attack' } },
  ],
  species: { url: 'https://pokeapi.co/api/v2/pokemon-species/pikachu' },
};

export const mockSpeciesResponse: RawPokemonSpeciesResponse = {
  flavor_text_entries: [
    {
      flavor_text: 'This is a test description',
      language: { name: 'en' },
    },
  ],
};

export const mockCardData = {
  name: 'pikachu',
  id: 25,
  order: 25,
  sprites: {
    other: {
      'official-artwork': { front_default: 'image-url' },
      dream_world: { front_default: undefined },
    },
  },
  types: [{ type: { name: 'electric' } }],
  stats: [
    { base_stat: 35, stat: { name: 'hp' } },
    { base_stat: 55, stat: { name: 'attack' } },
  ],
  flavor_text_entries: [
    {
      flavor_text: 'This is a test description',
      language: { name: 'en' },
    },
  ],
};

export const mockDetailedCardData = {
  name: 'pikachu',
  type: 'electric',
  id: 25,
  description: 'This is a test description',
  image: 'image-url',
  stats: [
    { name: 'hp', value: 35 },
    { name: 'attack', value: 55 },
  ],
  order: 25,
};

export const mockPokemonSource: NamedAPIResource = {
  name: 'pikachu',
  url: 'https://pokeapi.co/api/v2/pokemon/pikachu',
};

export const mockPokemonsPage1 = {
  count: 3,
  next: '/?page=1',
  previous: null,
  results: [
    { name: 'pokemon1', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'pokemon2', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    { name: 'pokemon3', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
  ],
};

export const mockPokemonsPage2 = {
  count: 3,
  next: null,
  previous: '/?page=2',
  results: [
    { name: 'pokemon4', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    { name: 'pokemon5', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
    { name: 'pokemon6', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
  ],
};

export const pikachu: PokemonData = {
  name: 'pikachu',
  image: 'pikachu.png',
  order: 25,
  description: 'test',
  type: 'electric',
  stats: { hp: 23 },
  id: 25,
};

export const bulbasaur: PokemonData = {
  name: 'bulbasaur',
  image: 'bulbasaur.png',
  order: 1,
  type: 'grass',
  description: 'test',
  stats: { hp: 23 },
  id: 26,
};
