import { render, screen } from '@testing-library/react';
import PokemonStatsList from './PokemonStatsList';

describe('PokemonStatsList', () => {
  it('renders all stats when provided', () => {
    const mockStats = {
      hp: 35,
      attack: 55,
      defense: 49,
      speed: 45,
      'special-defense': 65,
      'special-attack': 42,
    };

    render(<PokemonStatsList stats={mockStats} />);

    expect(screen.getByText('hp')).toBeInTheDocument();
    expect(screen.getByText('35')).toBeInTheDocument();

    expect(screen.getByText('attack')).toBeInTheDocument();
    expect(screen.getByText('55')).toBeInTheDocument();

    expect(screen.getByText('defense')).toBeInTheDocument();
    expect(screen.getByText('49')).toBeInTheDocument();

    expect(screen.getByText('speed')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();

    expect(screen.getByText('special defense')).toBeInTheDocument();
    expect(screen.getByText('65')).toBeInTheDocument();

    expect(screen.getByText('special attack')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders "unknown" for all stats if stats prop is missing', () => {
    render(<PokemonStatsList />);

    expect(screen.getAllByText('unknown')).toHaveLength(6);
  });
});
