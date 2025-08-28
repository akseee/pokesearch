import {
  useGetDescriptionQuery,
  useGetOnePokemonQuery,
} from '../../../shared/api/pokemonApi';
import type { PokemonData } from '../../../shared/types/pokemon.types';
import { tranformPokemonData } from '../../../shared/lib/transformPokemonData';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';
import type { NamedAPIResource } from '../../../shared/api/api.types';

export const usePokemonData = (
  name: string | NamedAPIResource
): {
  pokemonData: PokemonData | null;
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
} => {
  const {
    data: pokemonData,
    isLoading: isPokemonLoading,
    error: pokemonError,
  } = useGetOnePokemonQuery(name);

  const speciesUrl = pokemonData?.species.url ?? '';

  const {
    data: description,
    isLoading: isDescriptionLoading,
    error: descriptionError,
  } = useGetDescriptionQuery(speciesUrl, {
    skip: !speciesUrl,
  });

  const parsed = pokemonData
    ? tranformPokemonData(pokemonData, description || null)
    : null;

  return {
    pokemonData: parsed,
    isLoading: isPokemonLoading || isDescriptionLoading,
    error: pokemonError || descriptionError,
  };
};
