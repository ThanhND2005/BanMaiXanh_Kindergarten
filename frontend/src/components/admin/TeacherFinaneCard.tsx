import { adminService } from '@/services/adminService';
import { teacherService } from '@/services/teacherService';
import { useAdminStore } from '@/stores/useAdminStore';
import type { TeacherBill } from '@/types/store'
import { Check } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
interface ITeacherBill {
    teacherbill : TeacherBill
}
const TeacherFinaneCard = ({teacherbill} : ITeacherBill) => {
    const [open, setOpen] = useState(false);
    const { refreshTeacherBills } = useAdminStore();

      const onDelete = async (salaryid: string) => {
    try {
      await adminService.deleteTeacherBill(salaryid);
      await refreshTeacherBills();
      toast.success("Xóa hóa đơn thành công !");
    } catch (error) {
      console.error(error);
      toast.error("Xóa hóa đơn thất bại!");
    }
  };
  const onConfirm = async (salaryid: string) => {
    try {
      await teacherService.verifyTeacherBill(salaryid);
      await refreshTeacherBills();
      toast.success("Xác nhận thành công");
    } catch (error) {
      console.error(error);
      toast.error("Xác nhận thất bại");
    }
  };
  useEffect(() => {
      let interval: ReturnType<typeof setInterval>;
      if (teacherbill.status === null) {
        interval = setInterval(async () => {
          try {
            await refreshTeacherBills();
            const currenttuition = useAdminStore
              .getState()
              .teacherbills?.find((t) => t.salaryid === teacherbill.salaryid);
            if (currenttuition && currenttuition?.status !== null) {
              setOpen(false)
              clearInterval(interval);
            }
          } catch (error) {
            console.error(error);
          }
        }, 3000);
      }
      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    }, [teacherbill.status, teacherbill.salaryid]);
  return (
    <div>
      <li className="flex py-4 px-10 bg-white rounded-2xl shadow-md">
        <div className="flex flex-col justify-center items-center gap-4">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <img src={teacherbill.avatarurl} alt="w-full object-cover" />
              </div>
              <div className="space-y-2">
                <h2 className="text-md mali-bold">
                  Họ và tên: {teacherbill.teacherName}
                </h2>
                <h2 className="text-md mali-bold">
                  Ngày sinh:{" "}
                  {new Date(teacherbill.dob).toLocaleDateString("vi-VN")}
                </h2>
                <h2 className="text-md mali-bold">
                  Giới tính: {teacherbill.gender}
                </h2>
                <h2 className="text-md mali-bold">
                  Địa chỉ: {teacherbill.address}
                </h2>
                <h2 className="text-md mali-bold">
                  Lớp: {teacherbill.className}
                </h2>
                <h2 className="text-md mali-bold">
                  Số ngày công: {teacherbill.timekeeping}
                </h2>
                <h2 className="text-md mali-bold">
                  Lương cơ bản: {teacherbill.timekeeping * 2000} vnđ
                </h2>
                <h2 className="text-md mali-bold">
                  Phụ cấp: {teacherbill.allowance} vnđ
                </h2>
                <h2 className="text-md mali-bold">
                  Tổng lương: {teacherbill.amount} vnđ
                </h2>
                <h2 className="text-md mali-bold">
                  Tháng: {teacherbill.month}
                </h2>
                {teacherbill.status !== null ? (
                  <div className="flex gap-2 items-center">
                    <div className="h-5 w-5 bg-[#15803D] rounded-full flex justify-center items-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <h6 className="text-md text-[#15803D] mali-bold">
                      Đã hoàn thành
                    </h6>
                  </div>
                ) : (
                  <div className="flex gap-2 items-center">
                    <div className="h-5 w-5 bg-[#EDFF46] rounded-full flex justify-center items-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <h6 className="text-md text-[#EDFF46] mali-bold">
                      Đang thực hiện
                    </h6>{" "}
                  </div>
                )}
              </div>
              <div className="flex justify-between w-full">
                
                        <Button
                          type="button"
                          className="w-20 bg-[#f52121] text-white rounded-2xl shadow-sm hover:bg-[#982410] hover:text-white focus:bg-[#f52121] "
                          onClick={() => onDelete(teacherbill.salaryid)}
                        >
                          Xóa
                        </Button>
                <Button
                  className="bg-[#05d988] rounded-2xl hover:bg-[#006f44] focus:bg-[#05d988]"
                  type="button"
                  onClick={() => onConfirm(teacherbill.salaryid)}
                >
                  Xác nhận
                </Button>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center space-y-2  ml-auto">
              <div className="h-auto w-60 rounded-xl overflow-hidden ">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <img
                      src={teacherbill.qrurl}
                      alt="qr"
                      className="object-fit"
                    />
                  </DialogTrigger>
                  <DialogContent className="flex justify-center">
                    <img
                      src={teacherbill.qrurl}
                      alt="qr"
                      className="object-fit h-[80%] w-[80%]"
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
      </li>
    </div>
  )
}

export default TeacherFinaneCard
