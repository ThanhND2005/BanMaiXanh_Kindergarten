import { useStudentStore } from "@/stores/useStudentStore";
import { useTabParentStore } from "@/stores/useTabStore";
import type { Student } from "@/types/Student";
import { Check } from "lucide-react";
import React from "react";
interface IStudentProps {
  student: Student;
}
const StudentCard2 = ({ student }: IStudentProps) => {
  const { setTabActive, setStudent } = useTabParentStore();
  const { classes, refreshClasses } = useStudentStore();
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
          className="flex p-4 w-200 bg-[#ffffff] rounded-xl shadow-md items-center"
        >
          <div className="h-30 w-30 rounded-full overflow-hidden">
            <img src={student?.avatarurl} alt="logo" />
          </div>

          <div className="flex flex-col ml-20 space-y-2">
            <h1 className="text-2xl itim-regular"> Bé {student.name}</h1>
            <h2 className="text-xl itim-regular">
              Chiều cao (m): {student.height}
            </h2>
            <h2 className="text-xl itim-regular">
              Cân nặng (kg): {student.weight}
            </h2>
            {student.check_in_time !== null &&
            student.check_out_time !== null ? (
              <div className="flex gap-2 items-center ">
                <div className="h-5 w-5 bg-[#EDFF46] rounded-full flex justify-center items-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <h6 className="text-sm text-[#EDFF46]">Đã được đón</h6>
              </div>
            ) : student.check_in_time !== null ? (
              <div className="flex gap-2 items-center">
                <div className="h-5 w-5 bg-[#15803D] rounded-full flex justify-center items-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <h6 className="text-sm text-[#15803D]">Đã đến trường</h6>
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <div className="h-5 w-5 bg-[#F52121] rounded-full flex justify-center items-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <h6 className="text-sm text-[#F52121]">Chưa đến trường</h6>
              </div>
            )}
          </div>
        </button>
      </li>
    </div>
  );
};

export default StudentCard2;
