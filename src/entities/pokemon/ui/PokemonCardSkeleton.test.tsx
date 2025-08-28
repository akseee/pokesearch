import { render, screen } from '@testing-library/react';
import { PokemonSkeletonCard } from './PokemonCardSkeleton';

describe('Pokemon Card', () => {
  describe('Render', () => {
    test('should render with fallabck data', () => {
      render(<PokemonSkeletonCard />);

      const title = screen.getByText('Pokemon');
      const order = screen.getByText('#000');

      expect(title).toHaveTextContent('Pokemon');
      expect(order).toHaveTextContent('#000');

      const spinner = document.querySelector('[class*="spinner"]');
      expect(spinner).toBeInTheDocument();
    });
  });
});
