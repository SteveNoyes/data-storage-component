import { Radar } from 'react-chartjs-2';

const OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => `${ctx.parsed.r.toFixed(1)}% adoption`,
      },
    },
  },
  scales: {
    r: {
      beginAtZero: true,
      max: 100,
      ticks: {
        stepSize: 25,
        color: '#888888',
        backdropColor: 'transparent',
        font: { size: 10 },
      },
      grid: { color: '#e0e0e0' },
      pointLabels: {
        color: '#555555',
        font: { size: 11 },
      },
    },
  },
};

export default function TherapeuticCoverageChart({ data }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Adoption %',
        data: data.values,
        backgroundColor: 'rgba(107, 142, 127, 0.15)',
        borderColor: '#6B8E7F',
        borderWidth: 2,
        pointBackgroundColor: '#6B8E7F',
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  return <Radar data={chartData} options={OPTIONS} />;
}
