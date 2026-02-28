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
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/stores/useAuthStore";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { teacherService } from "@/services/teacherService";
import { toast } from "sonner";
import { useState } from "react";
const AvatarFormSchema = z.object({
  avatar: z.any().refine((file) => file?.length > 0, {
    message: "Không để trống thông tin",
  }),
});
interface Account {
  bank: string, 
  accountbank: string
}
const UpdateFormSchema = z.object({
  name: z.string().min(1, "Tên không được để trống !"),
  gender: z.string().min(1, "Giới tính không được để trống !"),
  address: z.string().min(1, "Địa chỉ không được để trống !"),
  dob: z.string().date("Ngày sinh không được để trống !"),
  bank:z.string(),
  accountbank: z.string()
});
type UpdateFormValues = z.infer<typeof UpdateFormSchema>;
type AvatarFromValues = z.infer<typeof AvatarFormSchema>;
const HomePageTeacher = () => {
  const { tabActive, setTabActive } = useTabTeacherStore();
  const teacher = useAuthStore((state) => state.user);
  const [account,setAccount] = useState<Account>()
  
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AvatarFromValues>({
    resolver: zodResolver(AvatarFormSchema),
  });
  const {
    control: ctr,
    register: reg,
    handleSubmit: had,
    formState: { errors: err, isSubmitting: isSub },
  } = useForm<UpdateFormValues>({
    resolver: zodResolver(UpdateFormSchema),
    values: {
      name: teacher?.name || "",
      dob: new Date(teacher?.dob as Date).toLocaleDateString("en-CA"),
      gender: teacher?.gender || "",
      address: teacher?.address|| "",  
      bank : account?.bank ||"",
      accountbank: account?.accountbank ||""
    },
  });
  
  const now = new Date();
  const dateformat = new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(now);
  const final = dateformat.replace(", ", ", ngày ");
  const signout = useAuthStore((state) => state.signout);
  const onLogout = async () => {
    await signout();
    navigate("/signin");
  };
  const {getMe} = useAuthStore()
  const onUpdate = async (data: AvatarFromValues) => {
    const file = data.avatar[0];
        try {
          await teacherService.patchAvatar(file, teacher?.userid as string);
          await getMe();
          toast.success("Cập nhập ảnh đại diện thành công");
        } catch (error) {
          console.error(error);
          toast.error("Cập nhập ảnh đại diện thất bại ");
        }
  };
  const getAccount = async () =>{
    try {
      const account = await teacherService.getAccountBank(teacher?.userid as string)
      setAccount(account)
    } catch (error) {
      console.error(error);
    }
  }
  const onUpdateInfor = async (data : UpdateFormValues) =>{
    const {name, dob, gender,address,bank,accountbank} = data
      try {
        await teacherService.patchTeacher(teacher?.userid as string,name,new Date(dob),address,gender,bank,accountbank)
        await getMe()
        toast.success("Cập nhập thông tin cá nhân thành công !")
      } catch (error) {
        console.error(error)
        toast.error("Cập nhập thông tin thất bại !")
      }
  }
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
          <button
            className="flex items-center w-full px-4 py-3 text-white/90 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
            onClick={onLogout}
          >
            <LogOut size={20} className="mr-3" />
            <span className="font-medium">Đăng xuất</span>
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 w-full bg-white h-20 px-8 flex justify-between items-center shadow-sm border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{final}</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <Dialog>
                <DialogTrigger asChild>
                  <button onClick={() => getAccount()}>
                    <p className="font-bold text-gray-800 text-sm">
                      {teacher?.name}
                    </p>
                    <p className="text-xs text-gray-500">Giáo viên</p>
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <form className="flex flex-col justify-center items-center gap-3" onSubmit={had(onUpdateInfor)}>
                    <div>
                      <h1 className="text-2xl font-bold">Cập nhập thông tin cá nhân</h1>
                    </div>
                    <div className="w-full">
                      <Label htmlFor="name" className="text-sm block">Họ và tên</Label>
                      <Input type="text" id="name" className="rounded-xl shadow-md" {...reg("name")}/>
                      {err.name && <p className="text-destructive text-sm">{err.name.message}</p>}
                    </div>
                    <div className="w-full">
                      <Label htmlFor="dob" className="text-sm block">Ngày sinh</Label>
                      <Input type="text" id="dob" className="rounded-xl shadow-md" {...reg("dob")}/>
                      {err.dob && <p className="text-destructive text-sm">{err.dob.message}</p>}
                    </div>
                    <div className="w-full">
                      <Label htmlFor="gender" className="text-sm block">Giới tính</Label>
                      <Controller name="gender" control={ctr} defaultValue={teacher?.gender}
                      render={({field}) =>(
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="w-full" {...reg("gender")}>
                          <div className="flex gap-3">
                            <div className="flex items-center gap-2">
                              <RadioGroupItem id="nam" value="Nam"/>
                              <Label htmlFor="nam">Nam</Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <RadioGroupItem id="nu" value="Nữ"/>
                              <Label htmlFor="nu">Nữ</Label>
                            </div>
                          </div>
                        </RadioGroup>
                      )}
                      />
                    </div>
                    <div className="w-full">
                      <Label htmlFor="address" className="text-sm block">Địa chỉ</Label>
                      <Input type="text" id="address" className="rounded-xl shadow-md" {...reg("address")}/>
                      {err.address && <p className="text-destructive text-sm">{err.address.message}</p>}
                    </div>
                    <div className="w-full">
                      <Label htmlFor="bank" className="text-sm block">Tên ngân hàng:</Label>
                      <Input type="text" id="bank" className="rounded-xl shadow-md" {...reg("bank")}/>
                    </div>
                    <div className="w-full">
                      <Label htmlFor="accountbank" className="text-sm block">Số tài khoản:</Label>
                      <Input type="text" id="accountbank" className="rounded-xl shadow-md" {...reg("accountbank")}/>
                    </div>
                    <div>
                      <Button type="submit" disabled={isSub} className="rounded-2xl shadow-md text-white bg-[#05d988] hover:bg-[#006f44] hover:text-white focus:bg-[#05d988]">Cập nhập</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
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
                    <Input
                      type="file"
                      id="avatar"
                      className="rounded-2xl"
                      {...register("avatar")}
                    />
                    {errors.avatar && (
                      <p className="text-destructive text-sm">
                        {errors.avatar.message as string}
                      </p>
                    )}
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
