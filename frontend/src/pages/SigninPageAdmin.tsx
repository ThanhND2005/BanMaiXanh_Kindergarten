import { cn } from "@/lib/utils";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { getRedirectPath } from "@/lib/navigation";
import { useAdminStore } from "@/stores/useAdminStore";
const SigninSchema = z.object({
  username: z.string().min(1, "Tên đăng nhập không được để trống"),
  password: z.string().min(1, "Mật khẩu không được để trống"),
});
type SigninFormValues = z.infer<typeof SigninSchema>;
export function SigninPageAdmin({
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
  const signinAdmin = useAuthStore((state) => state.signinAdmin)
  const {refreshStudents,refreshTeachers ,refreshClasses,refreshNotifications,refreshMenu,refreshStudentBills,refreshTeacherBills,refreshSecurity,refreshAdmin}= useAdminStore()
  const onSubmit = async (data: SigninFormValues) => {
    const {username, password} = data 
    await signinAdmin(username,password)
    const user =  useAuthStore.getState().user
    if (user) {
        const correctPath = getRedirectPath(user.role as string);
        await refreshAdmin(user.userid as string)
        await refreshStudents()
        await refreshTeachers()
        await refreshClasses()
        await refreshNotifications()
        await refreshMenu()
        await refreshStudentBills()
        await refreshTeacherBills()
        await refreshSecurity()
        await refreshAdmin(user.userid as string)
        navigate(correctPath,{replace: true});
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="min-h-screen w-full bg-linear-to-b from-[#ffffff] to-[#d1fae5] flex items-center justify-center p-6">
    
        <div className="w-full md:w-1/2 p-4 md:p-4">
           <h2 className="text-5xl font-bold text-green-700 mb-5 itim-regular">
              Ban Mai Xanh
            </h2>
            
          <h1 className="text-4xl font-bold mb-5 text-gray-800">Đăng nhập</h1>
            <p className="text-gray-600 mb-5">
              Xin chào, chúng mình cùng đăng nhập nhé !
            </p>
          
          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>

          
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

           
           
            <Button
              type="submit"
              className="w-full bg-[#16a34a] hover:bg-[#006f44] mt-4 rounded-2xl transition all focus:bg-[#16a34a] "
              disabled={isSubmitting}
            >
              Đăng nhập
            </Button>

          
          </form>
          
        </div>


        <div className="hidden md:flex w-1/2 flex-col items-center justify-center p-8 gap-17">
          

          <div className="relative w-full max-w-sm h-auto">
            
            <img
              src="https://res.cloudinary.com/dhylrhxsa/image/upload/v1772292324/f700c5b739cf2fc2e43694b9a4d75c0c-removebg-preview_ebi4ha.png"
              alt="Minh họa giáo viên và học sinh"
              className="rounded-xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
