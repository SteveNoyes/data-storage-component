import { Doughnut } from 'react-chartjs-2';

const OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  rotation: -90,
  circumference: 180,
  cutout: '75%',
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
};

export default function GaugeChart({ forecast, actual }) {
  const remaining = Math.max(forecast - actual, 0);
  const pct = forecast > 0 ? ((actual / forecast) * 100).toFixed(1) : 0;

  const chartData = {
    datasets: [
      {
        data: [actual, remaining],
        backgroundColor: [
          actual >= forecast ? '#6B8E7F' : '#C9A961',
          '#f0f0f0',
        ],
        borderWidth: 0,
        hoverOffset: 0,
      },
    ],
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '140px' }}>
      <Doughnut data={chartData} options={OPTIONS} />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: 'center',
          paddingBottom: 'var(--space-sm)',
        }}
      >
        <span
          style={{
            fontSize: 'var(--font-size-2xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-text-primary)',
          }}
        >
          {pct}%
        </span>
        <p
          style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-muted)',
            margin: 0,
          }}
        >
          of target achieved
        </p>
      </div>
    </div>
  );
}
