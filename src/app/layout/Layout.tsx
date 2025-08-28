import { Header } from '../../widgets/Header';
import { Outlet } from 'react-router';
import styles from './Layout.module.css';
import { Flyout } from '../../widgets/Flyout/ui/Flyout';

export const Layout = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Flyout />
    </>
  );
};
