import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { NotFound } from './NotFound';

describe('NotFound page', () => {
  it('renders heading and link', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /this page doesnt exist/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /go back to the main page/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
});
