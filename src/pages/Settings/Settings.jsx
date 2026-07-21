import { useDashboard } from '../../context/DashboardContext.jsx';
import styles from './Settings.module.css';

const REFRESH_OPTIONS = [
  { value: 0, label: 'Off' },
  { value: 15000, label: '15 seconds' },
  { value: 30000, label: '30 seconds' },
  { value: 60000, label: '1 minute' },
  { value: 300000, label: '5 minutes' },
  { value: 900000, label: '15 minutes' },
  { value: 1800000, label: '30 minutes' },
];

const MONTH_OPTIONS = [3, 6, 9, 12];

export default function Settings() {
  const { state, dispatch } = useDashboard();

  return (
    <div className={styles.page}>
      <h2>Settings</h2>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Auto-Refresh</h3>
        <p className={styles.sectionDesc}>
          Automatically regenerate data on a timer.
        </p>
        <div className={styles.settingRow}>
          <label className={styles.settingLabel} htmlFor="refresh-interval">
            Refresh interval
          </label>
          <select
            id="refresh-interval"
            className={styles.select}
            value={state.refreshInterval}
            onChange={(e) =>
              dispatch({
                type: 'SET_REFRESH_INTERVAL',
                payload: Number(e.target.value),
              })
            }
          >
            {REFRESH_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Data Range</h3>
        <p className={styles.sectionDesc}>
          Number of months to display on the dashboard.
        </p>
        <div className={styles.settingRow}>
          <label className={styles.settingLabel}>Months shown</label>
          <div className={styles.buttonGroup}>
            {MONTH_OPTIONS.map((m) => (
              <button
                key={m}
                className={`${styles.monthBtn} ${
                  state.monthsDisplay === m ? styles.monthBtnActive : ''
                }`}
                onClick={() =>
                  dispatch({ type: 'SET_MONTHS_DISPLAY', payload: m })
                }
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Theme</h3>
        <p className={styles.sectionDesc}>
          Toggle between light and dark mode.
        </p>
        <div className={styles.settingRow}>
          <label className={styles.settingLabel} htmlFor="theme-select">
            Color scheme
          </label>
          <select
            id="theme-select"
            className={styles.select}
            value={state.theme}
            onChange={(e) => dispatch({ type: 'SET_THEME', payload: e.target.value })}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Data</h3>
        <p className={styles.sectionDesc}>
          Data is auto-generated on page load and refresh. Each refresh
          produces a new randomized dataset.
        </p>
        <div className={styles.settingRow}>
          <span className={styles.settingLabel}>Last refreshed</span>
          <span className={styles.settingValue}>
            {state.lastRefreshed
              ? state.lastRefreshed.toLocaleTimeString()
              : '—'}
          </span>
        </div>
      </section>
    </div>
  );
}
