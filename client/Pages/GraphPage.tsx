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

export const options = {
  indexAxis: 'y' as const,
  // elements: {
  //   bar: {
  //     borderWidth: 3,
  //   },
  // },
  plugins: {
    title: {
      display: true,
      text: "Kirsty's Progress",
    },
  },
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

// data that I have hardcoded - the shape I want
const stats = [
  { date: '01-12-2023', tasksDone: 33 },
  { date: '02-12-2023', tasksDone: 100 },
]

// must be called labels to work
const labels = stats.map((e) => e.date)

export const data = {
  labels,
  datasets: [
    {
      label: 'Completed Tasks',
      data: stats.map((e) => e.tasksDone),
      backgroundColor: '#7743DB',
    },
    {
      label: 'Total Tasks',
      data: stats.map(() => 100),
      backgroundColor: '#C3ACD0',
    },
  ],
}

export function GraphPage() {
  return <Bar options={options} data={data} />
}
