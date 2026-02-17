import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import StudentCard from "./StudentCard";
import { useAdminStore } from "@/stores/useAdminStore";
import { useParentStore } from "@/stores/useParentStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { studentService } from "@/services/studentService";
import { toast } from "sonner";

const RegisterFormSchema = z.object({
  name: z.string().min(1, "Không được để trống thông tin"),
  gender: z.string().min(1, "Không được để trống thông tin"),
  dob: z.string().date("Yêu cầu nhập đúng định dạng"),
  height: z.coerce.number({ message: "Yêu cầu nhập đúng định dạng" }),
  weight: z.coerce.number({ message: "Yêu cầu nhập đúng định dạng" }),
});

type RegisterFormValues = z.infer<typeof RegisterFormSchema>;
const DashBoard = () => {
  const [open, setOpen] = useState(false);
  const parent = useAuthStore((state) => state.user);
  const students = useAdminStore((state) => state?.students)?.filter(
    (student) => student.parentid === parent?.userid,
  );
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterFormSchema),
  });
  const { refreshStudents } = useAdminStore();
  const onCreate = async (data: RegisterFormValues) => {
    const { name, dob, gender, height, weight } = data;
    try {
      await studentService.postStudent(
        parent?.userid as string,
        name,
        new Date(dob),
        gender,
        height,
        weight,
      );
      await refreshStudents();
      toast.success("Tạo thông tin học sinh thành công");
    } catch (error) {
      console.error(error);
      toast.error("Tạo thông tin thất bại");
    } finally {
      reset();
      setOpen(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="w-full flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="rounded-2xl bg-[#05D988] text-[#ffffff] hover:bg-[#02B671] focus:bg-[#05D988] shadow-md"
            >
              Đăng ký thông tin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form
              className="flex flex-col justify-center gap-3"
              onSubmit={handleSubmit(onCreate)}
            >
              <h1 className="text-xl font-bold text-center">
                Đăng ký thông tin cho học sinh
              </h1>
              <div>
                <Label htmlFor="name" className="text-sm block">
                  Họ và tên
                </Label>
                <Input
                  type="text"
                  id="name"
                  className="rounded-2xl shadow-md p-2"
                  placeholder="Nhập họ và tên"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-destructive text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="gender" className="text-sm block">
                  Giới tính
                </Label>
                <Controller
                  name="gender"
                  control={control}
                  defaultValue="Nam"
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="w-full"
                      {...register("gender")}
                    >
                      <div className="flex gap-3">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="Nam" id="nam" />
                          <Label htmlFor="nam">Nam</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="Nữ" id="nu" />
                          <Label htmlFor="nu">Nữ</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  )}
                />
              </div>
              <div>
                <Label htmlFor="dob" className="text-sm block">
                  Ngày sinh
                </Label>
                <Input
                  type="text"
                  id="dob"
                  className="rounded-2xl shadow-md p-2"
                  placeholder="Nhập ngày sinh"
                  {...register("dob")}
                />
                {errors.dob && (
                  <p className="text-destructive text-sm">
                    {errors.dob.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="height" className="text-sm block">
                  Chiều cao
                </Label>
                <Input
                  type="text"
                  id="height"
                  className="rounded-2xl shadow-md p-2"
                  placeholder="Nhập chiều cao"
                  {...register("height")}
                />
                {errors.height && (
                  <p className="text-destructive text-sm">
                    {errors.height.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="weight" className="text-sm block">
                  Cân nặng
                </Label>
                <Input
                  type="text"
                  id="weight"
                  className="rounded-2xl shadow-md p-2"
                  placeholder="Nhập cân nặng"
                  {...register("weight")}
                />
                {errors.weight && (
                  <p className="text-destructive text-sm">
                    {errors.weight.message}
                  </p>
                )}
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="rounded-2xl bg-[#05D988] text-[#ffffff] hover:bg-[#02B671] focus:bg-[#05D988] shadow-md w-50"
                  disabled={isSubmitting}
                >
                  Đăng ký
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <ul className="space-y-4">
        {students?.map((student) => (
          <StudentCard key={student.studentid} student={student} />
        ))}
      </ul>
    </div>
  );
};

export default DashBoard;
