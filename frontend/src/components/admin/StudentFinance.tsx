import React from "react";
import { Button } from "../ui/button";
import { useAdminStore } from "@/stores/useAdminStore";
import { adminService } from "@/services/adminService";
import {toast} from 'sonner'
import StudentFinanceCard from "./StudentFinanceCard";
const StudentFinance = () => {
  const studentbills = useAdminStore((state) => state.studentbills);
  const {refreshStudentBills} = useAdminStore()
  const onCreate = async (month : number) => {
      try {
        await adminService.postStudentBill(month)
        await refreshStudentBills()
        toast.success("Tạo hóa đơn học phí thành công !")
      } catch (error) {
        console.log(error)
        toast.error("Tạo hóa đơn học phí không thành công !")
      }
      
  };
  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <div className="flex justify-start items-center">
          <h1 className="text-2xl itim-regular text-[#05D988]">
            Hóa đơn tiền học các học sinh trong hệ thống:
          </h1>
        </div>
        <div className="flex justify-start items-center">
          <Button
            type="button"
            onClick={() => onCreate(2)}
            className="bg-[#05D988] rounded-2xl shadow-sm hover:bg-[#006f44] focus:bg-[#05D988]"
          >
            Xuất hóa đơn
          </Button>
        </div>
      </div>
      <ul className="grid grid-cols-2 gap-8 ">
        {studentbills?.map((studentbill) => (
          <StudentFinanceCard key={studentbill.tuitionid} studentbill={studentbill}/>
        ))}
      </ul>
    </>
  );
};

export default StudentFinance;
