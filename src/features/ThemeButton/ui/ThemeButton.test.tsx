import { render, screen } from '@testing-library/react';
import { ThemeButton } from './ThemeButton';
import userEvent from '@testing-library/user-event';
import { ThemeContext } from '../../../shared/config/context/context';

const mockSetTheme = vi.fn();

const renderWithTheme = (theme = 'light') => {
  return render(
    <ThemeContext.Provider value={{ theme, setTheme: mockSetTheme }}>
      <ThemeButton />
    </ThemeContext.Provider>
  );
};

describe('ThemeButton', () => {
  beforeEach(() => {
    mockSetTheme.mockClear();
  });

  test('renders sun icon for light theme and toggles theme from light to dark on click', async () => {
    renderWithTheme('light');

    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();

    const button = screen.getByRole('button');
    const user = userEvent.setup();

    await user.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  test('renders moon icon for dark theme and toggles theme from dark to light on click', async () => {
    renderWithTheme('dark');

    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    const button = screen.getByRole('button');

    const user = userEvent.setup();
    await user.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });
});
