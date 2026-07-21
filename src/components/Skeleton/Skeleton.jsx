import styles from './Skeleton.module.css';

export function SkeletonKpiCard() {
  return (
    <div className={styles.kpiCard}>
      <div className={`${styles.skeleton} ${styles.lineTitle}`} />
      <div className={`${styles.skeleton} ${styles.lineValue}`} />
      <div className={`${styles.skeleton} ${styles.lineTrend}`} />
    </div>
  );
}

export function SkeletonChartCard() {
  return (
    <div className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <div className={`${styles.skeleton} ${styles.chartLineTitle}`} />
        <div className={`${styles.skeleton} ${styles.chartLineDesc}`} />
      </div>
      <div className={styles.chartBody}>
        <div className={`${styles.skeleton} ${styles.chartPlaceholder}`} />
      </div>
    </div>
  );
}
