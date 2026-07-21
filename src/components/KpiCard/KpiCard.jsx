import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import styles from './KpiCard.module.css';

export default function KpiCard({ title, value, prefix = '', suffix = '', trend, trendLabel }) {
  const trendDirection = trend > 0 ? 'up' : trend < 0 ? 'down' : 'neutral';

  const TrendIcon = trendDirection === 'up'
    ? TrendingUp
    : trendDirection === 'down'
      ? TrendingDown
      : Minus;

  return (
    <div className={styles.card}>
      <p className={styles.title}>{title}</p>
      <p className={styles.value}>
        {prefix}{value}{suffix}
      </p>
      {trend !== undefined && (
        <div className={`${styles.trend} ${styles[trendDirection]}`}>
          <TrendIcon size={14} />
          <span>{Math.abs(trend).toFixed(1)}%</span>
          {trendLabel && <span className={styles.trendLabel}>{trendLabel}</span>}
        </div>
      )}
    </div>
  );
}
