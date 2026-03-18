import React from 'react'
import TuitionCard from './TuitionCard'
import { useAdminStore } from '@/stores/useAdminStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { useParentStore } from '@/stores/useParentStore'

const Tuition = () => {
  
  const tuitions = useParentStore((state) => state.tuitionbills)
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
