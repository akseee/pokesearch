import { describe, expect, test } from 'vitest';
import type { NamedAPIResource } from '../../../shared/api/api.types';
import { ResultList } from './ResultList';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

vi.mock('../../../entities/pokemon', () => ({
  ListCard: ({ name, url }: { name: string; url: string }) => (
    <li data-testid="pokemon-card">
      {name} - {url}
    </li>
  ),
  PokemonSkeletonCard: () => <li data-testid="skeleton-card" />,
}));

describe('ResultList', () => {
  const mockData: NamedAPIResource[] = [
    { name: 'bulbasaur', url: '/url-1' },
    { name: 'ivysaur', url: '/url-2' },
    { name: 'venusaur', url: '/url-3' },
  ];

  test('renders correct number of items when data is provided', () => {
    render(
      <MemoryRouter>
        <ResultList isLoading={false} pokemons={mockData} />
      </MemoryRouter>
    );
    const cards = screen.getAllByTestId('pokemon-card');
    expect(cards.length).toBe(mockData.length);
  });

  test('displays "no results" message when data array is empty and not loading and error is present', () => {
    render(
      <MemoryRouter>
        <ResultList
          isLoading={false}
          pokemons={[]}
          error={'No Pokémon found'}
        />
      </MemoryRouter>
    );
    expect(screen.getByText(/No Pokémon found/i)).toBeInTheDocument();
  });

  test('shows loading skeletons when loading', () => {
    render(
      <MemoryRouter>
        <ResultList isLoading={true} pokemons={[]} />
      </MemoryRouter>
    );
    const skeletons = screen.getAllByTestId('skeleton-card');
    expect(skeletons.length).toBeGreaterThanOrEqual(8);
  });
});
