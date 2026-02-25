import React, { useState } from "react";
import { Check } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import type { StudentBill } from "@/types/store";
import { adminService } from "@/services/adminService";
import { useAdminStore } from "@/stores/useAdminStore";
import { parentService } from "@/services/parentService";
import { toast } from "sonner";

interface ITuitionCard {
  tuition: StudentBill;
}
const ComfirmFormSchema = z.object({
  tuitionid: z.string(),
  billImage: z
    .any()
    .refine((file) => file?.length > 0, {
      message: "Không được để trống thông tin",
    }),
});
type ComfirmFormValues = z.infer<typeof ComfirmFormSchema>;
const TuitionCard = ({ tuition }: ITuitionCard) => {
  console.log(tuition.status);
  const [open,setOpen] = useState(false)
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting},
  } = useForm<ComfirmFormValues>({
    resolver: zodResolver(ComfirmFormSchema),
    defaultValues: {
      tuitionid: tuition.tuitionid,
    },
  });
  const { refreshStudentBills } = useAdminStore();
  const onSubmit = async (data: ComfirmFormValues) => {
    const file = data.billImage[0];
    const { tuitionid } = data;
    try {
      await parentService.patchStudentBill(tuitionid, file);
      await refreshStudentBills();
      toast.success("Gửi hóa đơn thành công !");
    } catch (error) {
      console.error(error);
      toast.error("Gửi hóa đơn thất bại !");
    }
    finally
    {
        reset()
        setOpen(false)
    }
  };
  return (
    <div>
      <li className="flex py-4 px-10 bg-white rounded-2xl shadow-md">
        <div className="flex flex-col space-y-1">
          <h2 className="text-2xl itim-regular"> Tháng {tuition.month}</h2>
          <h2 className="text-xl itim-regular"> Bé: {tuition.studentName}</h2>
          <h2 className="text-xl itim-regular"> Lớp: {tuition.className}</h2>
          <h2 className="text-xl itim-regular">
            {" "}
            Số ngày đi học: {tuition.attendance}
          </h2>
          <h2 className="text-4xl itim-regular text-[#FB3C1A]">
            {" "}
            Học phí: {tuition.tuition} vnđ
          </h2>
          {tuition.status !== null ? (
            <div className="flex gap-2">
              <div className="h-5 w-5 bg-[#15803D] rounded-full flex justify-center items-center">
                <Check className="h-4 w-4 text-white" />
              </div>
              <h6 className="text-sm text-[#15803D]">Đã hoàn thành</h6>
            </div>
          ) : (
            <div className="flex gap-2">
              <div className="h-5 w-5 bg-[#EDFF46] rounded-full flex justify-center items-center">
                <Check className="h-4 w-4 text-white" />
              </div>
              <h6 className="text-sm text-[#EDFF46]">Đang thực hiện</h6>{" "}
            </div>
          )}
        </div>
        <div className="flex flex-col items-center space-y-2  ml-auto">
          <div className="h-40 w-30 rounded-xl overflow-hidden ">
            <Dialog>
              <DialogTrigger asChild>
                <img src={tuition.qrurl} alt="qr" className="object-cover" />
              </DialogTrigger>
              <DialogContent className="flex justify-center items-center">
                <img src={tuition.qrurl} alt="qr" className="object-fit h-[80%] w-[80%]" />
              </DialogContent>
            </Dialog>
          </div>
          <div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-2xl bg-[#05D988] text-[#ffffff] hover:bg-[#006f44] hover:text-white focus:bg-[#05D988] shadow-md"
                >
                  Gửi hóa đơn
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form
                  className="flex flex-col justify-center space-y-2"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Label htmlFor="billurl" className="text-sm block">
                    Ảnh hóa đơn
                  </Label>
                  <Input
                    type="file"
                    id="billurl"
                    className="rounded-xl shadow-md"
                    {...register("billImage")}
                  />
                  {errors.billImage && (
                    <p className="text-destructive text-sm">
                      {errors.billImage.message as string}
                    </p>
                  )}
                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      className="w-40 rounded-2xl bg-[#05D988] text-[#ffffff] hover:bg-[#02B671] focus:bg-[#05D988] shadow-md"
                    >
                      Gửi
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </li>
    </div>
  );
};

export default TuitionCard;
