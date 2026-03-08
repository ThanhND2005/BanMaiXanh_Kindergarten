import type { Teacher } from "@/types/Teacher";
import { Button } from "../ui/button";
import { useAdminStore } from "@/stores/useAdminStore";
import { teacherService } from "@/services/teacherService";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
interface ITeacher {
  teacher: Teacher;
}

const TeacherCard = ({ teacher }: ITeacher) => {
  const [open, setOpen] = useState(false);
  const { refreshTeachers } = useAdminStore();
  const security = useAdminStore
    .getState()
    .security?.find((t) => t.teacherid === teacher.userid);
  const onDelete = async (userid: string) => {
    await teacherService.deleteTeacher(userid);
    await refreshTeachers();
  };

  return (
    <div>
      <li>
        <div className="flex flex-col justify-center p-4 items-center justify-center bg-[#ffffff] rounded-2xl shadow-md gap-3">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img
              src={teacher.avatarurl}
              alt="avatar"
              className="w-full object-cover"
            />
          </div>
          <div className="gap-3">
            <div className="text-base font-medium mali-semibold text-nowrap">
              Họ và tên: {teacher.name}{" "}
            </div>
            <div className=" text-base font-medium mali-semibold">
              Ngày sinh: {new Date(teacher.dob).toLocaleDateString("vi-VN")}
            </div>
            <div className=" text-base font-medium mali-semibold">
              Giới tính: {teacher.gender}
            </div>
            <div className=" text-base font-medium mali-semibold">
              Địa chỉ: {teacher.address}
            </div>
            <div className=" text-base font-medium mali-semibold">
              Lớp: {teacher.classname}
            </div>
            <div className=" text-base font-medium mali-semibold">
              Ngày tham gia:{" "}
              {new Date(teacher.createdat).toLocaleDateString("vi-VN")}
            </div>
            <div className=" text-base font-medium">
              Mã bảo mật: {security?.code}
            </div>
          </div>
          <div className="flex space-x-10">
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
                    Bạn chắc chắn muốn xóa giáo viên này ?
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
                        className=" bg-[#f52121] rounded-2xl shadow-sm hover:bg-[#9E0C0C] focus:bg-[#f52121]"
                        onClick={() => onDelete(teacher.userid)}
                      >
                        Xóa
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
};

export default TeacherCard;
