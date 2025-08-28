import type { RawPokemonResponse } from '../api/api.types';
import type { PokemonData } from '../types/pokemon.types';
import { getPokemonStats } from './getPokemonStats';

export function tranformPokemonData(
  raw: RawPokemonResponse,
  description?: string | null
): PokemonData {
  const statMap: Record<string, number> = {};

  for (const s of raw.stats) {
    statMap[s.stat.name] = s.base_stat;
  }

  const image =
    raw.sprites.other['official-artwork']?.front_default ||
    raw.sprites.other.dream_world?.front_default ||
    '';

  const statsObj: PokemonData['stats'] = {
    hp: getPokemonStats(raw, 'hp'),
    attack: getPokemonStats(raw, 'attack'),
    defense: getPokemonStats(raw, 'defense'),
    speed: getPokemonStats(raw, 'speed'),
    ['special-attack']: getPokemonStats(raw, 'special-attack'),
    ['special-defense']: getPokemonStats(raw, 'special-defense'),
  };

  const result: PokemonData = {
    name: raw.name,
    id: raw.id,
    order: raw.order,
    type: raw.types[0]?.type.name || 'unknown',
    image,
    stats: statsObj,
    description:
      description ||
      'This mysterious Pokémon eludes our research — its secrets remain hidden in the shadows. Perhaps one day, brave trainers will unveil its true nature!',
  };

  return result;
}
