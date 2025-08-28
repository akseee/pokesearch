import { Component } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { render, screen } from '@testing-library/react';

class ForceError extends Component {
  condition = true;
  render() {
    if (this.condition) {
      throw new Error('Forced test error');
    }
    return <div>Didnt work</div>;
  }
}

describe('Error Boundary', () => {
  const consoleErrorSpy = vi
    .spyOn(console, 'error')
    .mockImplementation(() => {});

  describe('Error Catching', () => {
    test('displays fallback UI when error occurs', () => {
      render(
        <ErrorBoundary>
          <ForceError />
        </ErrorBoundary>
      );

      const text = screen.getByText('Something went wrong');
      const error = screen.getByText('Forced test error');
      const button = screen.getByRole('button');

      expect(text).toBeInTheDocument();
      expect(error).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });

    test('logs error to console', () => {
      render(
        <ErrorBoundary>
          <ForceError />
        </ErrorBoundary>
      );

      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });
});
