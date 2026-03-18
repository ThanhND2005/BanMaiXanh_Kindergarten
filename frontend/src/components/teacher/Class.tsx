import StudentItem from './StudentItem'
import { useTeacherStore } from '@/stores/useTeacherStore'



const Class = () => {
  

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
