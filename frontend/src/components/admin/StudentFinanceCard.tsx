import { adminService } from "@/services/adminService";
import { useAdminStore } from "@/stores/useAdminStore";
import type { StudentBill } from "@/types/store";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
interface SFItem {
  studentbill: StudentBill;
}
const StudentFinanceCard = ({ studentbill }: SFItem) => {
  const { refreshStudentBills } = useAdminStore();
  const onDelete = async (tuitionid: string) => {
    try {
      await adminService.deleteStudentBill(tuitionid);
      await refreshStudentBills();
      toast.success("Xóa hóa đơn thành công !");
    } catch (error) {
      console.error(error);
      toast.error("Xóa hóa đơn thất bại !");
    }
  };
  const onVerify = async (tuitionid: string) => {
    try {
      await adminService.verifyStudentBill(tuitionid);
      await refreshStudentBills();
      toast.success("Xác nhận thành công");
    } catch (error) {
      console.error(error);
      toast.error("Xác nhận thất bại !");
    }
  };
  const classes = studentbill.classes.split(",");
  return (
    <div>
      <li className="grid grid-cols-2 bg-[#ffffff] rounded-xl shadow-md p-8">
        <div className="flex flex-col gap-6 justify-center">
          <div className="h-24 w-24 rounded-full overflow-hidden">
            <img
              src={studentbill.avatarurl}
              alt="Chưa có bill"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="flex flex-col justify-start gap-2">
            <h2 className="text-md mali-bold text-nowrap">
              Họ tên phụ huynh: {studentbill.parentName}
            </h2>
            <h2 className="text-md mali-bold text-nowrap">
              Họ tên học sinh: {studentbill.studentName}
            </h2>
            <h2 className="text-md mali-bold ">
              Ngày sinh: {new Date(studentbill.dob).toLocaleDateString("vi-VN")}
            </h2>
            <h2 className="text-md mali-bold ">
              Giới tính: {studentbill.gender}
            </h2>
            <h2 className="text-md mali-bold ">Lớp học:</h2>
            <ul className="w-full px-2">{
                classes.map((classitem,index) =>(
                    <li key={index} className="text-md mali-bold text-[#828282]">
                        {classitem}
                    </li>
                ))
                }</ul>
            <h2 className="text-md mali-bold">
              Số ngày đi học: {studentbill.attendance}
            </h2>
            <h2 className="text-md mali-bold">
              Học phí: {studentbill.tuition} vnđ
            </h2>
            <h2 className="text-md mali-bold">
              Tháng: {studentbill.month}
            </h2>
            {studentbill.status !== null ? (
                  <div className="flex gap-2 items-center">
                    <div className="h-5 w-5 bg-[#15803D] rounded-full flex justify-center items-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <h6 className="text-md text-[#15803D] mali-bold">Đã hoàn thành</h6>
                  </div>
                ) : (
                  <div className="flex gap-2 items-center">
                    <div className="h-5 w-5 bg-[#EDFF46] rounded-full flex justify-center items-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <h6 className="text-md text-[#EDFF46] mali-semibold">
                      Đang thực hiện
                    </h6>{" "}
                  </div>
                )}
          </div>
          <div className="flex justify-between w-full">
            <div>
              <Button
                type="button"
                className="w-20 bg-[#05D988] rounded-2xl hover:bg-[#006f44] focus:bg-[#05D988]"
                onClick={() => onVerify(studentbill.tuitionid)}
              >
                Xác nhận
              </Button>
            </div>
            <div>
              <Button
                type="button"
                className="w-20 bg-[#EB5757] rounded-2xl hover:bg-[#B22626] focus:bg-[#EB5757]"
                onClick={() => onDelete(studentbill.tuitionid)}
              >
                xóa
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-3 p-4">
          <div className="w-full h-auto overflow-hidden">
            {studentbill.billurl === null ? (
              <h2 className="text-2xl mali-bold text-center text-[#828282]">
                Không cần đối chiếu
              </h2>
            ) : (
              <img
                src={studentbill.billurl}
                alt="Không có hóa đơn"
                className="w-full h-auto"
              />
            )}
          </div>
        </div>
      </li>
    </div>
  );
};

export default StudentFinanceCard;
