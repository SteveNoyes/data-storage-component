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
        label: (ctx) => `${ctx.parsed.x.toLocaleString()} users`,
      },
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: { color: '#f0f0f0' },
      ticks: { color: '#888888', font: { size: 11 } },
    },
    y: {
      grid: { display: false },
      ticks: { color: '#555555', font: { size: 11 } },
    },
  },
};

export default function EnrollmentByIndication({ data }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Active Users',
        data: data.values,
        backgroundColor: data.labels.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
        borderRadius: 4,
        barThickness: 16,
      },
    ],
  };

  return <Bar data={chartData} options={OPTIONS} />;
}
