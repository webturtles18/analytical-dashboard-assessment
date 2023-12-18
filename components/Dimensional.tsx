"use client"; // This is a client component
import ChartsComponents from './Charts';

export default function Dimensional() {
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Dimensional Analysis',
      },
    },
  };
  
  const pieData = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };
  return (
    <div>
      <p className="py-2 semibold text-lg">Dimensional Analysis</p>
        <div className="rounded-lg shadow-md mb-4">
          <div className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
            <div className="px-3 pt-8 pb-10 text-center relative z-10 h-[400px] flex place-content-center">
              <ChartsComponents type="pie" data={pieData} options={pieOptions} />
            </div>
            <div className="absolute bottom-0 inset-x-0">
              <canvas id="chart1" height="70"></canvas>
            </div>
          </div>
        </div>
    </div>
  )
}