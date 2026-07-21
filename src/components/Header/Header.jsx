import RefreshButton from '../RefreshButton/RefreshButton.jsx';
import ThemeToggle from '../ThemeToggle/ThemeToggle.jsx';
import { useDashboardData } from '../../hooks/useDashboardData.js';
import styles from './Header.module.css';

export default function Header() {
  const { refresh } = useDashboardData();

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Fintech Analytics Dashboard</h1>
      <div className={styles.actions}>
        <RefreshButton onRefresh={refresh} />
        <ThemeToggle />
      </div>
    </header>
  );
}
