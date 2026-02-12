import type { Teacher } from "@/types/Teacher";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { adminService } from "@/services/adminService";
import { useAdminStore } from "@/stores/useAdminStore";
import { teacherService } from "@/services/teacherService";
interface ITeacher {
  teacher: Teacher;
}

const TeacherCard = ({ teacher }: ITeacher) => {
  
  const {refreshTeachers} = useAdminStore()
  const onDelete = async (userid : string) => {
    await teacherService.deleteTeacher(userid)
    await refreshTeachers()
  };

  return (
    <div>
      <li>
        <div
          className="flex flex-col justify-center p-4 items-center justify-center bg-[#ffffff] rounded-2xl shadow-md gap-3"
        >
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img
              src={teacher.avatarurl}
              alt="avatar"
              className="w-full object-cover"
            />
          </div>
          <div className="gap-3">
            <div className="text-base font-medium">
              Họ và tên: {teacher.name}{" "}
            </div>
            <div className=" text-base font-medium">
              Ngày sinh: {new Date(teacher.dob).toLocaleDateString("vi-VN")}
            </div>
            <div className=" text-base font-medium">
              Giới tính: {teacher.gender}
            </div>
            <div className=" text-base font-medium">
              Địa chỉ: {teacher.address}
            </div>
            <div className=" text-base font-medium">
              Lớp: {teacher.classname}
            </div>
            <div className=" text-base font-medium">
              Ngày tham gia: {new Date(teacher.createdat).toLocaleDateString("vi-VN")}
            </div>
          </div>
          <div className='flex space-x-10'>
            <div>
              <Button
                type="button"
                className=" bg-[#f52121] rounded-2xl shadow-sm hover:bg-[#9E0C0C] focus:bg-[#f52121]"
                onClick={() => onDelete(teacher.userid)}
              >
                Xóa
              </Button>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
};

export default TeacherCard;
