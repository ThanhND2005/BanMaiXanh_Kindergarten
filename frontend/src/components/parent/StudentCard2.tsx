import { useStudentStore } from "@/stores/useStudentStore";
import { useTabParentStore } from "@/stores/useTabStore";
import type { Student } from "@/types/Student";
import { MessageCircleMore } from 'lucide-react'
import React from "react";
interface IStudentProps {
  student: Student;
}
const StudentCard2 = ({ student }: IStudentProps) => {
  const { setTabActive, setStudent } = useTabParentStore();
  const { refreshClasses } = useStudentStore();
  const onUpdate = async (student: Student) => {
    await refreshClasses(student.studentid);
    setTabActive('notice')   
    setStudent(student)
  };
  return (
    <div>
      <li>
        <button
          onClick={() => onUpdate(student)}
          className="flex flex-rol p-4 gap-4 w-full bg-[#ffffff] rounded-xl shadow-md "
        >
          <div className="h-30 w-30 rounded-full overflow-hidden">
            <img src={student?.avatarurl} alt="logo" className="w-full object-cover" />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-2xl text-start mali-bold"> Bé {student.name}</h1>
            <h1 className="text-xl  text-start mali-bold">
              Chiều cao (m): {student.height}
            </h1>
            <h1 className="text-xl text-start mali-bold">
              Cân nặng (kg): {student.weight}
            </h1>
          </div>
          <div className='ml-auto h-30 w-30 rounded-full overflow-hidden flex justify-center items-center bg-[#0b64f4] '>
              <MessageCircleMore className='w-25 h-25 text-white'/>  
            </div>
        </button>
      </li>
    </div>
  );
};

export default StudentCard2;
