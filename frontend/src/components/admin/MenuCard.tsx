import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import {
  Beef,
  ChevronsUpDown,
  CookingPot,
  IceCreamBowl,
  Soup,
  Check,
} from "lucide-react";
import type { Menu } from "@/types/store";
import { useAdminStore } from "@/stores/useAdminStore";
import { adminService } from "@/services/adminService";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

interface IMenuProps {
  menu: Menu;
}

const MenuFormSchema = z.object({
  day: z.number(),
  dish1: z.string().min(1, "Không được để trống món ăn"),
  dish2: z.string().min(1, "Không được để trống món ăn"),
  dish3: z.string().min(1, "Không được để trống món ăn"),
  dish4: z.string().min(1, "Không được để trống món ăn"),
});

type MenuFormValues = z.infer<typeof MenuFormSchema>;


const MenuCard = ({ menu }: IMenuProps) => {
  const dishes = useAdminStore((state) => state.dishes)
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<MenuFormValues>({
    resolver: zodResolver(MenuFormSchema),
    defaultValues: {
      day: menu.day,
      dish1: menu.dish1,
      dish2: menu.dish2,
      dish3: menu.dish3,
      dish4: menu.dish4,
    },
  }); 

  const currentDish1 = watch("dish1");
  const currentDish2 = watch("dish2");
  const currentDish3 = watch("dish3");
  const currentDish4 = watch("dish4");

  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const { refreshMenu } = useAdminStore();

  const onUpdate = async (data: MenuFormValues) => {
    try {
      await adminService.patchMenu(
        data.day,
        data.dish1,
        data.dish2,
        data.dish3,
        data.dish4,
      );
      await refreshMenu();
      toast.success("Cập nhập menu thành công!");
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Cập nhập menu thất bại!");
    }
  };

  return (
    <div>
      <li>
        <div
          className={` rounded-xl shadow-md flex flex-col justify-center p-8`}
          style={{ backgroundColor: menu.color }}
        >
          <div>
            <h1 className="text-4xl text-center mali-bold">Thứ {menu.day}</h1>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl mali-semibold">{menu.dish1}</h2>
              <CookingPot className="h-6 w-6 text-gray-500" />
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl mali-semibold">{menu.dish2}</h2>
              <Soup className="h-6 w-6 text-gray-500" />
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl mali-semibold">{menu.dish3}</h2>
              <IceCreamBowl className="h-6 w-6 text-gray-500" />
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl mali-semibold">{menu.dish4}</h2>
              <Beef className="h-6 w-6 text-gray-500" />
            </div>
          </div>

          <div className="flex justify-center">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-2xl bg-[#05D988] text-[#ffffff] mt-4 hover:bg-[#006f44] hover:text-white focus:bg-[#05D988]"
                >
                  Chỉnh sửa
                </Button>
              </DialogTrigger>
              <DialogContent>
                <div className="flex justify-center">
                  <h1 className="text-4xl mali-bold">Thứ {menu.day}</h1>
                </div>
                <form
                  className="flex flex-wrap justify-center gap-3"
                  onSubmit={handleSubmit(onUpdate)}
                >
                  <div className="w-full flex flex-col gap-1">
                    <Label htmlFor="dish1" className="text-sm block mali-bold">
                      Món 1
                    </Label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="justify-between"
                        >
                          {currentDish1 ? currentDish1 : "Chọn món ..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandList>
                            <CommandEmpty>
                              Không tìm thấy món ăn nào.
                            </CommandEmpty>
                            <CommandGroup>
                              {dishes?.filter((t)=> t.type === 1)?.map((dish) => (
                                <CommandItem
                                  key={dish.dishid}                                
                                  value={dish.dishid}
                                  onSelect={(currentValue) => {
                                    
                                    const selectedDish = dishes.filter((t)=> t.type === 1).find(
                                      (d) => d.dishid === currentValue,
                                    );

                                    if (selectedDish) {
                                      
                                      setValue("dish1", selectedDish.name, {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                      });
                                    }
                                    setOpen(false);
                                  }}
                                >
                                  {dish.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {errors.dish1 && (
                      <p className="text-destructive text-sm">
                        {errors.dish1.message}
                      </p>
                    )}
                  </div>

              
                  <div className="w-full flex flex-col gap-1">
                    <Label htmlFor="dish2" className="text-sm block mali-bold">
                      Món 2
                    </Label>
                    <Popover open={open2} onOpenChange={setOpen2}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open2}
                          className="justify-between"
                        >
                          {currentDish2 ? currentDish2 : "Chọn món ..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandList>
                            <CommandEmpty>
                              Không tìm thấy món ăn nào.
                            </CommandEmpty>
                            <CommandGroup>
                              {dishes?.filter((t) => t.type === 2)?.map((dish) => (
                                <CommandItem
                                  key={dish.dishid}
                                  
                                  value={dish.dishid}
                                  onSelect={(currentValue) => {
                                    
                                    const selectedDish = dishes?.filter((t) => t.type === 2).find(
                                      (d) => d.dishid === currentValue,
                                    );

                                    if (selectedDish) {
                                      
                                      setValue("dish2", selectedDish.name, {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                      });
                                    }
                                    setOpen2(false);
                                  }}
                                >
                                  {dish.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {errors.dish2 && (
                      <p className="text-destructive text-sm">
                        {errors.dish2.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <Label htmlFor="dish3" className="text-sm block mali-bold">
                      Món 3
                    </Label>
                    <Popover open={open3} onOpenChange={setOpen3}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open3}
                          className="justify-between"
                        >
                          {currentDish3 ? currentDish3 : "Chọn món ..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>                       
                          <CommandList>
                            <CommandEmpty>
                              Không tìm thấy món ăn nào.
                            </CommandEmpty>
                            <CommandGroup>
                              {dishes?.filter((t) => t.type === 3)?.map((dish) => (
                                <CommandItem
                                  key={dish.dishid}
                                  
                                  value={dish.dishid}
                                  onSelect={(currentValue) => {
                                    
                                    const selectedDish = dishes?.filter((t) => t.type === 3).find(
                                      (d) => d.dishid === currentValue,
                                    );

                                    if (selectedDish) {
                                      
                                      setValue("dish3", selectedDish.name, {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                      });
                                    }
                                    setOpen3(false);
                                  }}
                                >
                                  {dish.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {errors.dish3 && (
                      <p className="text-destructive text-sm">
                        {errors.dish3.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <Label htmlFor="dish4" className="text-sm block mali-bold">
                      Món 4
                    </Label>
                    <Popover open={open4} onOpenChange={setOpen4}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open4}
                          className="justify-between"
                        >
                          {currentDish4 ? currentDish4 : "Chọn món ..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          
                          <CommandList>
                            <CommandEmpty>
                              Không tìm thấy món ăn nào.
                            </CommandEmpty>
                            <CommandGroup>
                              {dishes?.filter((t) => t.type === 4)?.map((dish) => (
                                <CommandItem
                                  key={dish.dishid}
                                  
                                  value={dish.dishid}
                                  onSelect={(currentValue) => {
                                    
                                    const selectedDish = dishes?.filter((t) => t.type === 4).find(
                                      (d) => d.dishid === currentValue,
                                    );

                                    if (selectedDish) {
                                      
                                      setValue("dish4", selectedDish.name, {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                      });
                                    }
                                    setOpen4(false);
                                  }}
                                >
                                  {dish.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {errors.dish4 && (
                      <p className="text-destructive text-sm">
                        {errors.dish4.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex justify-center mt-2">
                    <Button
                      type="submit"
                      className="rounded-2xl bg-[#05D988] text-[#ffffff] hover:bg-[#006f44] focus:bg-[#05D988]"
                      disabled={isSubmitting}
                    >
                      Cập nhật
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

export default MenuCard;
