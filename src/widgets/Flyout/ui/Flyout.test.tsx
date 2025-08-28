import { render, screen, fireEvent } from '@testing-library/react';
import { Flyout } from './Flyout';
import { useDispatch, useSelector } from 'react-redux';
import { useDispatch as useAppDispatch } from '../../../app/store';
import { downloadCSV } from '../model/downloadCSV';

import { mockPokemonResponse } from '../../../shared/lib/mocks';
import { pokemonsActions } from '../../../entities/pokemon';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

vi.mock('../../../app/store', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('../model/downloadCSV', () => ({
  downloadCSV: vi.fn(),
}));

vi.mock('../../../entities/pokemon', () => ({
  pokemonsActions: {
    clearPokemons: vi.fn(),
  },
  pokemonsSelectors: {
    getSelectedCount: vi.fn(),
    getSelectedPokemonsData: vi.fn(),
  },
}));

const mockDispatch = vi.fn();

describe('Flyout', () => {
  beforeEach(() => {
    globalThis.URL.createObjectURL = vi.fn(() => 'mock-url');
    globalThis.URL.revokeObjectURL = vi.fn();

    vi.mocked(useDispatch).mockReturnValue(mockDispatch);
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should be visible when store is not empty and show correct amount', () => {
    vi.mocked(useSelector)
      .mockImplementationOnce(() => 2)
      .mockImplementationOnce(() => [mockPokemonResponse, mockPokemonResponse]);

    render(<Flyout />);

    expect(screen.getByText('2 pokemons selected')).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  test('should not be visible when store is empty', () => {
    vi.mocked(useSelector)
      .mockImplementationOnce(() => 0)
      .mockImplementationOnce(() => []);

    render(<Flyout />);

    expect(screen.queryByText(/pokemon/)).not.toBeInTheDocument();
    expect(screen.queryByText('Unselect all')).not.toBeInTheDocument();
    expect(screen.queryByText('Download')).not.toBeInTheDocument();
  });

  test('should call clearPokemons on onUnselectClick', () => {
    vi.mocked(useSelector)
      .mockImplementationOnce(() => 1)
      .mockImplementationOnce(() => [mockPokemonResponse]);

    render(<Flyout />);

    const unselectButton = screen.getByText('Unselect all');
    fireEvent.click(unselectButton);

    expect(mockDispatch).toHaveBeenCalledWith(pokemonsActions.clearPokemons());
  });

  test('should call downloadCSV on onDownloadClick', () => {
    const mockSelectedPokemons = [mockPokemonResponse];

    vi.mocked(useSelector)
      .mockImplementationOnce(() => 1)
      .mockImplementationOnce(() => mockSelectedPokemons);

    render(<Flyout />);

    const downloadButton = screen.getByText('Download');
    fireEvent.click(downloadButton);

    expect(downloadCSV).toHaveBeenCalled();
    // expect(mockDispatch).toHaveBeenCalledWith(pokemonsActions.clearPokemons());
  });
});
