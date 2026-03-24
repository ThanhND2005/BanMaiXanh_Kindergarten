import { useAdminStore } from "@/stores/useAdminStore";
import MenuCard from "./MenuCard";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import {z} from 'zod'
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { toast } from "sonner";
import { adminService } from "@/services/adminService";
import { useTabAdminStore } from "@/stores/useTabStore";

const MenuFormSchema = z.object({
  name : z.string().min(1,"Không được để trống tên món ăn"),
  type: z.string()
})
const StatFormSchema = z.object({
  month : z.coerce.number().min(0,"Tháng không được để trống"),
  year :z.coerce.number().min(0,"Năm không được để trống")
})
type MenuFormValue = z.infer<typeof MenuFormSchema>
type StatFormValue = z.infer<typeof StatFormSchema>
const Menu = () => {
  const menuday = useAdminStore((state) => state.menuday);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const {refreshDishes,refreshStatDish} = useAdminStore()
  const {setTabActive} = useTabAdminStore()
  const {reset,control,register, handleSubmit, formState : {errors, isSubmitting}} = useForm<MenuFormValue>({
    resolver : zodResolver(MenuFormSchema)
  })
  const {reset : re, register: reg, handleSubmit: had,formState:{errors:err, isSubmitting:isSub}} = useForm<StatFormValue>({
    resolver : zodResolver(StatFormSchema)
  })
  const onAdd = async (data : MenuFormValue) =>{
    const {name, type} = data 
    try {
      await adminService.addDish(name,type)
      await refreshDishes()
      toast.success('Thêm món ăn thành công')
    } catch (error) {
      console.error(error)
      toast.error('Thêm món ăn thất bại')
    }
    finally
    {
      reset()
      setOpen(false)
    }

  }
  const onStat = async (data: StatFormValue) =>{
    const {month, year} = data
    try {
      await refreshStatDish(month, year)
      const statdishes = useAdminStore.getState().statdishes
      console.log(statdishes)
      toast.success('Lấy thông tin thành công')
      setTabActive('stat')
    } catch (error) {
      console.error(error)
      toast.error('Thao tác không thành công !')
    }
    finally
    {
      re()
      setOpen2(false)
    }
  }
  return (
    <>
      <div className="w-full flex p-4 gap-8 justify-between items-center">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-[#05d988] mali-bold rounded-2xl shadow-md text-white hover:text-while hover:bg-[#006f44] focus:bg-[#05f988]"
            >
              Thêm món ăn +
            </Button>
          </DialogTrigger>
         
          <DialogContent>
            <h1 className="text-4xl mali-bold text-center">Thêm món ăn</h1>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit(onAdd)}>
              <div >
                <Label htmlFor="name" className="text-sm block mali-bold">Tên món ăn</Label>
                <Input type="text" id="name" className="text-xl rounded-2xl shadow-md" placeholder="Nhập tên món ăn" {...register('name')}/>
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div> 
              <div>
                <Label htmlFor="type" className="text-sm block mali-bold">Loại món ăn</Label>
                <Controller name="type" control={control} defaultValue="1"
                render={({field}) => (
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="w-full" {...register('type')}>
                    <div className="flex gap-3">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="1" id="1"/>
                        <Label htmlFor="1" className="text-sm mali-bold">Món 1</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="2" id="2"/>
                        <Label htmlFor="2" className="text-sm mali-bold">Món 2</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="3" id="3"/>
                        <Label htmlFor="3" className="text-sm mali-bold">Món 3</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="4" id="4"/>
                        <Label htmlFor="4" className="text-sm mali-bold">Món 4</Label>
                      </div>
                    </div>
                    <div className="w-full flex justify-center items-center">
                      <Button type="submit" disabled={isSubmitting} className="w-50 rounded-2xl bg-[#05d988] hover:bg-[#006f44]">Thêm</Button> 
                    </div>
                  </RadioGroup>
                )}/>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        <Dialog open={open2} onOpenChange={setOpen2}>
          <DialogTrigger asChild>
            <Button variant='outline' className="rounded-2xl mali-bold shadow-md text-white bg-[#05d988] hover:text-while hover:bg-[#006f44] focus:bg-[#05d988]">Xem thống kê</Button>
          </DialogTrigger>
          <DialogContent>
            <h1 className="text-4xl mali-bold text-center">Thống kê bữa ăn</h1>
            <form className='flex flex-col gap-3' onSubmit={had(onStat)}> 
                <div>
                  <Label htmlFor="month" className="text-sm mali-bold block">Tháng</Label>
                  <Input id='month' type="number" className="rounded-2xl shadow-md" placeholder="Nhập tháng muốn xem" {...reg('month')}/>
                  {err.month && <p className='text-sm text-destructive'>err.month.message</p>}
                </div>
                <div>
                  <Label htmlFor="year" className="text-sm mali-bold block">Năm</Label>
                  <Input id='year' type="number" className="rounded-2xl shadow-md" placeholder="Nhập tháng muốn xem" {...reg('year')}/>
                  {err.year && <p className='text-sm text-destructive'>err.year.message</p>}
                </div>
                <div className="w-full flex justify-center items-center gap-3">
                  <Button type='submit' disabled={isSub} className="w-50 rounded-2xl mali-bold bg-[#05d988] shadow-md hover:bg-[#006f44]">Xem</Button>
                </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <ul className="grid grid-cols-3 p-4 gap-8">
        {menuday?.map((menu) => (
          <MenuCard key={menu.day} menu={menu} />
        ))}
      </ul>
    </>
  );
};

export default Menu;
