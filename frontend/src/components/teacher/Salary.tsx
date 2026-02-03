
import { useTeacherStore } from '@/stores/useTeacherStore'
import SalaryItem from './SalaryItem'
import { useAdminStore } from '@/stores/useAdminStore'

const Salary = () => {
  const teacher = useTeacherStore((state) => state.teacher)
  const salarybills = useAdminStore((state) => state.teacherbills).filter(salarybill => salarybill.teacherid === teacher.userid )
  return (
    <div>
      <ul className='space-y-4 p-4'>
        {salarybills.map((salary) => (
          <SalaryItem key={salary.salaryid} salary={salary}/> 
        ))}
      </ul>
    </div>
  )
}

export default Salary
