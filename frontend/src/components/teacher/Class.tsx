import { useAdminStore } from '@/stores/useAdminStore'
import StudentItem from './StudentItem'
import { useTeacherStore } from '@/stores/useTeacherStore'



const Class = () => {
  const teacher = useTeacherStore((state) => state.teacher)
  const students = useAdminStore((state) => state.students).filter(student => student.classname === teacher.classname)
  
  return (
    <div className='p-4'>
      <ul className='space-y-6'>
        {students.map((student) => (
          <StudentItem key={student.studentid} student={student}/>
        ))}
      </ul>
    </div>
  )
}

export default Class
