import type { Teacher } from "@/types/Teacher";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
interface ITeacher {
  teacher: Teacher;
}
const UpdateSchema = z.object({
  userid: z.string(),
  name: z.string().min(1, "Tên không được để trống"),
  gender: z.string().min(1, "Giới tính không được để trống"),
  dob: z.string().date("Yêu cầu nhập đúng định dang yyyy-mm-dd"),
  address: z.string().min(1, "Không được bỏ trống địa chỉ"),
  
});
type UpdateForm = z.infer<typeof UpdateSchema>;
const TeacherCard = ({ teacher }: ITeacher) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateForm>({
    resolver: zodResolver(UpdateSchema),
    defaultValues:{
        userid : teacher.userid,
        name : teacher.name,
        dob : new Date(teacher.dob).toLocaleDateString('vi-VN'),
        gender : teacher.gender,
        address : teacher.address
    }
  });

  const onDelete = async (userid) => {
    //goi backend xoa
  };
  const onUpdate = async (data : UpdateForm) => {
    //goi backend cap nhap
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
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-[#05D988] w-15 rounded-2xl shadow-sm hover:bg-[#07C67D] focus:bg-[#05D988] transition all text-white font-normal"
                  >
                    Sửa
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <form
                    onSubmit={handleSubmit(onUpdate)}
                    className="flex flex-col rounded-xl  bg-[#ffffff]  justify-center items-center gap-4"
                  >
                    <div className="h-24 w-24 rounded-full overflow-hidden">
                      <Input type="hidden" id="userid" value={teacher.userid} />
                      <img
                        src={teacher.avatarurl}
                        alt="logo"
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="w-full">
                      <Label htmlFor="name" className="text-sm block">
                        Họ và tên
                      </Label>
                      <Input
                        type="text"
                        id="name"
                        placeholder={teacher.name}
                        className="rounded-xl shadow-xl"
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="text-destructive text-sm">
                          {errors.name.message}
                        </p>
                      )}
                      <Label htmlFor="dob" className="text-sm block">
                        Ngày sinh
                      </Label>
                      <Input
                        type="text"
                        id="dob"
                        placeholder={new Date(teacher.dob).toLocaleDateString("vi-VN")}
                        className="rounded-xl shadow-xl"
                        {...register("dob")}
                      />
                      {errors.dob && (
                        <p className="text-destructive text-sm">
                          {errors.dob.message}
                        </p>
                      )}
                      <Label htmlFor="gender" className="text-sm block">
                        Giới tính
                      </Label>
                      <Input
                        type="text"
                        id="gender"
                        placeholder={teacher.gender}
                        className="rounded-xl shadow-xl"
                        {...register("gender")}
                      />
                      {errors.gender && (
                        <p className="text-destructive text-sm">
                          {errors.gender.message}
                        </p>
                      )}
                      <Label htmlFor="address" className="text-sm block">
                        Địa chỉ
                      </Label>
                      <Input
                        type="text"
                        id="address"
                        placeholder={teacher.address}
                        className="rounded-xl shadow-xl"
                        {...register("address")}
                      />
                      {errors.address && (
                        <p className="text-destructive text-sm">
                          {errors.address.message}
                        </p>
                      )}
                     
                    </div>
                    <Button
                      type="submit"
                      className="bg-[#05D988] font-medium w-24 rounded-2xl shadow-sm hover:bg-[#07C67D] focus:bg-[#05D988] transition all text-white "
                      disabled={isSubmitting}
                    >
                      Cập nhập
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
};

export default TeacherCard;
