import { adminService } from "@/services/adminService";
import { useAdminStore } from "@/stores/useAdminStore";
import type { StudentBill } from "@/types/store";
import { toast } from "sonner";
import { Button } from "../ui/button";
interface SFItem {
  studentbill: StudentBill;
}
const StudentFinanceCard = ({ studentbill }: SFItem) => {
  const { refreshStudentBills } = useAdminStore();
  const onDelete = async (tuitionid: string) => {
    try {
      await adminService.deleteStudentBill(tuitionid);
      await refreshStudentBills();
      toast.success("Xóa thông báo thành công !");
    } catch (error) {
      console.error(error);
      toast.error("Xóa thông báo thất bại !");
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
          <div className="flex flex-wrap justify-start space-y-2">
            <h2 className="text-md font-bold w-full">
              Họ tên phụ huynh: {studentbill.parentName}
            </h2>
            <h2 className="text-md font-bold w-full">
              Họ tên học sinh: {studentbill.studentName}
            </h2>
            <h2 className="text-md font-bold w-full">
              Ngày sinh: {new Date(studentbill.dob).toLocaleDateString("vi-VN")}
            </h2>
            <h2 className="text-md font-bold w-full">
              Giới tính: {studentbill.gender}
            </h2>
            <h2 className="text-md font-bold w-full">Lớp học:</h2>
            <ul className="w-full px-2">{
                classes.map((classitem,index) =>(
                    <li key={index} className="text-md font-bold">
                        {classitem}
                    </li>
                ))
                }</ul>
            <h2 className="text-md font-bold w-full">
              Số ngày đi học: {studentbill.attendance}
            </h2>
            <h2 className="text-md font-bold w-full">
              Học phí: {studentbill.tuition} vnđ
            </h2>
            <h2 className="text-md font-bold w-full">
              Tháng: {studentbill.month}
            </h2>
            <h2 className="text-md font-bold w-full">
              Trạng thái: {studentbill.status}
            </h2>
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
          <h1 className="text-2xl font-bold">Ảnh hóa đơn</h1>
          <div className="w-full h-auto overflow-hidden">
            {studentbill.billurl === null ? (
              <h2 className="text-2xl font-bold text-center text-[#828282]">
                Phụ huynh chưa gửi ảnh
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
