const mockNavigate = vi.fn();

import { Provider } from 'react-redux';
import { server } from '../../../shared/config/msw/server';
import { render, screen, waitFor } from '@testing-library/react';
import store from '../../../app/store';
import { MemoryRouter } from 'react-router';
import { ListCard } from './ListCard';
import { mockPokemonSource } from '../../../shared/lib/mocks';
import userEvent from '@testing-library/user-event';

vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ListCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders ListCard with correct data ', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ListCard pokemon={mockPokemonSource} />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
      expect(screen.getByText('#025')).toBeInTheDocument();
      expect(screen.getByText(/electric/i)).toBeInTheDocument();
    });
  });

  test('handles card click and navigates to another page  with search params saved', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/?page=3']}>
          <ListCard pokemon={mockPokemonSource} />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument()
    );

    const user = userEvent.setup();

    const listItem = screen.getByRole('listitem');
    await user.click(listItem);

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: `/pokemon/pikachu`,
      search: '?page=3',
    });
  });
  test('handles checkbox click and sets it as selected in store and unselect with another click', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ListCard pokemon={mockPokemonSource} />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument()
    );

    const user = userEvent.setup();

    const checkbox: HTMLInputElement = screen.getByRole('checkbox');
    expect(checkbox.checked).toBe(false);

    await user.click(checkbox);

    const state = store.getState();

    expect(state.pokemons.selectedPokemons).toContainEqual(
      expect.objectContaining({ name: 'pikachu' })
    );

    await user.click(checkbox);

    const newState = store.getState();
    expect(newState.pokemons.selectedPokemons).not.toContainEqual(
      expect.objectContaining({ name: 'pikachu' })
    );
  });
});
