import React from 'react'
import TuitionCard from './TuitionCard'
import { useAdminStore } from '@/stores/useAdminStore'

const Tuition = () => {
  const tuitions = useAdminStore((state) => state.studentbills)
  return (
    <div>
      <ul className='flex flex-col gap-4 p-4'>
        {tuitions.map((tuition) =>(
          <TuitionCard key={tuition.tuitionid} tuition={tuition}/>
        ))}
      </ul>
    </div>
  )
}

export default Tuition
