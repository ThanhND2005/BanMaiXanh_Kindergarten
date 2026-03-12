import type { Class } from "@/types/Class";
import { Button } from "../ui/button";
import { useAdminStore } from "@/stores/useAdminStore";
import { adminService } from "@/services/adminService";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useState } from "react";
interface IClassProps {
  class1: Class;
}
const ClassCard = ({ class1 }: IClassProps) => {
  const { refreshClasses } = useAdminStore();
  const [open, setOpen] = useState(false);
  const onDelete = async (classid: string) => {
    await adminService.deleteClass(classid);
    await refreshClasses();
  };
  return (
    <div>
      <li>
        <div className="relative rounded-xl bg-[#ffffff] shadow-md flex flex-col ">
          <div className="w-full h-25 overflow-hidden mb-3">
            <img
              src="https://res.cloudinary.com/dhylrhxsa/image/upload/v1769583472/51758c8655e6dbb882f7_dqoijs.jpg"
              alt="anh lop hoc"
              className="w-full object-cover"
            />
          </div>
          <div className="px-5 gap-1 flex flex-col">
            <h2 className="text-md mali-bold">Tên lớp: {class1.classname}</h2>
            <h2 className="text-md mali-bold text-nowrap">
              Giáo viên: {class1.teachername}
            </h2>
            <h2 className="text-md mali-bold">Độ tuổi: {class1.age}</h2>
            <h2 className="text-md mali-bold">Số lượng trẻ: {class1.member}</h2>
            <h2 className="text-md mali-bold">Học phí: {class1.tuition} vnđ</h2>
            <h2 className="text-md mali-bold">
              Tình trạng: {`${class1.currentmember}/${class1.member}`}
            </h2>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <div className="flex justify-end items-center p-4">
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
                Bạn chắc chắn muốn xóa lớp học này?
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
                    className=" bg-[#f52121] text-white rounded-2xl shadow-sm hover:bg-[#982410] hover:text-white focus:bg-[#f52121] "
                    onClick={() => onDelete(class1.classid)}
                  >
                    Xóa
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </li>
    </div>
  );
};

export default ClassCard;
