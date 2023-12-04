import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function GraphPage({ stats }) {
  const options = {
    indexAxis: 'y' as const,
    plugins: {},
    responsive: true,
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: true,
      },
    },
  }

  // must be called labels to work
  const labels = stats.map((e) => e.date)

  const data = {
    labels,
    datasets: [
      {
        label: 'Percentage Completed',
        data: stats.map((e) => e.percentDone),
        backgroundColor: '#7743DB',
      },
      {
        label: 'Total',
        data: stats.map(() => 100),
        backgroundColor: '#C3ACD0',
      },
    ],
  }

  return <Bar options={options} data={data} />
}
