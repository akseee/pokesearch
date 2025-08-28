import { renderHook, waitFor } from '@testing-library/react';
import { server } from '../../../shared/config/msw/server';
import { usePokemonData } from './usePokemonData';
import type { ReactNode } from 'react';
import store from '../../../app/store';
import { Provider } from 'react-redux';
import { mockPokemonSource } from '../../../shared/lib/mocks';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('usePokemonData', () => {
  const wrapper = ({ children }: { children: ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  test('loads pokemon data and description correctly if give a name', async () => {
    const { result } = renderHook(() => usePokemonData('pikachu'), {
      wrapper,
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.pokemonData).toBeNull();
    expect(result.current.error).toBeUndefined();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.pokemonData?.name).toBe('pikachu');
    expect(result.current.pokemonData?.description).toBe(
      'This is a test description'
    );
    expect(result.current.error).toBeUndefined();
  });

  test('loads pokemon data and description correctly if give object', async () => {
    const { result } = renderHook(() => usePokemonData(mockPokemonSource), {
      wrapper,
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.pokemonData).toBeNull();
    expect(result.current.error).toBeUndefined();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.pokemonData?.name).toBe('pikachu');
    expect(result.current.pokemonData?.description).toBe(
      'This is a test description'
    );
    expect(result.current.error).toBeUndefined();
  });
});
