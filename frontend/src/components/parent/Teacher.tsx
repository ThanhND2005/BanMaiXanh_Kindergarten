import React from 'react'
import TeacherCard from './TeacherCard';
import { useParentStore } from '@/stores/useParentStore';
 
const Teacher = () => {
  const teachers = useParentStore((state) => state.teachers)
  return (
    <div>
      <ul className='flex flex-col space-y-4 p-4'>
        {teachers.map((teacher) => (
          <TeacherCard key={teacher.userid} teacher={teacher}/>
        ))}
      </ul>
    </div>
  )
}

export default Teacher
