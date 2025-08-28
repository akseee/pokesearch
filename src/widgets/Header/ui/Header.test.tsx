import { Header } from './Header';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      pathname: '/pokesearch',
    }),
  };
});

describe('Header', () => {
  test('should render Main button if not on / path', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('Main')).toBeInTheDocument();
  });

  test('should call navigate("/") when Main button is clicked', async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const user = userEvent.setup();
    await user.click(screen.getByText('Main'));

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('should call navigate ("/about") when About button is clicked', async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const user = userEvent.setup();
    await user.click(screen.getByText('About'));

    expect(mockNavigate).toHaveBeenCalledWith('/about');
  });
});
