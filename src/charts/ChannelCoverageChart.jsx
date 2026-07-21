import { Bar } from 'react-chartjs-2';
import { CHART_COLORS } from '../utils/constants.js';

const OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y',
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => `${ctx.parsed.x.toFixed(1)}% adoption`,
      },
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      max: 100,
      grid: { color: '#f0f0f0' },
      ticks: {
        color: '#888888',
        font: { size: 11 },
        callback: (v) => `${v}%`,
      },
    },
    y: {
      grid: { display: false },
      ticks: { color: '#555555', font: { size: 11 } },
    },
  },
};

export default function ChannelCoverageChart({ data }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Adoption %',
        data: data.values,
        backgroundColor: data.labels.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
        borderRadius: 4,
        barThickness: 20,
      },
    ],
  };

  return <Bar data={chartData} options={OPTIONS} />;
}
