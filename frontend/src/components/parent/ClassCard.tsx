import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandItem, CommandList } from "../ui/command";
import { CommandGroup } from "cmdk";
import type { Class } from "@/types/Class";
import { useAdminStore } from "@/stores/useAdminStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { studentService } from "@/services/studentService";
import { toast } from "sonner";
interface IClassProps {
  classinfor: Class;
}

const ClassCard = ({ classinfor }: IClassProps) => {
  const parent = useAuthStore((state) => state.user);
  const students = useAdminStore((state) => state.students)?.filter(
    (student) => student.parentid === parent?.userid,
  );
  const [open, setOpen] = useState(false);
  const [open2,setOpen2] = useState(false)
  const [studentid, setStudentId] = useState("");
  const { refreshStudents,refreshClasses} = useAdminStore();
  const onRegister = async (studentid: string, classid: string) => {
    try {
      await studentService.registerClass(studentid, classid);
      await refreshStudents();
      await refreshClasses();
      toast.success("Đăng ký lớp cho học sinh thành công");
    } catch (error) {
      console.error(error);
      toast.warning("Học sinh đang học lớp này rồi");
    } finally {
      setOpen(false);
    }
  };
  return (
    <div className="mt-4">
      <li className="bg-white flex flex-col justify-center rounded-2xl shadow-md">
        <div className="w-full rounded-2xl overflow-hidden h-auto">
          <img
            src="https://res.cloudinary.com/dhylrhxsa/image/upload/v1769583472/51758c8655e6dbb882f7_dqoijs.jpg"
            alt="avatar"
          />
        </div>
        <div className="space-y-2 p-4">
          <h2 className="text-lg mali-bold">Tên lớp: {classinfor.classname}</h2>
          <h2 className="text-lg mali-bold">
            Giáo viên: {classinfor.teachername}
          </h2>
          <h2 className="text-lg mali-bold">Độ tuổi: {classinfor.age}</h2>
          <h2 className="text-lg mali-bold">Số lượng: {classinfor.member}</h2>
          <h2 className="text-lg mali-bold">
            Trạng thái: {classinfor.currentmember}/{classinfor.member}
          </h2>
          <h2 className="text-lg mali-bold">Học phí: {classinfor.tuition}</h2>
          <h2 className="text-lg mali-bold">Lịch học: {classinfor.schedule}</h2>
        </div>
        <div className="flex justify-center mb-3">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-60 rounded-2xl bg-[#05D988] text-[#ffffff] hover:bg-[#006f44] hover:text-white focus:bg-[#05D988]"
              >
                Đăng ký
              </Button>
            </DialogTrigger>
            <DialogContent>
              <h2 className="w-full text-center text-2xl mali-bold">
                Chọn học sinh muốn đăng ký
              </h2>
              <Popover open={open2} onOpenChange={setOpen2}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                  >
                    {studentid
                      ? students?.find(
                          (student) => student.studentid === studentid,
                        )?.name
                      : "Chọn học sinh ..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Command>
                    <CommandList>
                      <CommandEmpty>Không có thông tin học sinh</CommandEmpty>
                      <CommandGroup>
                        {students?.map((student) => (
                          <CommandItem
                            key={student.studentid}
                            value={student.studentid}
                            onSelect={(currentStudentId) => {
                              setStudentId(
                                currentStudentId === studentid
                                  ? ""
                                  : currentStudentId,
                              );
                              setOpen2(false);
                            }}
                          >
                            {student.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <div className="gap-3 flex justify-center">
                <Button
                  type="button"
                  onClick={() => onRegister(studentid, classinfor.classid)}
                  className="w-50 rounded-2xl bg-[#05D988] text-[#ffffff] hover:bg-[#006f44] focus:bg-[#05D988]"
                >
                  Đăng ký
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </li>
    </div>
  );
};

export default ClassCard;
