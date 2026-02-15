import {
  Home,
  Users,
  MessageSquareDot,
  HandCoins,
  CookingPot,
  LogOut,
  Leaf,
} from "lucide-react";
import { useTabTeacherStore } from "@/stores/useTabStore";
import DashBoard from "@/components/teacher/DashBoard";
import Class from "@/components/teacher/Class";
import Notification from "@/components/teacher/Notification";
import Salary from "@/components/teacher/Salary";
import Menu from "@/components/teacher/Menu"; 
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog,DialogTrigger,DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/stores/useAuthStore";
import { useAdminStore } from "@/stores/useAdminStore";
import type { Teacher } from "@/types/Teacher";
import { use } from "react";
const AvatarFormSchema = z.object({
  avatar: z
    .any()
    .refine((file) => file?.length > 0, {
      message: "Không để trống thông tin",
    }),
});
type AvatarFromValues = z.infer<typeof AvatarFormSchema>;
const HomePageTeacher = () => {
  const { tabActive, setTabActive } = useTabTeacherStore();
  const user = useAuthStore((state) => state.user)
  const teacher = useAdminStore((state) => state.teachers)?.find((t) => t.userid === user?.userid)
  const navigate = useNavigate()
  const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm<AvatarFromValues>({
      resolver: zodResolver(AvatarFormSchema),
    });
  const now = new Date();
    const dateformat = new Intl.DateTimeFormat('vi-VN',{
      weekday: 'long',
      day :'2-digit',
      month:'2-digit',
      year:'numeric',
    }).format(now)
  const final = dateformat.replace(', ',', ngày ')
  const signout = useAuthStore((state) => state.signout)
  const onLogout = async () =>{
    await signout()
    navigate("/signin")
  }
  const onUpdate = (data: AvatarFromValues) => {};
  return (
    <div className="flex min-h-screen bg-[#E8F5E9]">
      <aside className="w-64 bg-[#2E7D32] text-white flex flex-col h-screen sticky top-0 left-0 shadow-xl z-30 shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <Leaf className="w-8 h-8 mr-3" />
          <span className="text-2xl font-bold itim-regular">Ban Mai Xanh</span>
        </div>
        <nav className="flex-1 mt-4 space-y-2 overflow-y-auto custom-scrollbar">
          <button
            onClick={() => setTabActive("dashboard")}
            className={`w-full flex items-center px-6 py-3 justify-start gap-2 border-b-2 itim-regular text-2xl ${tabActive === "dashboard" ? "border-white" : "border-transparent"} transition-all duration-500`}
          >
            <Home className="h-6 w-6" />
            Trang chủ
          </button>
          <button
            onClick={() => setTabActive("class")}
            className={`w-full flex items-center px-6 py-3 justify-start gap-2 border-b-2 itim-regular text-2xl ${tabActive === "class" ? "border-white" : "border-transparent"} transition-all duration-500`}
          >
            <Users className="h-6 w-6" />
            Lớp học
          </button>
          <button
            onClick={() => setTabActive("notification")}
            className={`w-full flex items-center px-6 py-3 justify-start gap-2 border-b-2 itim-regular text-2xl ${tabActive === "notification" ? "border-white" : "border-transparent"} transition-all duration-500`}
          >
            <MessageSquareDot className="h-6 w-6" />
            Thông báo
          </button>
          <button
            onClick={() => setTabActive("salary")}
            className={`w-full flex items-center px-6 py-3 justify-start gap-2 border-b-2 itim-regular text-2xl ${tabActive === "salary" ? "border-white" : "border-transparent"} transition-all duration-500`}
          >
            <HandCoins className="h-6 w-6" />
            Lương
          </button>
          <button
            onClick={() => setTabActive("menu")}
            className={`w-full flex items-center px-6 py-3 justify-start gap-2 border-b-2 itim-regular text-2xl ${tabActive === "menu" ? "border-white" : "border-transparent"} transition-all duration-500`}
          >
            <CookingPot className="h-6 w-6" />
            Thực đơn
          </button>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button className="flex items-center w-full px-4 py-3 text-white/90 hover:bg-white/10 hover:text-white rounded-lg transition-colors" onClick={onLogout}>
            <LogOut size={20} className="mr-3" />
            <span className="font-medium">Đăng xuất</span>
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 w-full bg-white h-20 px-8 flex justify-between items-center shadow-sm border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {final}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="font-bold text-gray-800 text-sm">{teacher?.name}</p>
              <p className="text-xs text-gray-500">Giáo viên</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
                  <img
                    src={teacher?.avatarurl}
                    alt="ảnh đại diện"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </DialogTrigger>
              <DialogContent>
                <h1 className="text-2xl text-center font-bold">
                  Cập nhập ảnh đại diện
                </h1>
                <form
                  onSubmit={handleSubmit(onUpdate)}
                  className="flex flex-col justify-center gap-3"
                >
                  <div>
                    <Label htmlFor="avatar" className="text-sm block">
                      Ảnh đại diện
                    </Label>
                    <Input type="file" id="avatar" className="rounded-2xl" {...register("avatar")}/>
                    {errors.avatar && <p className="text-destructive text-sm">{errors.avatar.message as string}</p> }
                  </div>
                  <Button
                    type="submit"
                    className="rounded-2xl bg-[#05d988] hover:bg-[#006f44] hover:text-white focus:bg-[#05d988] transition all"
                    disabled={isSubmitting}
                  >
                    Cập nhập
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          {tabActive === "dashboard" && <DashBoard />}
          {tabActive === "class" && <Class />}
          {tabActive === "notification" && <Notification />}
          {tabActive == "salary" && <Salary />}
          {tabActive === "menu" && <Menu />}
        </main>
      </div>
    </div>
  );
};

export default HomePageTeacher;
