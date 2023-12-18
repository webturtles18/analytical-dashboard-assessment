"use client"; // This is a client component
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartData,
  ChartOptions,
  ChartType
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface propsType {
  type: ChartType,
  data: ChartData
  options: ChartOptions
}
export default function ChartsComponents(props: propsType) {
  return (
    <Chart type={props.type} data={props.data} options={props.options} />
  )
}