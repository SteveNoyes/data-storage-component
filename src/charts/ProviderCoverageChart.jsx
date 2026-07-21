import { Bar } from 'react-chartjs-2';

const OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      align: 'end',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        color: '#555555',
        font: { size: 11 },
        padding: 16,
      },
    },
    tooltip: {
      callbacks: {
        label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(1)}%`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      grid: { color: '#f0f0f0' },
      ticks: {
        color: '#888888',
        font: { size: 11 },
        callback: (v) => `${v}%`,
      },
    },
    x: {
      grid: { display: false },
      ticks: { color: '#555555', font: { size: 11 } },
    },
  },
};

export default function ProviderCoverageChart({ data }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Adoption %',
        data: data.coverage,
        backgroundColor: '#6B8E7F',
        borderRadius: 4,
        barPercentage: 0.8,
        categoryPercentage: 0.6,
      },
      {
        label: 'Market Share %',
        data: data.population,
        backgroundColor: '#7B6B8E',
        borderRadius: 4,
        barPercentage: 0.8,
        categoryPercentage: 0.6,
      },
    ],
  };

  return <Bar data={chartData} options={OPTIONS} />;
}
