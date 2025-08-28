const mockUsePokemonData = vi.fn();
const mockNavigate = vi.fn();

vi.mock('../../../entities/pokemon/model/usePokemonData', () => ({
  usePokemonData: (name: string) => mockUsePokemonData(name),
}));

import { MemoryRouter } from 'react-router';
import { mockDetailedCardData } from '../../../shared/lib/mocks';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DetailedCardPage } from './DetailedCardPage';
import type { PokemonData } from '../../../shared/types/pokemon.types';

vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useParams: () => ({ pokemon: 'pikachu' }),
    useLocation: () => ({ search: '?query=pikachu' }),
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../../../entities/pokemon/ui/DetailedCard', () => ({
  DetailedCard: ({ pokemonData }: { pokemonData: PokemonData }) => (
    <div data-testid="card-layout-wrapper">
      <div>{pokemonData.name}</div>
      <div>{pokemonData.type}</div>
      <div>#{String(pokemonData.order).padStart(3, '0')}</div>
      <p>{pokemonData.description}</p>
    </div>
  ),
}));

describe('DetailedCardPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders DetailedCard with correct data', () => {
    mockUsePokemonData.mockReturnValue({
      pokemonData: mockDetailedCardData,
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <DetailedCardPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('card-layout-wrapper')).toBeInTheDocument();
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/#025/i)).toBeInTheDocument();
    expect(screen.getByText(/This is a test description/i)).toBeInTheDocument();
  });

  test('calls navigate when close button clicked', async () => {
    mockUsePokemonData.mockReturnValue({
      pokemonData: mockDetailedCardData,
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <DetailedCardPage />
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const closeButton = screen.getByRole('button');

    await user.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/',
      search: '?query=pikachu',
    });
  });
});
