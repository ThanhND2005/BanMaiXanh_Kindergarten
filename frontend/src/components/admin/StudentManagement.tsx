import React from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
type StudentCardValues = {
  studentid: string;
  name: string;
  classStudent: string;
  avatarUrl: string;
};
export function StudentManagement() {
  const students = [
    {
      studentid: "001",
      name: "Thanh Hà",
      classStudent: "Mầm 1",
      avatarUrl:
        "https://i.pinimg.com/736x/f2/f4/23/f2f423b704aea4e2b33eaf5ea4639020.jpg",
    },
    {
      studentid: "002",
      name: "Bảo Trâm",
      classStudent: "Mầm 1",
      avatarUrl:
        "https://i.pinimg.com/736x/85/03/e5/8503e58686c89343f93895276e3897ae.jpg",
    },
    {
      studentid: "003",
      name: "Gia Khánh",
      classStudent: "Mầm 1",
      avatarUrl:
        "https://i.pinimg.com/736x/fc/98/cd/fc98cd3240edbe858acd8333e57eb0bb.jpg",
    },
    {
      studentid: "004",
      name: "Quốc Thái",
      classStudent: "Mầm 1",
      avatarUrl:
        "https://i.pinimg.com/736x/05/11/fe/0511fe22bc2a77c01d8fb7e2871c764c.jpg",
    },
    {
      studentid: "005",
      name: "Hà Linh",
      classStudent: "Mầm 1",
      avatarUrl:
        "https://i.pinimg.com/736x/cf/ce/05/cfce05fbe0eb3cd49a6baf3f663da0f8.jpg",
    },
  ];
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StudentCardValues>();
  const onSubmit = async (data: StudentCardValues) => {
    const { studentid, name, avatarUrl, classStudent } = data;
    console.log(`${studentid} ${name} ${classStudent} ${avatarUrl}`);
  };
  return (
    <>
      <h1 className="text-2xl font-bold text-[#006F44] itim-regular mb-8">
        Các học sinh trong hệ thống:
      </h1>
      <ul className="grid grid-cols-4 gap-8">
        {students.map((student) => (
          <li key={student.studentid}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-xl bg-[#ffffff] shadow-sm px-4 flex flex-wrap justify-center"
            >
              <Input
                type="hidden"
                id="studentid"
                value={student.studentid}
                {...register("studentid")}
              />

              <div className="w-24 h-24 rounded-full overflow-hidden ">
                <img
                  src={student.avatarUrl}
                  alt="hinhdaidien"
                  className="w-full h-auto"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Bé {student.name}</h1>
              </div>
              <div className="text-2xl font-bold w-full text-center">
                Lớp {student.classStudent}
              </div>
              <div>
                <Button
                  type="submit"
                  className="mt-3 mb-3 bg-[#f52121] rounded-2xl shadow-sm hover:bg-[#9E0C0C] focus:bg-[#f52121] transition all"
                  disabled={isSubmitting}
                >
                  Xóa
                </Button>
              </div>
            </form>
          </li>
        ))}
      </ul>
    </>
  );
}
