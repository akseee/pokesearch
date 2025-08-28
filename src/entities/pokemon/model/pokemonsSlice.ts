import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PokemonData } from '../../../shared/types/pokemon.types';

const sliceName = 'pokemons';

interface InitialState {
  selectedPokemons: PokemonData[];
}
const initialState: InitialState = {
  selectedPokemons: [],
};

const pokemonsSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    addPokemon: (state, action: PayloadAction<PokemonData>) => {
      const selected = state.selectedPokemons.some(
        (p) => p.name === action.payload.name
      );
      if (!selected) {
        state.selectedPokemons.push(action.payload);
      }
    },
    removePokemon: (state, action: PayloadAction<{ name: string }>) => {
      state.selectedPokemons = state.selectedPokemons.filter(
        (char) => char.name !== action.payload.name
      );
    },
    clearPokemons: (state) => {
      state.selectedPokemons = [];
    },
  },
  selectors: {
    getSelectedPokemonsData: (state) => state.selectedPokemons,
    getSelectedCount: (state) => state.selectedPokemons.length,
  },
});

export const getSpecificPokemonData =
  (name: string) => (state: { pokemons: InitialState }) =>
    state.pokemons.selectedPokemons.some((p) => p.name === name);

export const pokemonsReducer = pokemonsSlice.reducer;
export const pokemonsSelectors = pokemonsSlice.selectors;
export const pokemonsActions = pokemonsSlice.actions;
