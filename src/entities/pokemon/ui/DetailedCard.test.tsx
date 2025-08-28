import { render, screen } from '@testing-library/react';
import { DetailedCard } from './DetailedCard';

import { pikachu } from '../../../shared/lib/mocks';

vi.mock('./PokemonCardSkeleton', () => ({
  PokemonSkeletonCard: () => <div data-testid="skeleton-card" />,
}));

vi.mock('../../../shared/ui/Loader/Loader', () => ({
  Loader: () => <div data-testid="loader" />,
}));

vi.mock('../PokemonStatsList', () => ({
  PokemonStatsList: () => <div data-testid="stats-list"></div>,
}));

describe('DetailedCard', () => {
  test('should show erorr text', () => {
    render(<DetailedCard pokemonData={pikachu} error="failed to load data" />);
    expect(screen.getByText('failed to load data')).toBeInTheDocument();
  });

  test('should show detailed information', () => {
    render(<DetailedCard pokemonData={pikachu} />);

    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('electric')).toBeInTheDocument();
    expect(screen.getByText('#025')).toBeInTheDocument();
  });
});
