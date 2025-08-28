import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import type {
  ApiResponse,
  NamedAPIResource,
  RawPokemonResponse,
  RawPokemonSpeciesResponse,
} from './api.types';
import { BASE_API, POKEMON_URL } from '../lib/constants';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API }),
  tagTypes: ['PokemonList', 'Pokemon'],
  endpoints: (builder) => ({
    getDescription: builder.query<string | null, string>({
      query: (url) => url.replace(BASE_API, ''),
      transformResponse: (response: RawPokemonSpeciesResponse) => {
        const entry = response.flavor_text_entries.find(
          (item) => item.language.name === 'en'
        );
        return entry ? entry.flavor_text.replace(/\f|\n/g, ' ') : null;
      },
    }),

    getOnePokemon: builder.query<RawPokemonResponse, NamedAPIResource | string>(
      {
        query: (source) => {
          const name = typeof source === 'string' ? source : source.name;
          return typeof source === 'string'
            ? `/pokemon/${name}`
            : source.url.replace(BASE_API, '');
        },
        providesTags: (_, __, arg) => [
          { type: 'Pokemon', id: typeof arg === 'string' ? arg : arg.name },
        ],
      }
    ),
    getManyPokemons: builder.query<
      ApiResponse<NamedAPIResource>,
      { query?: string; page?: number }
    >({
      query: ({ query, page = 1 }) => {
        if (query) return `/${query.toLowerCase()}`;
        const offset = (page - 1) * 20;
        return `/pokemon?limit=20&offset=${offset}`;
      },
      transformResponse: (
        response: RawPokemonResponse
      ): ApiResponse<NamedAPIResource> => {
        if ('name' in response) {
          const data = response;
          return {
            count: 1,
            results: [
              {
                name: data.name,
                url: `${BASE_API}${POKEMON_URL}${data.name}`,
              },
            ],
          };
        }
        return response;
      },
      providesTags: (_, __, arg) => [{ type: 'PokemonList', id: arg.page }],
    }),
  }),
});

export const {
  useGetDescriptionQuery,
  useGetOnePokemonQuery,
  useGetManyPokemonsQuery,
} = pokemonApi;
