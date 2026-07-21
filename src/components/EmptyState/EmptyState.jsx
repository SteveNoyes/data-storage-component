import { BarChart3 } from 'lucide-react';
import styles from './EmptyState.module.css';

export default function EmptyState({ message = 'No data available for this chart' }) {
  return (
    <div className={styles.empty}>
      <BarChart3 size={32} className={styles.icon} />
      <p className={styles.message}>{message}</p>
    </div>
  );
}
