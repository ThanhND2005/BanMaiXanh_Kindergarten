import { adminService } from '@/services/adminService';
import { teacherService } from '@/services/teacherService';
import { useAdminStore } from '@/stores/useAdminStore';
import type { Teacher } from '@/types/Teacher';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';

interface ITeacher {
  teacher: Teacher;
}
const TeacherCard2 = ({teacher} : ITeacher) => {
   const {refreshTeachers} = useAdminStore()
   const [open, setOpen] =useState(false)
  const onAccept = async (userid : string) =>
  {
    try {
        await adminService.acceptTeacher(userid)
        refreshTeachers()
        toast.success('Duyệt thành công !')
    } catch (error) {
        console.error(error)
    }
  }
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
            
          </div>
          <div className="flex  space-x-10 justify-between w-full">
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
              <Button
                      type="button"
                      className="w-20 bg-[#05d988] text-white rounded-2xl shadow-sm  "
                      onClick={() => onAccept(teacher.userid as string)}
                    >
                      Chấp nhận
                    </Button>
            </div>
          </div>
        </div>
      </li>
    </div>
  )
}

export default TeacherCard2
