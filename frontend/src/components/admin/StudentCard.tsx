import type { Student } from '@/types/Student'
import React from 'react'
import { Button } from '../ui/button'
interface IStudentProps {
    student : Student
}
const StudentCard = ({student} : IStudentProps) => {
  const onDelete = async (studentid) => {
    //goi backend
  };
  return (
    <div>
      <li >
            <div
          
              className="rounded-xl bg-[#ffffff] shadow-sm px-4 flex flex-wrap justify-center"
            >
     
              <div className="w-24 h-24 rounded-full overflow-hidden ">
                <img
                  src={student.avatarurl}
                  alt="hinhdaidien"
                  className="w-full h-auto"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Bé {student.name}</h1>
              </div>
              <div className="text-2xl font-bold w-full text-center">
                Lớp {student.classname}
              </div>
              <div>
                <Button
                  type="button"
                  className="mt-3 mb-3 bg-[#f52121] rounded-2xl shadow-sm hover:bg-[#9E0C0C] focus:bg-[#f52121] transition all"
                  onClick={() =>onDelete(student.studentid)}
                >
                  Xóa
                </Button>
              </div>
            </div>
          </li>
    </div>
  )
}

export default StudentCard
