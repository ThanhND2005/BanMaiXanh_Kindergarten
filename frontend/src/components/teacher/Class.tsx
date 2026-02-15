import { useAdminStore } from '@/stores/useAdminStore'
import StudentItem from './StudentItem'
import { useTeacherStore } from '@/stores/useTeacherStore'
import { useAuthStore } from '@/stores/useAuthStore'



const Class = () => {
  const user = useAuthStore.getState().user
  const teacher = useAdminStore((state) => state.teachers)?.find((t) => t.userid === user?.userid)
  const students = useTeacherStore((state) => state.students)
  
  return (
    <div className='p-4'>
      <ul className='space-y-6'>
        {students?.map((student) => (
          <StudentItem key={student.studentid} student={student}/>
        ))}
      </ul>
    </div>
  )
}

export default Class
