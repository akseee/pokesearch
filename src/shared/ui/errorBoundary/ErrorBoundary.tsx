import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Caught by ErrorBoundary:', error, info);
  }

  resetError = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            alignSelf: 'center',
            padding: '2rem',
            color: 'red',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2em',
          }}
        >
          <h2>Something went wrong </h2>
          <p>{this.state.error.message}</p>
          <button onClick={this.resetError}>
            Lets try to not break something next time?
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
