import styles from './ChartCard.module.css';

export default function ChartCard({ title, description, colorTheme, children }) {
  return (
    <div className={`${styles.card} ${colorTheme ? styles[colorTheme] : ''}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <div className={styles.body}>
        {children}
      </div>
    </div>
  );
}
