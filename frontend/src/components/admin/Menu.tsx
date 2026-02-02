import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Utensils,UtensilsCrossed } from "lucide-react";

const MenuFormSchema = z.object({
  day: z.number(),
  dish1: z.string().min(1, "Không được để trống món ăn"),
  dish2: z.string().min(1, "Không được để trống món ăn"),
  dish3: z.string().min(1, "Không được để trống món ăn"),
  dish4: z.string().min(1, "Không được để trống món ăn"),
});
type MenuFormValues = z.infer<typeof MenuFormSchema>;
const menuday = [
  {
    day: 2,
    dish1: "Cơm trắng",
    dish2: "Thịt băm rang",
    dish3: "Canh bí đỏ",
    dish4: "Rau cải luộc",
  },
  {
    day: 3,
    dish1: "Cơm trắng",
    dish2: "Thịt bò xào",
    dish3: "Canh rau cải",
    dish4: "Rau cải luộc",
  },
  {
    day: 4,
    dish1: "Cơm trắng",
    dish2: "Thịt lợn luộc",
    dish3: "Canh rau ngót",
    dish4: "Táo",
  },
  {
    day: 5,
    dish1: "Cơm trắng",
    dish2: "Trứng chiên",
    dish3: "Canh xương hầm",
    dish4: "Sữa chua",
  },
  {
    day: 6,
    dish1: "Cơm trắng",
    dish2: "Thịt vịt luộc",
    dish3: "Canh cà chua",
    dish4: "Táo",
  },
];
const Menu = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MenuFormValues>({
    resolver: zodResolver(MenuFormSchema),
  });
  const onSumit = async (data: MenuFormValues) => {};
  return (
    <>
      <ul className="grid grid-cols-3 p-4 gap-8">
        {menuday.map((menu) => (
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="rounded-2xl bg-[#05D988] text-[#ffffff] mt-4 hover:bg-[#05C27A] focus:bg-[#05D988]"
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
                      onSubmit={handleSubmit(onSumit)}
                    >
                      <Input type="hidden" value={menu.day} id="day" />
                      <div className="w-full">
                        <Label htmlFor="dish1" className="text-sm block">
                          Món 1
                        </Label>
                        <Input
                          type="text"
                          id="dish1"
                          placeholder="Nhập món 1"
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
                          placeholder="Nhập món 2"
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
                          placeholder="Nhập món 3"
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
                          placeholder="Nhập món 4"
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
        ))}
      </ul>
    </>
  );
};

export default Menu;
