
import { useStudentStore } from '@/stores/useStudentStore';
import TeacherCard from './TeacherCard';

const Notice = () => {
    const teachers = useStudentStore((state) => state.classes)
    console.log(teachers)
  return (
    <div>
      <ul className='flex flex-col space-y-3'>
        {teachers?.map((teacher) =>(
            <TeacherCard key={teacher.teacherid} teacher={teacher}/>
        ))}
      </ul>
    </div>
  )
}

export default Notice
