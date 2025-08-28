import { render, screen } from '@testing-library/react';
import { SearchForm } from './SearchForm';
import userEvent from '@testing-library/user-event';

describe('SearchForm ', () => {
  test('renders search input, search and clear buttons', () => {
    render(
      <SearchForm
        query="initial"
        onSubmit={vi.fn()}
        isLoading={false}
        onRefresh={() => {}}
      />
    );
    const input: HTMLInputElement = screen.getByPlaceholderText('Search…');
    const searchButton = screen.getByRole('button', { name: /find/i });
    const clearButton = screen.getByRole('button', { name: /clear/i });

    expect(input.value).toBe('initial');
    expect(searchButton).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
  });

  test('shows empty input when no saved term exists', () => {
    render(
      <SearchForm onSubmit={vi.fn()} isLoading={false} onRefresh={() => {}} />
    );

    const input: HTMLInputElement = screen.getByRole('textbox');
    expect(input.value).toBe('');
  });

  test('updates input value when user types', async () => {
    render(
      <SearchForm onSubmit={vi.fn()} isLoading={false} onRefresh={() => {}} />
    );
    const user = userEvent.setup();
    const input: HTMLInputElement = screen.getByRole('textbox');

    await user.type(input, 'test');

    expect(input.value).toBe('test');
  });

  test('calls onSubmit and trims input on form submit', async () => {
    const onSubmit = vi.fn();
    render(
      <SearchForm onSubmit={onSubmit} isLoading={false} onRefresh={() => {}} />
    );
    const user = userEvent.setup();

    const input: HTMLInputElement = screen.getByPlaceholderText('Search…');

    await user.type(input, '  test  ');
    await user.click(screen.getByRole('button', { name: /find/i }));

    expect(onSubmit).toHaveBeenCalledWith('test');
  });

  test('clears value written in inout', async () => {
    render(
      <SearchForm
        onSubmit={vi.fn()}
        query={'value'}
        isLoading={false}
        onRefresh={() => {}}
      />
    );
    const user = userEvent.setup();

    const input: HTMLInputElement = screen.getByPlaceholderText('Search…');
    const clearButton = screen.getByRole('button', { name: /clear/i });

    await user.click(clearButton);

    expect(input.value).toBe('');
  });

  test('triggers refreshFn when refresh button is clicked', async () => {
    const onRefreshMock = vi.fn();
    render(
      <SearchForm
        onSubmit={vi.fn()}
        query={'value'}
        isLoading={false}
        onRefresh={onRefreshMock}
      />
    );
    const user = userEvent.setup();

    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    await user.click(refreshButton);

    expect(onRefreshMock).toHaveBeenCalledTimes(1);
  });
});
