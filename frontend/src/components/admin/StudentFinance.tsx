import React from "react";
import { Button } from "../ui/button";
import { useAdminStore } from "@/stores/useAdminStore";

const StudentFinance = () => {
  const studentbills = useAdminStore((state) => state.studentbills);
  const onCreate = async () => {};
  const onDelete = async (tuitionid) => {
    //goi backend
  };
  const onVerify = async (tuitionid) => {
    //goi backend
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
            onClick={onCreate}
            className="bg-[#05D988] rounded-xl shadow-sm hover:bg-[#00BC74] focus:bg-[#05D988]"
          >
            Xuất hóa đơn
          </Button>
        </div>
      </div>
      <ul className="grid grid-cols-2 gap-8 ">
        {studentbills?.map((studentbill) => (
          <li className="grid grid-cols-2 bg-[#ffffff] rounded-xl shadow-md p-8" key={studentbill.tuitionid}>
            <div className="flex flex-wrap gap-6 justify-center">
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
                <h2 className="text-md font-bold w-full">
                  Lớp học: {studentbill.className}
                </h2>
                <h2 className="text-md font-bold w-full">
                  Số ngày đi học: {studentbill.attendance}
                </h2>
                <h2 className="text-md font-bold w-full">
                  Học phí: {studentbill.tuition} vnđ
                </h2>
                <h2 className="text-md font-bold w-full">
                  Trạng thái: {studentbill.status}
                </h2>
              </div>
              <div className="flex justify-between w-full">
                <div>
                  <Button
                    type="button"
                    className="w-20 bg-[#05D988] rounded-2xl hover:bg-[#00BC74] focus:bg-[#05D988]"
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
            <div className="flex flex-wrap justify-center gap-3 p-4">
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
        ))}
      </ul>
    </>
  );
};

export default StudentFinance;
