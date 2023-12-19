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
  ChartType,
  PointElement,
  LineElement
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

interface propsType {
  type: ChartType,
  data: ChartData
  options: ChartOptions
  width?: number | string
  height?: number | string
}
export default function ChartsComponents(props: propsType) {
  return (
    <Chart type={props.type} data={props.data} options={props.options} width={props.width}
    height={props.height} className='!w-[100%] !h-[-webkit-fill-available !important] md:!w-[100%] md:!h-[-webkit-fill-available !important]' />
  )
}