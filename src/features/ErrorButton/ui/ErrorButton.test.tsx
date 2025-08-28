import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../../../shared/ui/errorBoundary/ErrorBoundary';
import { ErrorButton } from './ErrorButton';
import userEvent from '@testing-library/user-event';

describe('Error Button', () => {
  beforeAll(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  test('throws error when test button is clicked', async () => {
    render(
      <ErrorBoundary>
        <div>original</div>
        <ErrorButton />
      </ErrorBoundary>
    );

    const errorButton = screen.getByRole('button');
    const user = userEvent.setup();

    await user.click(errorButton);

    const error = screen.getByText('Congrats, you crashed the app.');
    const text = screen.getByText('Something went wrong');

    expect(error).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});
