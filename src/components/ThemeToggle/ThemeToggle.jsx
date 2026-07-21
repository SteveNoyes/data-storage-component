import { Sun, Moon } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext.jsx';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { state, dispatch } = useDashboard();
  const dark = state.theme === 'dark';

  return (
    <button
      className={styles.button}
      onClick={() => dispatch({ type: 'SET_THEME', payload: dark ? 'light' : 'dark' })}
      aria-label="Toggle theme"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
      {dark ? 'Light' : 'Dark'}
    </button>
  );
}
