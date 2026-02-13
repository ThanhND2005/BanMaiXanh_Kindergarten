"use client";
import React from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../ui/command";
import ClassCard from "./ClassCard";
import { useAdminStore } from "@/stores/useAdminStore";
import type { Teacher } from "@/types/Teacher";
import { adminService } from "@/services/adminService";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {toast} from 'sonner'
const ClassFormSchema = z.object({
 
  name: z.string().min(1, "Tên lớp không được để trống"),
  teacherid: z.string().min(1, "Giáo viên không được để trống"),
  age: z.coerce.number().min(0,"Tuổi phải lớn hơn 0"),
  members: z.coerce.number().min(0,"Sĩ số phải lớn hơn 0"),
  tuition: z.coerce.number().min(0,"Học phí phải lớn hơn 0"),
  schedule: z.string().min(1, "Vui lòng nhập lịch học cho lớp"),
  classtype: z.string().min(1, "Loại lớp không được để trống"),
});
type ClassFormValues = z.infer<typeof ClassFormSchema>;
const Class = () => {
  const teachers = useAdminStore((state) => state.teachers)?.filter((teacher) => teacher.classid === null)
  const [open, setOpen] = useState(false);

  const {
    reset,
    control,
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClassFormValues>({
    resolver: zodResolver(ClassFormSchema),
    defaultValues :{
      name:"",
      teacherid:"",
      classtype:"Chính khóa",
      schedule:"",
      age:0,
      members:0,
      tuition:0
    }
  });
  const {classes,refreshClasses,refreshTeachers} = useAdminStore()
  const onSubmit1 = async (data: ClassFormValues) => {
    const {name,teacherid,classtype,age,members,tuition,schedule} = data
    try {
      await adminService.postClass(teacherid,age,members,tuition,schedule,name,classtype)
      await refreshClasses()
      await refreshTeachers()
      toast.success('Tạo lớp học thành công !')
    } catch (error) {
      console.error(error)
      toast.error("Tạo lớp học thất bại !")
    }
    finally
    {
      reset()
      setOpen(false)
      
    }
  };
  const selectedTeacherid = watch("teacherid")
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl itim-regular">Các lớp học trong hệ thống:</h1>
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="rounded-2xl shadow-md text-white bg-[#05d988] hover:bg-[#006f44] hover:text-white focus:bg-[#05d988]"
              >
                Tạo lớp học
              </Button>
            </DialogTrigger>
            <DialogContent>
              <h1 className="text-2xl font-bold text-center">Tạo lớp học</h1>
              <form
                className="flex flex-col mt-2 gap-2"
                onSubmit={handleSubmit(onSubmit1)}
              >
                <div className="w-full">
                  <Label htmlFor="name" className="text-sm block">
                    Tên lớp
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    className="rounded-xl border border-[#000000] shadow-md"
                    placeholder="Nhập tên lớp"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <Label htmlFor="teacherid" className="text-sm block">
                    Giáo viên
                  </Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full flex justify-between rounded-xl border border-[#000000] shadow-md"
                      >
                        {selectedTeacherid
                          ? teachers?.find(
                              (teacher: Teacher) =>
                                teacher.userid === selectedTeacherid,
                            )?.name
                          : "Chọn giáo viên"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Command>
                        <CommandList>
                          <CommandEmpty>
                            Không có giáo viên phù hợp
                          </CommandEmpty>
                          <CommandGroup>
                            {teachers?.map((teacher) => (
                              <CommandItem
                                key={teacher.userid}
                                value={teacher.name}
                                onSelect={() => {
              
                                  setValue("teacherid",teacher.userid,{shouldValidate:true})
                                  setOpen(false);
                                }}
                              >
                                {teacher.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="w-full">
                  <Label htmlFor="age" className="text-sm block">
                    Độ tuổi
                  </Label>
                  <Input
                    type="number"
                    id="age"
                    className="rounded-xl border border-[#000000] shadow-md"
                    placeholder="Nhập độ tuổi"
                    {...register("age")}
                  />
                  {errors.age && (
                    <p className="text-destructive text-sm">
                      {errors.age.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <Label htmlFor="members" className="text-sm block">
                    Sổ trẻ
                  </Label>
                  <Input
                    type="number"
                    id="members"
                    className="rounded-xl border border-[#000000] shadow-md"
                    placeholder="Nhập số trẻ tối đa"
                    {...register("members")}
                  />
                  {errors.members && (
                    <p className="text-destructive text-sm">
                      {errors.members.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <Label htmlFor="tuition" className="text-sm block">
                    Học phí
                  </Label>
                  <Input
                    type="number"
                    id="tuition"
                    className="rounded-xl border border-[#000000] shadow-md"
                    placeholder="Nhập học phí"
                    {...register("tuition")}
                  />
                  {errors.tuition && (
                    <p className="text-destructive text-sm">
                      {errors.tuition.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <Label htmlFor="schedule" className="text-sm block">
                    Lịch học
                  </Label>
                  <Input
                    type="text"
                    id="schedule"
                    className="rounded-xl border border-[#000000] shadow-md"
                    placeholder="Mô tả lịch học"
                    {...register("schedule")}
                  />
                  {errors.schedule && (
                    <p className="text-destructive text-sm">
                      {errors.schedule.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <Label htmlFor="classtype" className="text-sm block">Loại lớp học</Label>
                  <Controller name="classtype" control={control} defaultValue="Chính khóa" 
                render={({field}) => (

              <RadioGroup onValueChange={field.onChange} defaultValue={field.value}  className="w-full">
                <div className="flex gap-3">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="Chính khóa" id="main" />
                    <Label htmlFor="main">Chính khóa</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="Năng khiếu" id="extra" />
                    <Label htmlFor="extra">Năng khiếu</Label>
                  </div>
                </div>
              </RadioGroup>
                )}
              />
                </div>
                <div className="w-full flex justify-center">
                  <Button
                    type="submit"
                    className="rounded-2xl bg-[#05D988] hover:bg-[#02B671] focus:bg-[#05D988]  transition all"
                    disabled={isSubmitting}
                  >
                    Tạo lớp học
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <ul className="grid grid-cols-4 gap-8 mt-4">
        {classes?.filter(mainclass => mainclass.type === 'Chính khóa').map((mainclass) => (
          <ClassCard key={mainclass.classid} class1={mainclass}/>
        ))}
      </ul>
      <h2 className="text-2xl itim-regular mt-3">Các lớp học năng khiếu:</h2>
      <ul className="grid grid-cols-4 gap-8">
        {classes?.filter(extraclass => extraclass.type ==='Năng khiếu').map((extraclass) =>(
          <ClassCard key={extraclass.classid} class1={extraclass}/>
        ))}
      </ul>
    </>
  );
};

export default Class;
