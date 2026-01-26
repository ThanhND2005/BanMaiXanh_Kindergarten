import { cn } from "@/lib/utils";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const SigninSchema = z.object({
  username: z.string().min(1, "Tên đăng nhập không được để trống"),
  password: z.string().min(1, "Mật khẩu không được để trống"),
});
type SigninFormValues = z.infer<typeof SigninSchema>;
export function SigninPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormValues>({
    resolver: zodResolver(SigninSchema),
  });
  const navigate = useNavigate()
  const onSubmit = async (data: SigninFormValues) => {
    //goi backend.
    navigate('/admin')
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="min-h-screen w-full bg-linear-to-b from-[#ffffff] to-[#d1fae5] flex items-center justify-center p-6">
        {/* Cột bên trái: Form Đăng ký */}
        <div className="w-full md:w-1/2 p-4 md:p-4">
           <h2 className="text-5xl font-bold text-green-700 mb-5 itim-regular">
              Ban Mai Xanh
            </h2>
            
          <h1 className="text-4xl font-bold mb-5 text-gray-800">Đăng nhập</h1>
            <p className="text-gray-600 mb-5">
              Xin chào, chúng mình cùng đăng nhập nhé !
            </p>
          
          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>

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

           
            {/* Nút Đăng nhập */}
            <Button
              type="submit"
              className="w-full bg-[#16a34a] hover:bg-[#006f44] mt-4 rounded-2xl transition all focus:bg-[#16a34a] "
              disabled={isSubmitting}
            >
              Đăng nhập
            </Button>

            {/* Link chuyển sang Đăng nhập */}
          </form>
          <p className="text-center text-sm mt-4">
            Bạn đã có tài khoản?{" "}
            <a href="/signup" className="text-blue-700 font-medium hover:underline">
              Đăng ký
            </a>
          </p>
        </div>

        {/* Cột bên phải: Hình ảnh & Lời chào */}
        <div className="hidden md:flex w-1/2 flex-col items-center justify-center p-8 gap-17">
          

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
