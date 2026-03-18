import type { Student } from "@/types/Student";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useStudentStore } from "@/stores/useStudentStore";
import { studentService } from "@/services/studentService";
import { useAdminStore } from "@/stores/useAdminStore";

interface IStudentProps {
  student: Student;
}
const StudentCard = ({ student }: IStudentProps) => {
  const { classes, refreshClasses } = useStudentStore();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const { refreshStudents } = useAdminStore();
  const onDelete = async (studentid: string) => {
    await studentService.deleteStudent(studentid);
    await refreshStudents();
  };
  const getClass = async (studentid: string) => {
    await refreshClasses(studentid);
  };
  return (
    <div>
      <li>
        <div className="h-full rounded-xl bg-[#ffffff] shadow-md p-4 flex flex-col justify-center items-center space-y-2">
          <Dialog open={open2} onOpenChange={setOpen2}>
            <DialogTrigger asChild>
              <button
                onClick={() => getClass(student.studentid)}
                className="w-full h-full"
              >
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden">
                    <img src={student.avatarurl} alt="hinhdaidien" />
                  </div>
                  <div>
                    <h1 className="text-2xl mali-bold ">Bé {student.name}</h1>
                  </div>
                </div>
              </button>
            </DialogTrigger>

            <div>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <div className="flex justify-end items-center">
                    <Button
                      variant="outline"
                      className="w-20 bg-[#f52121] text-white rounded-2xl shadow-sm hover:bg-[#982410] hover:text-white focus:bg-[#f52121] "
                    >
                      Xóa
                    </Button>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <h1 className="text-2xl mali-bold">
                    Bạn chắc chắn muốn xóa học sinh này ?
                  </h1>
                  <div className="w-full flex justify-end">
                    <div className="flex justify-between w-35">
                      <Button
                        type="button"
                        className="rounded-2xl"
                        onClick={() => setOpen(false)}
                      >
                        Hủy
                      </Button>
                      <Button
                        type="button"
                        className="bg-[#f52121] rounded-2xl shadow-sm hover:bg-[#9E0C0C] focus:bg-[#f52121] transition all"
                        onClick={() => onDelete(student.studentid)}
                      >
                        Xóa
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <DialogContent>
              <div className="flex flex-col justify-center items-center gap-3 p-4">
                <div className="rounded-full w-30 h-30 overflow-hidden">
                  <img src={student.avatarurl} alt="avatar" />
                </div>
                <div className="w-full">
                  <Label htmlFor="name" className="text-sm block mali-semibold">
                    Tên
                  </Label>
                  <Input
                    id="name"
                    placeholder={student.name}
                    className="rounded-2xl"
                    readOnly
                  />
                </div>
                <div className="w-full">
                  <Label
                    htmlFor="gender"
                    className="text-sm block mali-semibold"
                  >
                    Giới tính
                  </Label>
                  <Input
                    id="gender"
                    placeholder={student.gender}
                    className="rounded-2xl"
                    readOnly
                  />
                </div>
                <div className="w-full">
                  <Label htmlFor="dob" className="text-sm block mali-semibold">
                    Ngày sinh
                  </Label>
                  <Input
                    id="dob"
                    placeholder={new Date(student.dob).toLocaleDateString(
                      "vi-VN",
                    )}
                    className="rounded-2xl"
                    readOnly
                  />
                </div>
                <div className="w-full">
                  <Label
                    htmlFor="parentname"
                    className="text-sm block mali-semibold"
                  >
                    Họ tên phụ huynh
                  </Label>
                  <Input
                    id="parentname"
                    placeholder={student.parentname}
                    className="rounded-2xl"
                    readOnly
                  />
                </div>
                <div className="w-full">
                  <Label
                    htmlFor="classes"
                    className="text-sm block mali-semibold"
                  >
                    Lớp học đang tham gia
                  </Label>
                  <ul id="classes" className="space-y-1">
                    {classes?.map((class1) => (
                      <li key={class1.classid}>
                        <Input
                          placeholder={class1.classname}
                          className="rounded-2xl"
                          readOnly
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </li>
    </div>
  );
};

export default StudentCard;
