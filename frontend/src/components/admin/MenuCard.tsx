import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Utensils,UtensilsCrossed } from "lucide-react";
import type { Menu } from '@/types/store'
import { useAdminStore } from "@/stores/useAdminStore";
import { adminService } from "@/services/adminService";
import {toast} from 'sonner'
interface IMenuProps {
    menu : Menu
}

const MenuFormSchema = z.object({
  day: z.number(),
  dish1: z.string().min(1, "Không được để trống món ăn"),
  dish2: z.string().min(1, "Không được để trống món ăn"),
  dish3: z.string().min(1, "Không được để trống món ăn"),
  dish4: z.string().min(1, "Không được để trống món ăn"),
});
type MenuFormValues = z.infer<typeof MenuFormSchema>;

const MenuCard = ({menu} : IMenuProps) => {
    const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MenuFormValues>({
    resolver: zodResolver(MenuFormSchema),
    defaultValues:{
        day : menu.day,
        dish1 : menu.dish1,
        dish2 : menu.dish2,
        dish3 : menu.dish3,
        dish4 : menu.dish4,

    }
  });
  const [isOpen, setIsOpen] = useState(false)
  const {refreshMenu} = useAdminStore()
  const onUpdate = async (data: MenuFormValues) => {
    const {day,dish1,dish2,dish3,dish4} = data
    try {
      await adminService.patchMenu(day,dish1,dish2,dish3,dish4)
      await refreshMenu()
      toast.success("Cập nhập menu thành công !")
    } catch (error) {
      console.error(error)
      toast.error("Cập nhập menu thất bại !")
    }
    finally{
      reset()
      setIsOpen(false)
    }
  };
  return (
    <div>
      <li>
            <div className="bg-[#ffffff] rounded-xl shadow-md flex flex-col justify-center p-8">
              <div>
                <h1 className="text-4xl font-bold text-center">
                  Thứ {menu.day}
                </h1>
              </div>
              <div>
                <h2 className="text-2xl font-bold ">Bữa trưa:</h2>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl ">{menu.dish1}</h2>
                  <Utensils className="h-6 w-6 text-gray-500" />
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl ">{menu.dish2}</h2>
                  <UtensilsCrossed className="h-6 w-6 text-gray-500" />
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl ">{menu.dish3}</h2>
                  <Utensils className="h-6 w-6 text-gray-500" />
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl ">{menu.dish4}</h2>
                  <UtensilsCrossed className="h-6 w-6 text-gray-500" />
                </div>
              </div>
              <div className="flex justify-center">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="rounded-2xl bg-[#05D988] text-[#ffffff] mt-4 hover:bg-[#05C27A] hover:text-white focus:bg-[#05D988]"
                    >
                      Chỉnh sửa
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <div className="flex justify-center">
                      <h1 className="text-4xl font-bold">Thứ {menu.day}</h1>
                    </div>
                    <form
                      className="flex flex-wrap justify-center gap-3"
                      onSubmit={handleSubmit(onUpdate)}
                    >
                     
                      <div className="w-full">
                        <Label htmlFor="dish1" className="text-sm block">
                          Món 1
                        </Label>
                        <Input
                          type="text"
                          id="dish1"
                          placeholder={menu.dish1}
                          {...register("dish1")}
                        />
                        {errors.dish1 && (
                          <p className="text-destructive text-sm">
                            {errors.dish1.message}
                          </p>
                        )}
                      </div>
                      <div className="w-full">
                        <Label htmlFor="dish2" className="text-sm block">
                          Món 2
                        </Label>
                        <Input
                          type="text"
                          id="dish2"
                          placeholder={menu.dish2}
                          {...register("dish2")}
                        />
                        {errors.dish2 && (
                          <p className="text-destructive text-sm">
                            {errors.dish2.message}
                          </p>
                        )}
                      </div>
                      <div className="w-full">
                        <Label htmlFor="dish3" className="text-sm block">
                          Món 3
                        </Label>
                        <Input
                          type="text"
                          id="dish3"
                          placeholder={menu.dish3}
                          {...register("dish3")}
                        />
                        {errors.dish3 && (
                          <p className="text-destructive text-sm">
                            {errors.dish3.message}
                          </p>
                        )}
                      </div>
                      <div className="w-full">
                        <Label htmlFor="dish4" className="text-sm block">
                          Món 4
                        </Label>
                        <Input
                          type="text"
                          id="dish1"
                          placeholder={menu.dish4}
                          {...register("dish4")}
                        />
                        {errors.dish4 && (
                          <p className="text-destructive text-sm">
                            {errors.dish4.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Button
                          type="submit"
                          className="bg-[#05D988] text-[#ffffff] mt-4 hover:bg-[#05C27A] focus:bg-[#05D988]"
                          disabled={isSubmitting}
                        >
                          Cập nhập
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </li>
    </div>
  )
}

export default MenuCard
