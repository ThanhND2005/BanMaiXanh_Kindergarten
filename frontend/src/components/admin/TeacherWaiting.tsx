import { useAdminStore } from '@/stores/useAdminStore'
import React from 'react'
import TeacherCard2 from './TeacherCard2'

const TeacherWaiting = () => {
  const teachers = useAdminStore((state) => state.teachers)?.filter((t) => t.status === null)
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl mb-4 mali-bold text-[#006F44]">
          Các giáo viên chờ duyệt:
        </h1>
        
      </div>
      <ul className="grid grid-cols-4 gap-8">
        {teachers?.map((teacher) => (
          <TeacherCard2 key={teacher.userid} teacher={teacher} />
        ))}
      </ul>
    </>
  )
}

export default TeacherWaiting
