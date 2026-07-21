import { Pie } from 'react-chartjs-2';
import { CHART_COLORS } from '../utils/constants.js';

const OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
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
        label: (ctx) => `${ctx.label}: ${ctx.parsed.toFixed(1)}% adoption`,
      },
    },
  },
};

export default function GeographicCoverageChart({ data }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: data.labels.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverOffset: 6,
      },
    ],
  };

  return <Pie data={chartData} options={OPTIONS} />;
}
