"use client"; // This is a client component
import ChartsComponents from './Charts';

interface propsType {
  data: Record<string, unknown | string>[]
}

export default function TimeSeries(props: propsType) {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Time-Series Chart',
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [35,400,200,111,333,555,555],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [3,400,200,111,333,555,555],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return (
    <div>
      <p className="py-2 semibold text-lg">Time-Series Analysis</p>
      <div className="rounded-lg shadow-md mb-4">
        <div className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
          <div className="px-3 pt-8 pb-10 text-center relative z-10 h-[400px]">
            <ChartsComponents type='bar' data={data} options={options} />
          </div>
          <div className="absolute bottom-0 inset-x-0">
            <canvas id="chart1" height="70"></canvas>
          </div>
        </div>
      </div>
    </div>
  )
}