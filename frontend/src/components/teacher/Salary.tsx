

import SalaryItem from './SalaryItem'

import { useTeacherStore } from '@/stores/useTeacherStore'

const Salary = () => {
  
  
  const salarybills = useTeacherStore((state) => state.salarybills)
  return (
    <div>
      <ul className='space-y-4 p-4'>
        {salarybills?.map((salary) => (
          <SalaryItem key={salary.salaryid} salary={salary}/> 
        ))}
      </ul>
    </div>
  )
}

export default Salary
