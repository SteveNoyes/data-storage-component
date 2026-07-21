import { Line } from 'react-chartjs-2';

const OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => `${ctx.parsed.y.toLocaleString()} users`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      grid: { color: '#f0f0f0' },
      ticks: { color: '#888888', font: { size: 11 } },
    },
    x: {
      grid: { display: false },
      ticks: { color: '#888888', font: { size: 11 } },
    },
  },
};

export default function EnrollmentTrendChart({ data }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Monthly Active Users',
        data: data.values,
        borderColor: '#5B7C99',
        backgroundColor: 'rgba(91, 124, 153, 0.12)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#5B7C99',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        borderWidth: 2.5,
      },
    ],
  };

  return <Line data={chartData} options={OPTIONS} />;
}
