import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import styles from './ErrorBanner.module.css';

export default function ErrorBanner({ message, onRetry }) {
  const [spinning, setSpinning] = useState(false);

  const handleRetry = () => {
    setSpinning(true);
    onRetry?.();
    setTimeout(() => setSpinning(false), 1000);
  };

  return (
    <div className={styles.banner}>
      <div className={styles.icon}>
        <AlertTriangle size={20} />
      </div>
      <div className={styles.content}>
        <p className={styles.title}>Failed to load dashboard data</p>
        <p className={styles.message}>{message}</p>
      </div>
      {onRetry && (
        <button className={styles.retry} onClick={handleRetry}>
          <RefreshCw size={14} className={spinning ? styles.spinning : ''} />
          Retry
        </button>
      )}
    </div>
  );
}
