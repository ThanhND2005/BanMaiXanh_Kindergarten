import { adminService } from "@/services/adminService";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useAdminStore } from "@/stores/useAdminStore";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { teacherService } from "@/services/teacherService";

const TeacherFinance = () => {
  const teacherbills = useAdminStore((state) => state.teacherbills);
  const { refreshTeacherBills } = useAdminStore();
  const onCreate = async (month: number) => {
    try {
      useAdminStore.setState({ loading: true });
      await adminService.postTeacherBill(month);
      await refreshTeacherBills();
      toast.success("Tạo hóa đơn thành công !");
    } catch (error) {
      console.error(error);
      toast.error("Tạo hóa đơn thất bại !");
    } finally {
      useAdminStore.setState({ loading: false });
    }
  };
  const onDelete = async (salaryid: string) => {
    try {
      await adminService.deleteTeacherBill(salaryid);
      await refreshTeacherBills();
      toast.success("Xóa hóa đơn thành công !");
    } catch (error) {
      console.error(error);
      toast.error("Xóa hóa đơn thất bại !");
    }
  };
  const onConfirm = async (salaryid: string) => {
      try {
          await teacherService.verifyTeacherBill(salaryid)
          await refreshTeacherBills()
          toast.success("Xác nhận thành công")
      } catch (error) {
          console.error(error)
          toast.error("Xác nhận thất bại")
      }
    }
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl itim-regular text-[#05D988]">
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
          <li
            key={teacherbill.salaryid}
            className="flex py-4 px-10 bg-white rounded-2xl shadow-md"
          >
            <div className="flex flex-col justify-center items-center gap-4">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <img src={teacherbill.avatarurl} alt="w-full object-cover" />
              </div>
              <div className="space-y-2">
                <h2 className="text-md font-bold">
                  Họ và tên: {teacherbill.teacherName}
                </h2>
                <h2 className="text-md font-bold">
                  Ngày sinh:{" "}
                  {new Date(teacherbill.dob).toLocaleDateString("vi-VN")}
                </h2>
                <h2 className="text-md font-bold">
                  Giới tính: {teacherbill.gender}
                </h2>
                <h2 className="text-md font-bold">
                  Địa chỉ: {teacherbill.address}
                </h2>
                <h2 className="text-md font-bold">
                  Lớp: {teacherbill.className}
                </h2>
                <h2 className="text-md font-bold">
                  Số ngày công: {teacherbill.timekeeping}
                </h2>
                <h2 className="text-md font-bold">
                  Lương cơ bản: {teacherbill.timekeeping * 200000} vnđ
                </h2>
                <h2 className="text-md font-bold">
                  Phụ cấp: {teacherbill.allowance} vnđ
                </h2>
                <h2 className="text-md font-bold">
                  Tổng lương: {teacherbill.amount} vnđ
                </h2>
                <h2 className="text-md font-bold">
                  Tháng: {teacherbill.month}
                </h2>
                <h2 className="text-md font-bold">
                  Trạng thái: {teacherbill.status}
                </h2>
              </div>
              <div className="flex justify-between w-full">
                <Button
                  type="button"
                  className="bg-[#EB5757] rounded-2xl hover:bg-[#B22626] focus:bg-[#EB5757]"
                  onClick={() => onDelete(teacherbill.salaryid)}
                >
                  Xóa
                </Button>
                <Button className="bg-[#05d988] rounded-2xl hover:bg-[#006f44] focus:bg-[#05d988]" type="button" onClick={() => onConfirm(teacherbill.salaryid )}>Xác nhận</Button>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center space-y-2  ml-auto">
              <h1 className="text-2xl font-bold">Ảnh hóa đơn</h1>
              <div className="h-auto w-60 rounded-xl overflow-hidden ">
                <Dialog>
                  <DialogTrigger asChild>
                    <img src={teacherbill.qrurl} alt="qr" className="object-fit" />
                  </DialogTrigger>
                  <DialogContent className="flex justify-center">
                    <img src={teacherbill.qrurl} alt="qr" className="object-fit h-[80%] w-[80%]" />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TeacherFinance;
