import { render, screen } from '@testing-library/react';
import { AboutPage } from './AboutPage';

describe('AboutPage', () => {
  test('renders title and paragraphs correctly', () => {
    render(<AboutPage />);

    expect(
      screen.getByText(/This is a learning project built as part/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/The user can search for Pokémon by name/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Thank you for checking out this project/i)
    ).toBeInTheDocument();
  });

  test('contains link on RS School', () => {
    const { getByText } = render(<AboutPage />);
    const link = getByText(/RS School/i);

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });

  test("contains author's github", () => {
    const { getByText } = render(<AboutPage />);
    const githubLink = getByText(/@akseee/i);

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/akseee');
  });
});
