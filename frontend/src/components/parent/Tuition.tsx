import React from 'react'
import TuitionCard from './TuitionCard'
import { useAdminStore } from '@/stores/useAdminStore'
import { useAuthStore } from '@/stores/useAuthStore'

const Tuition = () => {
  const user = useAuthStore((state) => state.user)
  const tuitions = useAdminStore((state) => state.studentbills)?.filter((tuition) => tuition.parentid === user?.userid)
  return (
    <div>
      <ul className='flex flex-col gap-4 p-4'>
        {tuitions?.map((tuition) =>(
          <TuitionCard key={tuition.tuitionid} tuition={tuition}/>
        ))}
      </ul>
    </div>
  )
}

export default Tuition
