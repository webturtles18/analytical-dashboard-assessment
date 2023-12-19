"use client";
import Dimensional from '@/components/Dimensional';
import TimeSeries from '@/components/TimeSeries';
// import { promises as fs } from 'fs';

export default async function Dashboard() {
  // const [data, setData] = useState([]);
  async function getData(query: Record<string, Date | null | string> | null = null) {
    let url;
    if (query) {
      url = `http://localhost:3000/api/mysql/betdata?startDate=${query.startDate}&endDate=${query.endDate}`
    } else {
      url = `http://localhost:3000/api/mysql/betdata`
    }
    const res = await fetch(url)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }

  // const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8');
  const data = await getData();
  return (
    <div className="flex items-center justify-center px-5 py-5">
      <div className="w-full">
        <div className="md:flex justify-center">
          <div className="w-[100%] lg:w-[40%] px-2">
            <TimeSeries data={data} getData={getData}></TimeSeries>
          </div>
          {/* <div className="w-[100%] lg:w-[40%] px-2">
            <Dimensional></Dimensional>
          </div> */}
        </div>
      </div>
    </div>
  )
}