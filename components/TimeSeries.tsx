"use client"; // This is a client component
import ChartsComponents from './Charts';
// import { Input } from "@nextui-org/react";
import "react-datepicker/dist/react-datepicker.css"; 
import DatePicker from "react-datepicker"; 
import { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';

interface propsType {
  data: Record<string, unknown | string>[],
  getData: Function
}

export default function TimeSeries(props: propsType) {
  const [dataArr, setDataArr] = useState(props.data)
  interface bookRiskData {
    label: string
    data: []
    backgroundColor: string
    borderColor?: string
    borderWidth?: number
  }
  
  let bookRiskData: bookRiskData = {
    label: 'Book Risk',
    data: [],
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
    borderColor: 'rgb(255, 99, 132)',
    borderWidth: 1
  }
  
  let betPriceData: bookRiskData = {
    label: 'Book Profit Gross',
    data: [],
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
    borderColor: 'rgb(54, 162, 235)',
    borderWidth: 1
  }
  
  let labels: string[] = [];

  // Set dates as labels
  dataArr.forEach((item, index) => {
    if (labels.length) {
      if (!labels.includes(new Date(item.received_date as string).toDateString())) {
        labels.push(new Date(item.received_date as string).toDateString())  
      }
    } else {
      labels.push(new Date(item.received_date as string).toDateString())
    }
  })

  // arrange dates with desc order
  labels = labels.sort(function(a: string,b: string){
    return new Date(b).valueOf() - new Date(a).valueOf();
  });
  
  // Set data with calcualtion based on per date label index
  dataArr.forEach((item, index) => {
    const dataIndex = labels.indexOf(new Date(item.received_date as string).toDateString())
    if (item.book_risk) {
      const price: number = item.book_risk as number
      bookRiskData.data[dataIndex] = bookRiskData.data[dataIndex] ? bookRiskData.data[dataIndex] + parseFloat(price.toFixed(2)) as never : parseFloat(price.toFixed(2)) as never
    }
    if (item.bet_price) {
      const price: number = item.book_profit_gross as number
      betPriceData.data[dataIndex] = betPriceData.data[dataIndex] ? betPriceData.data[dataIndex] + parseFloat(price.toFixed(2)) as never : parseFloat(price.toFixed(2)) as never
    }
  })

  // Chart options
  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          stepSize: 100
        },
      }
    },
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

  // Chart data
  const data = {
    labels,
    datasets: [
      bookRiskData,
      betPriceData
    ],
  };

  var curr = new Date; // get current date
  // Get the first and last day of the current year
  const currentYear = new Date().getFullYear();
  const firstDay = new Date(currentYear, 0, 1);
  const lastDay = new Date(currentYear, 11, 31);

  const [startDate, setStartDate] = useState<Date | null>(new Date(firstDay));
  const [endDate, setEndDate] = useState<Date | null>(new Date(lastDay));

  const onChangeDate = (date:Date, type: string) => {
    if (type === 'start') {
      setStartDate(date)
      if (date && endDate && date > endDate) {
        setEndDate(null)
      }
    } else {
      setEndDate(date)
    }
  }

  useEffect(() => {
    async function fetchMyAPI() {
      if (startDate && endDate) {
        setDataArr(await props.getData({startDate: startDate, endDate: endDate}))
      }
    }
    fetchMyAPI()
  }, [startDate, endDate]);

  const reset = () => {
    setStartDate(new Date(firstDay))
    setEndDate(new Date(lastDay))
  }
  return (
    <div>
      <p className="py-2 semibold text-lg">Time-Series Analysis</p>
      <div className="py-2 grid grid-cols-5 gap-2 items-center">
        <div>
          <label className='text-xs'>Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => onChangeDate(date, 'start')}
            selectsStart
            dateFormat="yyyy-MM-dd"
            startDate={startDate}
            endDate={endDate}
            className="rounded border-1 border-black w-[140px]"
          />
        </div>
        <div className='col-start-3'>
          <label className='text-xs'>End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => onChangeDate(date, 'end')}
            selectsEnd
            dateFormat="yyyy-MM-dd"
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="rounded border-1 border-black w-[140px]"
          />
        </div>
        <Button color="default" variant="ghost" className='col-start-5 mt-4' onClick={reset}>
          Reset
        </Button>  
      </div>
      <div className="rounded-lg shadow-md mb-4">
        <div className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
          <div className="px-3 pt-8 pb-10 relative h-[500px] flex justify-center">
            <ChartsComponents type='line' data={data} options={options} width={'360'} height={'300'} />
          </div>
          <div className="absolute bottom-0 inset-x-0">
            <canvas id="chart1" height="70"></canvas>
          </div>
        </div>
      </div>
    </div>
  )
}