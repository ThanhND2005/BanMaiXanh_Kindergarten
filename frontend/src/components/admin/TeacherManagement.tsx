import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger,DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";

type TeacherCard = {
  userid: string;
  dob: Date;
  name: string;
  gender: string;
  address: string;
  classname: string;
  createdat: string;
};
const UpdateSchema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  gender: z.string().min(1, "Giới tính không được để trống"),
  dob: z.string().date("Yêu cầu nhập đúng định dang yyyy-mm-dd"),
  address: z.string().min(1, "Không được bỏ trống địa chỉ"),
  classname: z.string().min(1, "Không được bỏ trống tên lớp"),
});
type UpdateForm = z.infer<typeof UpdateSchema>;

const TeacherManagement = () => {
  const teachers = [
    {
      userid: "001",
      name: "Nguyen Van An",
      dob: "2005-01-01",
      gender: "Nam",
      address: "Ha Noi",
      classname: "Vo",
      createdat: "2025-01-02",
      avatarurl:
        "https://i.pinimg.com/1200x/b3/c2/77/b3c2779d6b6195793b72bf73e284b3e8.jpg",
    },
    {
      userid: "002",
      dob: "2005-01-01",
      name: "Nguyen Thi Van",
      gender: "Nu",
      address: "Nghe An",
      classname: "Mi Thuat",
      createdat: "2025-01-02",
      avatarurl:
        "https://i.pinimg.com/1200x/b3/c2/77/b3c2779d6b6195793b72bf73e284b3e8.jpg",
    },
    {
      userid: "003",
      dob: "2005-01-01",
      name: "Nguyen Thi Lan",
      gender: "Nu",
      address: "Nghe An",
      classname: "Mam 2",
      createdat: "2025-01-02",
      avatarurl:
        "https://i.pinimg.com/1200x/b3/c2/77/b3c2779d6b6195793b72bf73e284b3e8.jpg",
    },
    {
      userid: "004",
      dob: "2005-01-01",
      name: "Nguyen Thi Ha",
      gender: "Nu",
      address: "Ha Noi",
      classname: "Choi 1",
      createdat: "2025-01-02",
      avatarurl:
        "https://i.pinimg.com/1200x/b3/c2/77/b3c2779d6b6195793b72bf73e284b3e8.jpg",
    },
    {
      userid: "005",
      dob: "2005-01-01",
      name: "Nguyen Thi Van",
      gender: "Nu",
      address: "Nghe An",
      classname: "Am nhac",
      createdat: "2025-01-02",
      avatarurl:
        "https://i.pinimg.com/1200x/b3/c2/77/b3c2779d6b6195793b72bf73e284b3e8.jpg",
    },
  ];
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateForm>({
    resolver: zodResolver(UpdateSchema),
  });
  const {
    register: re,
    handleSubmit: ha,
    formState: { errors: er, isSubmitting: is },
  } = useForm<TeacherCard>();
  const onSubmit1 = async () => {};
  const onSubmit2 = async () => {};
  return (
    <>
      <h1 className="text-4xl itim-regular mb-4">
        Các giáo viên trong hệ thống:
      </h1>
      <ul className="grid grid-cols-4 gap-8">
        {teachers.map((teacher) => (
          <li key={teacher.userid}>
            <form
              onSubmit={ha(onSubmit1)}
              className="flex flex-wrap rounded-xl shadow-sm bg-[#ffffff]  justify-center"
            >
              <Input
                type="hidden"
                id="userid"
                value={teacher.userid}
                {...re("userid")}
              />
              <div className="w-24 h-24 rounded-full overflow-hidden mt-3">
                <img
                  src={teacher.avatarurl}
                  alt="avatar"
                  className="w-full object-cover"
                />
              </div>
              <div className="gap-3 mt-3 mb-2 ">
                <div className="w-full text-base font-medium">
                  Họ và tên: {teacher.name}{" "}
                </div>
                <div className="w-full text-base font-medium">
                  Ngày sinh: {teacher.dob}
                </div>
                <div className="w-full text-base font-medium">
                  Giới tính {teacher.gender}
                </div>
                <div className="w-full text-base font-medium">
                  Địa chỉ: {teacher.address}
                </div>
                <div className="w-full text-base font-medium">
                  Lớp: {teacher.classname}
                </div>
                <div className="w-full text-base font-medium">
                  Ngày tham gia: {teacher.createdat}
                </div>
              </div>
              <div className="flex justify-between w-full mb-3 px-6">
                <Button
                  type="submit"
                  className="bg-[#f52121] rounded-2xl shadow-sm hover:bg-[#9E0C0C] focus:bg-[#f52121] transition all"
                  disabled={is}
                >
                  Xóa
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-[#05D988] w-15 rounded-2xl shadow-sm hover:bg-[#07C67D] focus:bg-[#05D988] transition all text-white font-normal"
                    >
                      Sửa
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <form onSubmit={handleSubmit(onSubmit2)} className="flex flex-wrap rounded-xl  bg-[#ffffff]  justify-center gap-4">
                      <div className="h-24 w-24 rounded-full overflow-hidden">
                        <Input type="hidden" id="userid" value={teacher.userid}/>
                        <img src={teacher.avatarurl} alt="logo" className="w-full h-auto" /> 
                      </div>
                      <div className="w-full">
                        <Label htmlFor="name" className="text-sm block">Họ và tên</Label>
                        <Input type="text" id="name" placeholder={teacher.name} className="rounded-xl shadow-xl"{...register("name")}/>
                        {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
                        <Label htmlFor="dob" className="text-sm block">Ngày sinh</Label>
                        <Input type="text" id="dob" placeholder={teacher.dob} className="rounded-xl shadow-xl"{...register("dob")}/>
                        {errors.dob && <p className="text-destructive text-sm">{errors.dob.message}</p>}
                        <Label htmlFor="gender" className="text-sm block">Giới tính</Label>
                        <Input type="text" id="gender" placeholder={teacher.gender} className="rounded-xl shadow-xl"{...register("gender")}/>
                        {errors.gender && <p className="text-destructive text-sm">{errors.gender.message}</p>}
                        <Label htmlFor="address" className="text-sm block">Địa chỉ</Label>
                        <Input type="text" id="address" placeholder={teacher.address} className="rounded-xl shadow-xl"{...register("address")}/>
                        {errors.address && <p className="text-destructive text-sm">{errors.address.message}</p>}
                         <Label htmlFor="gender" className="text-sm block">Lớp học</Label>
                        <Input type="text" id="classname" placeholder={teacher.classname} className="rounded-xl shadow-xl"{...register("classname")}/>
                        {errors.classname && <p className="text-destructive text-sm">{errors.classname.message}</p>}
                      </div>
                      <Button type="submit" className="bg-[#05D988] font-medium w-24 rounded-2xl shadow-sm hover:bg-[#07C67D] focus:bg-[#05D988] transition all text-white " disabled={isSubmitting}>Cập nhập</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </form>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TeacherManagement;
