import { Link } from 'react-router';
import styles from './NotFound.module.css';

export const NotFound = () => {
  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.title}>This page doesnt exist</h2>
        <Link to="/" className={styles.link}>
          Go back to the main page
        </Link>
      </div>
    </div>
  );
};
