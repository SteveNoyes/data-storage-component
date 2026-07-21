import { Doughnut } from 'react-chartjs-2';
import { CHART_COLORS } from '../utils/constants.js';

const OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  rotation: -90,
  circumference: 180,
  cutout: '65%',
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 12,
        usePointStyle: true,
        pointStyle: 'circle',
        color: '#555555',
        font: { size: 11 },
      },
    },
    tooltip: {
      callbacks: {
        label: (ctx) => `${ctx.label}: ${ctx.parsed.toFixed(1)}%`,
      },
    },
  },
};

export default function CoverageIndicationChart({ data }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: data.labels.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '200px' }}>
      <Doughnut data={chartData} options={OPTIONS} />
    </div>
  );
}
