
import { Check } from 'lucide-react'
import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup,RadioGroupItem } from '../ui/radio-group'
import type { Student } from '@/types/Student'

interface IStudentProps {
    student : Student
}
const UpdateAvatarSchema = z.object({
  avatarurl: z
    .any()
    .refine((file) => file?.length > 0, {
      message: "Không để trống thông tin",
    }),
});
type UpdateAvatarValues = z.infer<typeof UpdateAvatarSchema>;
const UpdateFormSchema = z.object({
  studentid: z.string().min(1,"Không để trống thông tin"),
  name: z.string().min(1, "Không được để trống thông tin"),
  gender: z.string().min(1, "Không được để trống thông tin"),
  height: z.coerce.number({ message: "Yêu cầu nhập đúng định dạng" }),
  weight: z.coerce.number({ message: "Yêu cầu nhập đúng định dạng" }),
})
type UpdateFormValues = z.infer<typeof UpdateFormSchema>
const StudentCard = ({student} : IStudentProps) => {
  const {register, handleSubmit,formState :{errors,isSubmitting}} = useForm({
    resolver : zodResolver(UpdateFormSchema),
    defaultValues:{
        studentid : student.studentid,
        name : student.name,
        gender: student.gender,
        height : student.height,
        weight: student.height
    }
  })
  const {
    register: reg,
    handleSubmit: had,
    formState: { errors: err, isSubmitting: isSub },
  } = useForm<UpdateAvatarValues>({
    resolver: zodResolver(UpdateAvatarSchema),
  });
  const onUpdate = async (data : UpdateFormValues) =>{

  }
  const onUpdateAvatar = async (data: UpdateAvatarValues) => {};
  return (
    <div>
      <li className='flex p-4 w-200 bg-[#ffffff] rounded-xl shadow-md items-center'>
        <Dialog>
          <DialogTrigger asChild>
            <div className='h-30 w-30 rounded-full overflow-hidden'>
                <img src={student.avatarUrl} alt="logo" />
            </div>

          </DialogTrigger>
          <DialogContent>
            <h1 className='text-2xl font-bold text-center'>Cập nhập ảnh đại diện cho bé</h1>
            <form onSubmit={had(onUpdateAvatar)} className='space-y-3'>
               <Input type='file' id='avatarurl' {...reg("avatarurl")}/>
               {err.avatarurl && <p className='text-destructive text-sm'>{err.avatarurl.message as string}</p>}
               <div className='flex justify-center items-center'>
                <Button type='submit' className='rounded-2xl bg-[#05D988] text-[#ffffff] hover:bg-[#02B671] focus:bg-[#05D988] shadow-md' disabled={isSub}>Cập nhập</Button>
               </div>
            </form>
          </DialogContent>
        </Dialog>
        <div className='flex flex-col ml-20 space-y-2'>
            <h1 className='text-2xl itim-regular'> Bé {student.name}</h1>
            <h2 className='text-xl itim-regular'>Chiều cao: {student.height}</h2>
            <h2 className='text-xl itim-regular'>Cân nặng: {student.weight}</h2>
            {(student.checkin !== null && student.checkout !== null)
            ? <div className='flex gap-2 items-center '> 
                <div className='h-5 w-5 bg-[#EDFF46] rounded-full flex justify-center items-center'>
                    <Check className='h-4 w-4 text-white'/>
                </div>
                <h6 className='text-sm text-[#EDFF46]'>Đã được đón</h6>
            </div> : (student.checkin !== null) ?<div className='flex gap-2 items-center'> 
                <div className='h-5 w-5 bg-[#15803D] rounded-full flex justify-center items-center'>
                    <Check className='h-4 w-4 text-white'/>
                </div>
                <h6 className='text-sm text-[#15803D]'>Đã đến trường</h6>
            </div> : <div className='flex gap-2 items-center'> 
                <div className='h-5 w-5 bg-[#F52121] rounded-full flex justify-center items-center'>
                    <Check className='h-4 w-4 text-white'/>
                </div>
                <h6 className='text-sm text-[#F52121]'>Chưa đến trường</h6>
            </div>}
        </div>
        <div className='flex ml-auto'>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant='outline' className='bg-[#EDFF46] text-white rounded-2xl shadow-md h-30'>Chỉnh sửa thông tin</Button>
                </DialogTrigger>
                <DialogContent>
                    <form className="flex flex-col justify-center gap-3" onSubmit={handleSubmit(onUpdate)}>
              <h1 className="text-xl font-bold text-center">
                Chỉnh sửa thông tin cho học sinh
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
                <RadioGroup defaultValue={student.gender} id="gender">
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
              
              <div className="flex justify-center">

              <Button type="submit" className="rounded-2xl bg-[#05D988] text-[#ffffff] hover:bg-[#02B671] focus:bg-[#05D988] shadow-md w-50" disabled={isSubmitting}>Cập nhập</Button>
              </div>
            </form>

                </DialogContent>
            </Dialog>
        </div>
      </li>
    </div>
  )
}

export default StudentCard
