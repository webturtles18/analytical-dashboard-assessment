import Dimensional from '@/components/Dimensional';
import TimeSeries from '@/components/TimeSeries';
import { promises as fs } from 'fs';

export default async function Dashboard() {
  const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8');
  const data = JSON.parse(file);
  return (
    <div className="flex items-center justify-center px-5 py-5">
      <div className="w-full">
        <div className="md:flex justify-center">
          <div className="w-[100%] md:w-[40%] px-2">
            <TimeSeries data={data}></TimeSeries>
          </div>
          <div className="w-[100%] md:w-[40%] px-2">
            <Dimensional></Dimensional>
          </div>
        </div>
      </div>
    </div>
  )
}