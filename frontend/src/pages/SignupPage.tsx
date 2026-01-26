import { cn } from "@/lib/utils";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

const SignupSchema = z.object({
  name: z.string().min(1, "Họ và tên không được để trống"),
  address: z.string().min(1, "Địa chỉ không được để trống"),
  dob: z.string().date("Cần nhập đúng định dạng"),
  username: z.string().min(1, "Tên đăng nhập không được để trống"),
  password: z.string().min(1, "Mật khẩu không được để trống"),
});
type SignupFormValues = z.infer<typeof SignupSchema>;
export function SignupPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupSchema),
  });
  const onSubmit = async (data: SignupFormValues) => {
    //goi backend.
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="min-h-screen w-full bg-linear-to-b from-[#ffffff] to-[#d1fae5] flex items-center justify-center p-6">
        {/* Cột bên trái: Form Đăng ký */}
        <div className="w-full md:w-1/2 p-4 md:p-4">
          <h1 className="text-4xl font-bold mb-3 text-gray-800">Đăng ký</h1>

          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            {/* Họ và tên */}
            <div>
              <Label htmlFor="name" className="block text-sm">
                Họ và tên
              </Label>
              <Input
                type="text"
                placeholder="Nhập họ và tên"
                id="name"
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-destructive text-sm">
                  {" "}
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Địa chỉ */}
            <div>
              <Label htmlFor="address" className="text-sm block">
                Địa chỉ
              </Label>
              <Input
                type="text"
                placeholder="Nhập vào địa chỉ"
                id="address"
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 "
                {...register("address")}
              />
              {errors.address && (
                <p className="text-destructive text-sm">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Ngày sinh */}
            <div>
              <Label htmlFor="dob" className="text-sm block">
                Ngày sinh
              </Label>
              <Input
                type="text"
                placeholder="Nhập vào ngày sinh"
                id="dob"
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 "
                {...register("dob")}
              />
              {errors.dob && (
                <p className="text-destructive text-sm">{errors.dob.message}</p>
              )}
            </div>

            {/* Giới tính */}
            <div>
              <Label htmlFor="gender" className="text-sm block">
                Giới tính
              </Label>
              <RadioGroup defaultValue="Nam" id="gender" className="w-full">
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
            </div>

            {/* Tên đăng nhập */}
            <div>
              <Label htmlFor="username" className="text-sm block">
                Tên đăng nhập
              </Label>
              <Input
                type="text"
                placeholder="Nhập vào số điện thoại"
                id="username"
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 "
                {...register("username")}
              />
              {errors.username && (
                <p className="text-destructive text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Mật khẩu */}
            <div>
              <Label htmlFor="password" className="text-sm block">
                Mật khẩu
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Nhập vào mật khẩu"
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 "
                {...register("password")}
              />
              {errors.password && (
                <p className="text-destructive text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Vai trò */}
            <div>
              <Label htmlFor="role" className="text-sm block">
                Vai trò
              </Label>
              <RadioGroup id="role" defaultValue="Phụ huynh" className="w-full">
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 ">
                    <RadioGroupItem value="Giáo viên" id="teacher" />
                    <Label htmlFor="teacher">Giáo viên</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="Phụ huynh" id="parent" />
                    <Label htmlFor="parent">Phụ huynh</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Nút Đăng ký */}
            <Button
              type="submit"
              className="w-full bg-[#16a34a] hover:bg-[#006f44] mt-4 rounded-2xl focus:bg-[#16a34a] transition all "
              disabled={isSubmitting}
            >
              Đăng ký
            </Button>

            {/* Link chuyển sang Đăng nhập */}
          </form>
          <p className="text-center text-sm mt-4">
            Bạn đã có tài khoản?{" "}
            <a href="/signin" className="text-blue-700 font-medium hover:underline">
              Đăng nhập
            </a>
          </p>
        </div>

        {/* Cột bên phải: Hình ảnh & Lời chào */}
        <div className="hidden md:flex w-1/2 flex-col items-center justify-center p-8 gap-17">
          <div className="mb-8 ">
            
            <h2 className="text-5xl font-bold text-green-700 mb-2 itim-regular">
              Ban Mai Xanh
            </h2>
            
            <p className="text-gray-600">
              Xin chào, chúng mình cùng đăng ký tài khoản mới nhé !
            </p>
          </div>

          <div className="relative w-full max-w-sm h-auto">
            {/* Thay đổi URL ảnh bên dưới thành ảnh thực tế của bạn */}
            <img
              src="https://res.cloudinary.com/dhylrhxsa/image/upload/v1769423947/6cb54c22dd7b53250a6a-removebg-preview_ilwqum.png"
              alt="Minh họa giáo viên và học sinh"
              className="rounded-xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
