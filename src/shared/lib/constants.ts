import type { ApiResponse, NamedAPIResource } from '../api/api.types';

export const BASE_API = 'https://pokeapi.co/api/v2';
export const POKEMON_URL = BASE_API + '/pokemon/';
export const SPECIES_URL = BASE_API + '/pokemon-species';

export const initialStateApiResponse: ApiResponse<NamedAPIResource> = {
  count: 1,
  results: [],
};

export const STORAGE_KEYS = {
  POKEMON_QUERY: 'pokemon-query',
} as const;
