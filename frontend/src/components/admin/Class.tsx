"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
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
const ClassFormSchema = z.object({
  imageurl: z
    .any()
    .refine((file) => file?.length > 0, {
      message: "Vui lòng tải ảnh đại diện lớp học",
    }),
  name: z.string().min(1, "Tên lớp không được để trống"),
  teacherid: z.string().min(1, "Vui lòng chọn giáo viên"),
  age: z.number("Vui lòng nhập đúng định dạng"),
  members: z.number("Vui lòng nhập đúng định dạng"),
  tuition: z.number("Vui lòng nhập đúng định dạng"),
  schedule: z.string().min(1, "Vui lòng nhập lịch học cho lớp"),
  classtype: z.string(),
});
type Teacher = {
  teacherid: string;
  name: string;
};
type ClassCard = {
  classid: string;
};

type ClassFormValues = z.infer<typeof ClassFormSchema>;
const teachers: Teacher[] = [
  {
    teacherid: "001",
    name: "Nguyen Thi Van",
  },
  {
    teacherid: "002",
    name: "Nguyen Thi Yen",
  },
  {
    teacherid: "003",
    name: "Nguyen Thi Oanh   ",
  },
];
const classes = [
  {
    classid: "001",
    name: "Mam 1",
    age: 3,
    members: 16,
    currentmambers: 12,
    tuition: 1600000,
    teachername: "Nguyen Thi Van",
    teacherid:'001',
    imageurl:
      "https://res.cloudinary.com/dhylrhxsa/image/upload/v1769583472/51758c8655e6dbb882f7_dqoijs.jpg",
  },
  {
    classid: "002",
    name: "Mam 1",
    age: 3,
    members: 16,
    currentmambers: 12,
    tuition: 1600000,
    teacherid:'002',
    teachername: "Nguyen Thi Van",
    imageurl:
      "https://res.cloudinary.com/dhylrhxsa/image/upload/v1769583472/51758c8655e6dbb882f7_dqoijs.jpg",
  },
  {
    classid: "003",
    name: "Mam 1",
    age: 3,
    members: 16,
    currentmambers: 12,
    tuition: 1600000,
    teacherid:'003',
    teachername: "Nguyen Thi Van",
    imageurl:
      "https://res.cloudinary.com/dhylrhxsa/image/upload/v1769583472/51758c8655e6dbb882f7_dqoijs.jpg",
  },
  {
    classid: "004",
    name: "Mam 1",
    age: 3,
    members: 16,
    currentmambers: 12,
    tuition: 1600000,
    teachername: "Nguyen Thi Van",
    teacherid: '004',
    imageurl:
      "https://res.cloudinary.com/dhylrhxsa/image/upload/v1769583472/51758c8655e6dbb882f7_dqoijs.jpg",
  },
];
const Class = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClassFormValues>({
    resolver: zodResolver(ClassFormSchema),
  });
  const {
    register: reg,
    handleSubmit: had,
    formState: { errors: err, isSubmitting: isSub },
  } = useForm<ClassCard>();
  const onSubmit1 = async (data: ClassFormValues) => {};
  const onSubmit2 = async (data: ClassCard) => {};
  const [open, setOpen] = useState(false);
  const [teacherid, setTeacherId] = useState("");
  return (
    <>
      <div className="w-full flex justify-between">
        <h1 className="text-2xl itim-regular">Các lớp học trong hệ thống:</h1>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full    transition all"
              >
                Tạo lớp học
              </Button>
            </DialogTrigger>
            <DialogContent>
              <h1 className="text-2xl font-bold text-center">Tạo lớp học</h1>
              <form
                className="flex flex-wrap mt-2 gap-2"
                onSubmit={handleSubmit(onSubmit1)}
              >
                <div className="w-full">
                  <Label htmlFor="imageurl" className="text-sm block">
                    Ảnh lớp học
                  </Label>
                  <Input
                    type="file"
                    id="imageurl"
                    className="rounded-xl border border-[#000000] shadow-md"
                    placeholder="Ảnh lớp học"
                    {...register("imageurl")}
                  />
                  {errors.imageurl && (
                    <p className="text-destructive text-sm">
                      {errors.imageurl.message as string}
                    </p>
                  )}
                </div>
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
                  <Input
                    type="hidden"
                    id="teacherid"
                    value={teacherid}
                    {...register("teacherid")}
                  />
                  {errors.teacherid && (
                    <p className="text-destructive text-sm">
                      {errors.teacherid.message}
                    </p>
                  )}
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
                        {teacherid
                          ? teachers.find(
                              (teacher: Teacher) =>
                                teacher.teacherid === teacherid,
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
                            {teachers.map((teacher) => (
                              <CommandItem
                                key={teacher.teacherid}
                                value={teacher.teacherid}
                                onSelect={(currentId) => {
                                  setTeacherId(
                                    currentId === teacherid ? "" : currentId,
                                  );
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
                    type="text"
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
                    type="text"
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
                    type="text"
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
        {classes.map((mainclass) => (
          <li>
            <form onSubmit={had(onSubmit2)} className="rounded-xl bg-[#ffffff] shadow-md flex flex-wrap ">
               <Input type="hidden" id="classid" value={mainclass.classid} {...reg("classid")}/>
               <div className="w-full h-25 overflow-hidden mb-3">
                  <img src={mainclass.imageurl} alt="anh lop hoc" className="w-full object-cover"/>
               </div>
               <div className="px-8 gap-4">
      
                     <h2 className="text-md font-bold">Tên lớp: {mainclass.name}</h2>
                     <h2 className="text-md font-bold">Giáo viên: {mainclass.teachername}</h2>
                     <h2 className="text-md font-bold">Độ tuổi: {mainclass.age}</h2>
                     <h2 className="text-md font-bold">Số lượng trẻ: {mainclass.members}</h2>
                     <h2 className="text-md font-bold">Học phí: {mainclass.tuition}</h2>
                     <h2 className="text-md font-bold">Tình trạng: {`${mainclass.currentmambers}/${mainclass.members}`}</h2>
               

               </div>
               <div className="w-full px-8 flex justify-end">
                  <Button type="submit" className="mt-3 mb-3 bg-[#f52121] rounded-2xl shadow-sm hover:bg-[#9E0C0C] focus:bg-[#f52121] transition all" disabled={isSub}>Xóa</Button>
               </div>
            </form>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Class;
