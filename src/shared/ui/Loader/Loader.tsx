import { Component } from 'react';
import styles from './Loader.module.css';

interface LoaderProps {
  className?: string;
}

export class Loader extends Component<LoaderProps> {
  render() {
    const { className = '' } = this.props;
    return (
      <div className={`${styles['spinner-container']} ${styles[className]}`}>
        <div className={styles['spinner-ring']} />
      </div>
    );
  }
}
