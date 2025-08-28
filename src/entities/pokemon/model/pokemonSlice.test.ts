import { bulbasaur, pikachu } from '../../../shared/lib/mocks';
import {
  pokemonsReducer,
  pokemonsActions,
  getSpecificPokemonData,
} from './pokemonsSlice';

describe('pokemonsSlice', () => {
  test('should add pokemon to store', () => {
    const state = { selectedPokemons: [] };

    const nextState = pokemonsReducer(
      state,
      pokemonsActions.addPokemon(pikachu)
    );

    expect(nextState.selectedPokemons).toEqual([pikachu]);
  });

  test('should not ad dpokemon in store if it is already stored', () => {
    const state = { selectedPokemons: [pikachu] };

    const nextState = pokemonsReducer(
      state,
      pokemonsActions.addPokemon(pikachu)
    );

    expect(nextState.selectedPokemons).toHaveLength(1);
  });

  test('should delete pokemon by name', () => {
    const state = { selectedPokemons: [pikachu, bulbasaur] };

    const nextState = pokemonsReducer(
      state,
      pokemonsActions.removePokemon({ name: 'pikachu' })
    );

    expect(nextState.selectedPokemons).toEqual([bulbasaur]);
  });

  test('should clear selected store', () => {
    const state = { selectedPokemons: [pikachu, bulbasaur] };

    const nextState = pokemonsReducer(state, pokemonsActions.clearPokemons());

    expect(nextState.selectedPokemons).toEqual([]);
  });
  test('getSpecificPokemonData should return true if pokemon is choosen', () => {
    const state = {
      pokemons: { selectedPokemons: [pikachu] },
    };

    const result = getSpecificPokemonData('pikachu')(state);

    expect(result).toBe(true);
  });

  test('getSpecificPokemonData should return false if pokemon is not stored', () => {
    const state = {
      pokemons: { selectedPokemons: [] },
    };

    const result = getSpecificPokemonData('pikachu')(state);

    expect(result).toBe(false);
  });
});
