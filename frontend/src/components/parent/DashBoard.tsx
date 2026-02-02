import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import StudentCard from "./StudentCard";
const students = [
  {
    studentid :'001',
    age:6,
    gender: 'Nữ',
    dob: '01/01/2020',
    name :'Trần Hà Anh',
    height: 0.8,
    weight: 9,
    parentName:'Nguyễn Văn An',
    avatarurl :'https://i.pinimg.com/736x/7d/78/d5/7d78d5e2016f277d6e5174d55e8395ba.jpg',
    date : '2005-01-01',
    checkin :'10:00',
    checkout :'17:00'
  },
  {
    studentid :'002',
    age:6,
    dob: '01/01/2020',
    gender: 'Nữ',
    name :'Nguyễn Vân Anh',
    height: 0.8,
    weight: 9,
    parentName:'Nguyễn Văn An',
    avatarurl:'https://i.pinimg.com/736x/ca/df/db/cadfdb55f90859315a604ff316b775c4.jpg',
    date : '2005-01-01',
    checkin :null,
    checkout :null
  },
  {
    studentid :'003',
    age:6,
    dob: '01/01/2020',
    gender: 'Nữ',
    name :'Nguyễn Thảo Linh',
    height: 0.8,
    weight: 9,
    parentName:'Nguyễn Văn An',
    avatarurl:'https://i.pinimg.com/736x/3f/0c/ae/3f0cae6ef757529c0ad31a255879a07e.jpg',
    date : '2005-01-01',
    checkin :'10:00',
    checkout :null
  },
  {
    studentid :'004',
    age:6,
    dob: '01/01/2020',
    gender: 'Nữ',
    name :'Phạm Bảo Hân',
    height: 0.8,
    weight: 9,
    parentName:'Nguyễn Văn An',
    avatarurl: 'https://i.pinimg.com/736x/4b/9e/de/4b9ede583bcba788cffe46beaad3cb58.jpg',
    date : '2005-01-01',
    checkin :'10:00',
    checkout :'17:00'
  },
]
const RegisterFormSchema = z.object({
  name: z.string().min(1, "Không được để trống thông tin"),
  gender: z.string().min(1, "Không được để trống thông tin"),
  dob: z.string().date("Yêu cầu nhập đúng định dạng"),
  height: z.coerce.number({ message: "Yêu cầu nhập đúng định dạng" }),
  weight: z.coerce.number({ message: "Yêu cầu nhập đúng định dạng" }),
  avatarurl: z
    .any()
    .refine((file) => file?.length > 0, {
      message: "Yêu cầu nộp ảnh đại diện cho bé",
    }),
});
type RegisterFormValues = z.infer<typeof RegisterFormSchema>
const DashBoard = () => {
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(RegisterFormSchema),
  });
  const onCreate = async (data : RegisterFormValues) =>{

  }
  return (
    <div className="p-4 space-y-4">
      <div className="w-full flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="rounded-2xl bg-[#05D988] text-[#ffffff] hover:bg-[#02B671] focus:bg-[#05D988] shadow-md"
            >
              Đăng ký thông tin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form className="flex flex-col justify-center gap-3" onSubmit={handleSubmit(onCreate)}>
              <h1 className="text-xl font-bold text-center">
                Đăng ký thông tin cho học sinh
              </h1>
              <div>
                <Label htmlFor="name" className="text-sm block">
                  Họ và tên
                </Label>
                <Input
                  type="text"
                  id="name"
                  className="rounded-2xl shadow-md p-2"
                  placeholder="Nhập họ và tên"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-destructive text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>
    
              <div>
                <Label htmlFor="gender" className="text-sm block">
                  Giới tính
                </Label>
                <RadioGroup defaultValue="Nam" id="gender">
                  <div className="flex gap-4">
                    <div className="flex gap-2 items-center">
                      <RadioGroupItem value="Nam" id="Nam" />
                      <Label htmlFor="Name" className="text-sm">
                        Nam
                      </Label>
                    </div>
                    <div className="flex gap-2 items-center">
                      <RadioGroupItem value="Nữ" id="Nu" />
                      <Label htmlFor="Nu" className="text-sm">
                        Nữ
                      </Label>
                    </div>

                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="dob" className="text-sm block">
                  Ngày sinh
                </Label>
                <Input
                  type="text"
                  id="dob"
                  className="rounded-2xl shadow-md p-2"
                  placeholder="Nhập ngày sinh"
                  {...register("dob")}
                />
                {errors.dob && <p className="text-destructive text-sm">{errors.dob.message}</p>}
              </div>
              <div>
                <Label htmlFor="height" className="text-sm block">Chiều cao</Label>
                <Input 
                type="text" 
                id="height"
                className="rounded-2xl shadow-md p-2"
                placeholder="Nhập chiều cao"
                {...register("height")}/>
                {errors.height && <p className="text-destructive text-sm">{errors.height.message}</p>}
              </div>
              <div>
                <Label htmlFor="weight" className="text-sm block">Cân nặng</Label>
                <Input 
                type="text" 
                id="weight"
                className="rounded-2xl shadow-md p-2"
                placeholder="Nhập cân nặng"
                {...register("weight")}/>
                {errors.weight && <p className="text-destructive text-sm">{errors.weight.message}</p>}
              </div>
              <div>
                <Label htmlFor="avatarurl" className="text-sm block">Ảnh của bé</Label>
                <Input type="file" 
                id="avatarurl"
                className="rounded-2xl shadow-md " {...register("avatarurl")}/>
                {errors.avatarurl && <p className="text-destructive text-sm">{errors.avatarurl.message as string}</p>}
              </div>
              <div className="flex justify-center">

              <Button type="submit" className="rounded-2xl bg-[#05D988] text-[#ffffff] hover:bg-[#02B671] focus:bg-[#05D988] shadow-md w-50" disabled={isSubmitting}>Đăng ký</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <ul className="space-y-4">
        {students.map((student) =>(
          <StudentCard key={student.studentid} student={student}/>
        ))}
      </ul>

    </div>
  );
};

export default DashBoard;
