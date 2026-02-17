import { useTabParentStore } from "@/stores/useTabStore";
import React from "react";
import {
  Leaf,
  Home,
  Users,
  MessageSquareDot,
  HandCoins,
  CookingPot,
  LogOut,
  School,
} from "lucide-react";
import DashBoard from "@/components/parent/DashBoard";
import Class from "@/components/parent/Class";
import Teacher from "@/components/parent/Teacher";
import Notification from "@/components/parent/Notification";
import Tuition from "@/components/parent/Tuition";
import Menu from "@/components/teacher/Menu";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { parentService } from "@/services/parentService";
import { toast } from "sonner";

const AvatarFormSchema = z.object({
  avatar: z
    .any()
    .refine((file) => file?.length > 0, {
      message: "Không để trống thông tin",
    }),
});
type AvatarFromValues = z.infer<typeof AvatarFormSchema>;
const HomePageParent = () => {
  const { tabActive, setTabActive } = useTabParentStore();
  
  const parent = useAuthStore((state) => state.user)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AvatarFromValues>({
    resolver: zodResolver(AvatarFormSchema),
  });
  const now = new Date();
  const dateformat = new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(now);
  const final = dateformat.replace(", ", ", ngày ");
  const {getMe} = useAuthStore()
  const onUpdate = async (data: AvatarFromValues) => {
    const file = data.avatar[0]
    try {
      await parentService.patchAvatar(file,parent?.userid as string)
      await getMe()
      toast.success("Cập nhập ảnh đại diện thành công")
    } catch (error) {
      console.error(error)
      toast.error("Cập nhập ảnh đại diện thất bại ")
    }
  };
  const navigate = useNavigate()
   const signout = useAuthStore((state) => state.signout)
  const onLogout = async () =>{
    await signout()
    navigate('/signin')
  }
  return (
    <div className="flex min-h-screen bg-[#E8F5E9]">
      <aside className="w-64 bg-[#2E7D32] text-white flex flex-col h-screen sticky top-0 left-0 shadow-xl z-30 shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <Leaf className="w-8 h-8 " />
          <span className="text-2xl font-bold itim-regular">Ban Mai Xanh</span>
        </div>
        <nav className="flex-1 mt-4 space-y-2 overflow-y-auto custom-scrollbar">
          <button
            onClick={() => setTabActive("dashboard")}
            className={`w-full rounded-2xl flex items-center px-6 py-3 justify-start gap-2 itim-regular text-2xl ${tabActive === "dashboard" ? "bg-white text-[#15803D]" : "bg-transparent"} transition-all duration-500`}
          >
            <Home className="h-6 w-6" />
            Trang chủ
          </button>
          <button
            onClick={() => setTabActive("class")}
            className={`w-full rounded-2xl flex items-center px-6 py-3 justify-start gap-2 itim-regular text-2xl ${tabActive === "class" ? "bg-white text-[#15803D]" : "bg-transparent"} transition-all duration-500`}
          >
            <School className="h-6 w-6" />
            Lớp học
          </button>
          <button
            onClick={() => setTabActive("teacher")}
            className={`w-full rounded-2xl flex items-center px-6 py-3 justify-start gap-2 itim-regular text-2xl ${tabActive === "teacher" ? "bg-white text-[#15803D]" : "border-transparent"} transition-all duration-500`}
          >
            <Users className="h-6 w-6" />
            Giáo viên
          </button>
          <button
            onClick={() => setTabActive("notification")}
            className={`w-full rounded-2xl flex items-center px-6 py-3 justify-start gap-2  itim-regular text-2xl ${tabActive === "notification" ? "bg-white text-[#15803D]" : "border-transparent"} transition-all duration-500`}
          >
            <MessageSquareDot className="h-6 w-6" />
            Thông báo
          </button>
          <button
            onClick={() => setTabActive("tuition")}
            className={`w-full rounded-2xl flex items-center px-6 py-3 justify-start gap-2  itim-regular text-2xl ${tabActive === "tuition" ? "bg-white text-[#15803D]" : "border-transparent"} transition-all duration-500`}
          >
            <HandCoins className="h-6 w-6" />
            Học phí
          </button>
          <button
            onClick={() => setTabActive("menu")}
            className={`w-full rounded-2xl flex items-center px-6 py-3 justify-start gap-2 itim-regular text-2xl ${tabActive === "menu" ? "bg-white text-[#15803D]" : "border-transparent"} transition-all duration-500`}
          >
            <CookingPot className="h-6 w-6" />
            Thực đơn
          </button>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button className="flex items-center w-full px-4 py-3 text-white/90 hover:bg-white/10 hover:text-white rounded-lg transition-colors" onClick={() => onLogout()}>
            <LogOut size={20} className="mr-3" />
            <span className="font-medium">Đăng xuất</span>
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 w-full bg-white h-20 px-8 flex justify-between items-center shadow-sm border-b border-gray-100">
          <div>
            <h1 className="text-2xl font-bold ">Xin chào phụ huynh 🌞</h1>
            <h2 className="text-md font-bold text-[#828282]">{final}</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="font-bold text-gray-800 text-sm">{parent?.name}</p>
              <p className="text-xs text-gray-500">Phụ huynh</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
                  <img
                    src={parent?.avatarurl}
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
                    {errors.avatar && <p className="text-destructive text-sm">{errors.avatar.message as string}</p>}
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
          {tabActive === "teacher" && <Teacher />}
          {tabActive === "notification" && <Notification />}
          {tabActive === "tuition" && <Tuition />}
          {tabActive === "menu" && <Menu />}
        </main>
      </div>
    </div>
  );
};

export default HomePageParent;
