import { Link, useLocation, useNavigate } from 'react-router';
import styles from './Header.module.css';
import { ThemeButton } from '../../../features/ThemeButton';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMainClick = () => {
    navigate('/');
  };

  return (
    <header className={styles.wrapper}>
      <div className={styles['title-wrapper']}>
        <h1 className={styles.title}>
          <Link to={'/'}>PokéDexplorer</Link>
        </h1>
        <p className={styles.text}>Explore the Pokémon universe</p>
      </div>
      <div className={styles['button-wrapper']}>
        {location.pathname !== '/' && (
          <button className={styles.list} onClick={handleMainClick}>
            Main
          </button>
        )}
        <button className={styles.about} onClick={() => navigate('/about')}>
          About
        </button>
        <ThemeButton />
      </div>
    </header>
  );
};
