
  import SalaryItem from './SalaryItem'
import { useAdminStore } from '@/stores/useAdminStore'
import { useAuthStore } from '@/stores/useAuthStore'

const Salary = () => {
  const user = useAuthStore.getState().user
  const teacher = useAdminStore((state) => state.teachers)?.find((t) => t.userid === user?.userid)
  const salarybills = useAdminStore((state) => state.teacherbills)?.filter(salarybill => salarybill.teacherid === teacher?.userid )
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
