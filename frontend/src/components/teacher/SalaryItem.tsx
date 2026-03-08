
import { DollarSign } from 'lucide-react'
import { Button } from '../ui/button'
import type { TeacherBill } from '@/types/store'
interface SalaryProps {
    salary : TeacherBill    
}
const SalaryItem = ({salary} : SalaryProps) => {
  
  return (
    <div>
      <li className='w-full flex justify-between items-center bg-[#ffffff] rounded-xl shadow-md p-4'>
        <div className='flex flex-col space-y-2'>
            <h2 className='text-2xl mali-bold'>Tháng {salary.month}</h2>
            <div className='flex space-x-2'>
                <h2 className='text-xl mali-bold text-[#828282]'>Lớp:</h2>
                <h2 className='text-xl mali-bold '>{salary.className}</h2>
            </div>
            <div className='flex space-x-2'>
                <h2 className='text-xl mali-bold text-[#828282]'>Số ngày công:</h2>
                <h2 className='text-xl mali-bold '>{salary.timekeeping}</h2>
            </div>
            <div className='flex space-x-2'>
                <h2 className='text-xl mali-bold text-[#828282]'>Lương cơ bản:</h2>
                <h2 className='text-xl mali-bold '>{salary.timekeeping * 2000} vnđ</h2>
            </div>
            <div className='flex space-x-2'>
                <h2 className='text-xl mali-bold text-[#828282]'>Phụ cấp:</h2>
                <h2 className='text-xl mali-bold '>{salary.allowance} vnđ</h2>
            </div>
            <h1 className='text-4xl mali-bold text-[#2E7D32] opacity-80'>Tổng: {salary.amount} vnđ</h1>
        </div>
        <div className='flex flex-col items-center space-y-4'>
            <div className='h-40 w-40 rounded-full overflow-hidden flex items-center justify-center bg-[#FFFF00]'>
                <DollarSign className='h-40 w-40 text-white'/>
            </div>
            {salary.status === 'Đang thực hiện' ? <Button type='button'  className='bg-[#05d988] rounded-2xl shadow-md hover:bg-[#05d988]'>Đang thực hiện</Button> : <Button type='button'  className='bg-[#0095D5] rounded-2xl shadow-md hover:bg-[#0095D5]'>Đã hoàn thành</Button>
        }
        </div>
      </li>
    </div>
  )
}

export default SalaryItem
