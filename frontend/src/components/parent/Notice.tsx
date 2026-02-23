import { useAdminStore } from '@/stores/useAdminStore';
import { useStudentStore } from '@/stores/useStudentStore';
import TeacherCard from './TeacherCard';

const Notice = () => {
    const {classes} = useStudentStore()

    const teachers = useAdminStore((state) => state.teachers)?.filter((teacher) => classes?.some((class1) => (String)(class1.classid) == (String)(teacher.classid)))
    console.log(teachers)
  return (
    <div>
      <ul className='flex flex-col space-y-3'>
        {teachers?.map((teacher) =>(
            <TeacherCard key={teacher.userid} teacher={teacher}/>
        ))}
      </ul>
    </div>
  )
}

export default Notice
