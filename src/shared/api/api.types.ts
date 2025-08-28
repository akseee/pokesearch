export interface ApiResponse<T> {
  count: number;
  results: T[];
}

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface RawPokemonResponse {
  name: string;
  id: number;
  order: number;
  sprites: {
    other: {
      ['official-artwork']?: {
        front_default?: string;
      };
      dream_world?: {
        front_default?: string;
      };
    };
  };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  species: { url: string };
}

export interface RawPokemonSpeciesResponse {
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
  }[];
}
