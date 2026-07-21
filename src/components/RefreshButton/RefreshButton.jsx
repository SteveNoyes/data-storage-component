import { RefreshCw } from 'lucide-react';
import { useState } from 'react';
import styles from './RefreshButton.module.css';

export default function RefreshButton({ onRefresh }) {
  const [spinning, setSpinning] = useState(false);

  const handleClick = () => {
    setSpinning(true);
    onRefresh?.();
    setTimeout(() => setSpinning(false), 1000);
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      <RefreshCw size={16} className={spinning ? styles.spinning : ''} />
      Refresh
    </button>
  );
}
