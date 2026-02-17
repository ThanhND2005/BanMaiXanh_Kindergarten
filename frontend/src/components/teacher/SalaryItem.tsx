
import { DollarSign } from 'lucide-react'
import { Button } from '../ui/button'
import type { TeacherBill } from '@/types/store'
import {toast} from 'sonner'
import { teacherService } from '@/services/teacherService'
import { useAdminStore } from '@/stores/useAdminStore'
interface SalaryProps {
    salary : TeacherBill    
}
const SalaryItem = ({salary} : SalaryProps) => {
  const {refreshTeacherBills} = useAdminStore()
  const onConfirm = async (salaryid: string) => {
    try {
        await teacherService.verifyTeacherBill(salaryid)
        await refreshTeacherBills()
        toast.success("Xác nhận thành công")
    } catch (error) {
        console.error(error)
        toast.error("Xác nhận thất bại")
    }
  }
  return (
    <div>
      <li className='w-full flex justify-between items-center bg-[#ffffff] rounded-xl shadow-md p-4'>
        <div className='flex flex-col space-y-2'>
            <h2 className='text-2xl font-bold'>Tháng {salary.month}</h2>
            <div className='flex space-x-2'>
                <h2 className='text-xl font-bold text-[#828282]'>Lớp:</h2>
                <h2 className='text-xl font-bold '>{salary.className}</h2>
            </div>
            <div className='flex space-x-2'>
                <h2 className='text-xl font-bold text-[#828282]'>Số ngày công:</h2>
                <h2 className='text-xl font-bold '>{salary.timekeeping}</h2>
            </div>
            <div className='flex space-x-2'>
                <h2 className='text-xl font-bold text-[#828282]'>Lương cơ bản:</h2>
                <h2 className='text-xl font-bold '>{salary.timekeeping * 200000} vnđ</h2>
            </div>
            <div className='flex space-x-2'>
                <h2 className='text-xl font-bold text-[#828282]'>Phụ cấp:</h2>
                <h2 className='text-xl font-bold '>{salary.allowance} vnđ</h2>
            </div>
            <h1 className='text-4xl font-bold text-[#2E7D32] opacity-80'>Tổng: {salary.amount} vnđ</h1>
        </div>
        <div className='flex flex-col items-center space-y-4'>
            <div className='h-40 w-40 rounded-full overflow-hidden flex items-center justify-center bg-[#FFFF00]'>
                <DollarSign className='h-40 w-40 text-white'/>
            </div>
            {salary.status === 'Đang thực hiện' ? <Button type='button' onClick={() => onConfirm(salary.salaryid)} className='bg-[#2E7D32] rounded-2xl shadow-md'>Xác nhận</Button> : <Button type='button'  className='bg-[#0095D5] rounded-2xl shadow-md'>Đã xác nhận</Button>
        }
        </div>
      </li>
    </div>
  )
}

export default SalaryItem
