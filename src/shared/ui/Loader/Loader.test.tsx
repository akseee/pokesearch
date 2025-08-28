import { render } from '@testing-library/react';
import { Loader } from './Loader';
import styles from './Loader.module.css';

describe('Loading Component ', () => {
  describe('Rendering', () => {
    test('renders loading indicator', async () => {
      render(<Loader className="test" />);

      const loader = document.querySelector(`.${styles['spinner-container']}`);

      expect(loader?.className).toContain(styles['test']);
    });
  });
});
