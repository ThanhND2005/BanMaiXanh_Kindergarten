import { adminService } from "@/services/adminService";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useAdminStore } from "@/stores/useAdminStore";

import { useState } from "react";
import TeacherFinaneCard from "./TeacherFinaneCard";

const TeacherFinance = () => {
  const teacherbills = useAdminStore((state) => state.teacherbills);
  const [open, setOpen] = useState(false);
  const { refreshTeacherBills, setLoading } = useAdminStore();
  const onCreate = async (month: number) => {
    try {
      setLoading(true);
      await adminService.postTeacherBill(month);
      await refreshTeacherBills();
      toast.success("Tạo hóa đơn thành công !");
    } catch (error) {
      console.error(error);
      toast.warning("Hóa đơn học phí tháng này đã được khởi tạo trước đó!");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl mali-bold text-[#05D988]">
            Hóa đơn lương giáo viên trong hệ thống:
          </h2>
        </div>
        <div className="flex justify-end">
          <Button
            type="button"
            className="rounded-2xl bg-[#05d988] hover:bg-[#006f44] focus:bg-[#05D988]"
            onClick={() => onCreate(2)}
          >
            Xuất hóa đơn
          </Button>
        </div>
      </div>
      <ul className="grid grid-cols-2  gap-8">
        {teacherbills?.map((teacherbill) => (
          <TeacherFinaneCard key={teacherbill.salaryid} teacherbill={teacherbill}/>
        ))}
      </ul>
    </>
  );
};

export default TeacherFinance;
