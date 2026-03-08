
import { Check, TrendingDown, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import {z} from 'zod'
import {Controller, useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup,RadioGroupItem } from '../ui/radio-group'
import type { Student } from '@/types/Student'
import { useAdminStore } from '@/stores/useAdminStore'
import { studentService } from '@/services/studentService'
import { toast } from 'sonner'
import { useStudentStore } from '@/stores/useStudentStore'

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
  dob : z.string().date("Yêu cầu nhập đúng định dạng YYYY-mm-DD")
})
type UpdateFormValues = z.infer<typeof UpdateFormSchema>
const StudentCard = ({student} : IStudentProps) => {
  const [open, setOpen] = useState(false)
  const [openAvatarForm, setOpenAvatarForm] = useState(false)
  const {reset,control,register, handleSubmit,formState :{errors,isSubmitting}} = useForm({
    resolver : zodResolver(UpdateFormSchema),
    defaultValues:{
        studentid : student.studentid,
        name : student.name,
        gender: student.gender,
        height : student.height,
        weight: student.weight,
        dob : new Date(student.dob).toLocaleDateString('en-CA')
    }
  })
  const {
    reset : resetAvatar,
    register: reg,
    handleSubmit: had,
    formState: { errors: err, isSubmitting: isSub },
  } = useForm<UpdateAvatarValues>({
    resolver: zodResolver(UpdateAvatarSchema),
  });
  const onUpdate = async (data : UpdateFormValues) =>{
      const {name,gender,height,weight,dob} = data
      try {
        await studentService.patchStudent(student.studentid,name,new Date(dob),gender,height,weight)
        await refreshStudents()
        toast.success("Cập nhập thông tin thành công")
      } catch (error) {
        console.error(error)
        toast.error("Cập nhập thông tin thất bại") 
      }
      finally{
        reset() 
        setOpen(false)
      }
  }
  const {refreshStudents} = useAdminStore()
  const onUpdateAvatar = async (data: UpdateAvatarValues) => {
    const file = data.avatarurl[0]
    try {
      await studentService.patchAvatar(student.studentid,file)
      await refreshStudents()
      toast.success("Cập nhập ảnh đại diện thành công")
    } catch (error) {
      console.error(error)
      toast.error("Cập nhập ảnh đại diện thất bại")
    }
    finally
    {
      resetAvatar()
      setOpenAvatarForm(false)
    }
  };
  const {classes,refreshClasses} = useStudentStore()
  const getClass = async (studentid : string) =>{
    await refreshClasses(studentid)
  }
  
  return (
    <div>
      <li className='flex p-4 bg-[#ffffff] rounded-xl shadow-md items-center'>
        <Dialog open={openAvatarForm} onOpenChange={setOpenAvatarForm}>
          <DialogTrigger asChild>
            <div className='h-30 w-30 rounded-full overflow-hidden'>
                <img src={student?.avatarurl} alt="logo" />
            </div>

          </DialogTrigger>
          <DialogContent>
            <h1 className='text-2xl mali-bold text-center'>Cập nhập ảnh đại diện cho bé</h1>
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
            <h1 className='text-2xl mali-bold'> Bé: {student.name}</h1>
            <div className='flex gap-2'>
            <h2 className='text-xl mali-bold'>Chiều cao (m): {student.height}</h2>
              {student.heightChange >=0 ? <div className='flex gap-2 bg-[#15803D] items-center rounded-2xl p-1'>
                <TrendingUp className='h-4 w-4 text-white'/>
                <h1 className='text-md text-white'>{student.heightChange}%</h1>
              </div>:<div className='flex gap-2 bg-[#F52121] rounded-2xl p-1 items-center'>
                <TrendingDown className='h-4 w-4 text-white'/>
                <h1 className='text-md text-white'>{Math.abs(student.heightChange)}%</h1>
              </div>}
            </div>
            <div className='flex gap-2'>
            
            <h2 className='text-xl mali-bold'>Cân nặng (kg): {student.weight}</h2>
              {student.weightChange >=0 ? <div className='flex gap-2 bg-[#15803D] items-center rounded-2xl p-1'>
                <TrendingUp className='h-4 w-4 text-white'/>
                <h1 className='text-md text-white'>{student.weightChange}%</h1>
              </div>:<div className='flex gap-2 bg-[#F52121] rounded-2xl p-1 items-center'>
                <TrendingDown className='h-4 w-4 text-white'/>
                <h1 className='text-md text-white'>{Math.abs(student.weightChange)}%</h1>
              </div>}
            </div>
            {(student.check_in_time === null && student.check_out_time === null)
            ? <div className='flex gap-2 items-center '> 
                <div className='h-5 w-5 bg-[#F52121] rounded-full flex justify-center items-center'>
                    <Check className='h-4 w-4 text-white'/>
                </div>
                <h6 className='text-sm text-[#F52121] mali-bold'>Chưa đến trường</h6>
            </div> : (student.check_out_time === null) ?<div className='flex gap-2 items-center'> 
                <div className='h-5 w-5 bg-[#15803D] rounded-full flex justify-center items-center'>
                    <Check className='h-4 w-4 text-white'/>
                </div>
                <h6 className='text-sm text-[#15803D] mali-bold'>Đã đến trường</h6>
            </div> : <div className='flex gap-2 items-center'> 
                <div className='h-5 w-5 bg-[#EDFF46] rounded-full flex justify-center items-center'>
                    <Check className='h-4 w-4 text-white'/>
                </div>
                <h6 className='text-sm text-[#EDFF46] mali-bold'>Đã được đón</h6>
            </div>}
        </div>
        <div className='flex ml-auto'>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant='outline' className='bg-[#EDFF46] text-white rounded-2xl shadow-md h-30 hover:text-white hover:bg-[#D0E134] focus:bg-[#EDFF46]' onClick={()=>getClass(student.studentid)}>Chỉnh sửa thông tin</Button>
                </DialogTrigger>
                <DialogContent>
                    <form className="flex flex-col justify-center gap-3" onSubmit={handleSubmit(onUpdate)}>
              <h1 className="text-xl mali-bold text-center ">
                Chỉnh sửa thông tin cho học sinh
              </h1>
              <div>
                <Label htmlFor="name" className="text-sm block mali-bold">
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
                <Label htmlFor="dob" className="text-sm block mali-bold">
                  Ngày sinh
                </Label>
                <Input
                  type="text"
                  id="dob"
                  className="rounded-2xl shadow-md p-2"
                  placeholder="Nhập ngày sinh"
                  {...register("dob")}
                />
                {errors.dob && (
                  <p className="text-destructive text-sm">
                    {errors.dob.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="gender" className="text-sm block mali-bold">
                  Giới tính
                </Label>
                <Controller name='gender' control={control} defaultValue={student.gender}
                render={({field}) => (

                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} {...register("gender")}>
                  <div className="flex gap-4">
                    <div className="flex gap-2 items-center">
                      <RadioGroupItem value="Nam" id="Nam" />
                      <Label htmlFor="Nam" className="text-sm">
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
                )}
                />
              </div>
              <div>
                <Label htmlFor="height" className="text-sm block mali-bold">Chiều cao (m)</Label>
                <Input 
                type="number" 
                id="height"
                step="0.01"
                className="rounded-2xl shadow-md p-2"
                
                {...register("height")} />
                {errors.height && <p className="text-destructive text-sm">{errors.height.message}</p>}
              </div>
              <div>
                <Label htmlFor="weight" className="text-sm block mali-bold">Cân nặng (kg)</Label>
                <Input 
                type="number" 
                step="0.01"
                id="weight"
                className="rounded-2xl shadow-md p-2"
                
                {...register("weight")}/>
                {errors.weight && <p className="text-destructive text-sm">{errors.weight.message}</p>}
              </div>
              <div>
                <Label htmlFor='classes' className='text-sm block mali-bold'>Lớp học đang tham gia</Label>
                <ul id= 'classes' className='space-y-2'>
                {classes?.map((class1) =>(
                  <li key={class1.classid}>
                    <Input type='text' className='rounded-2xl shadow-md p-2' value={class1.name} readOnly/>
                  </li>
                ))}

                </ul>
              </div>
              <div className="flex justify-center">

              <Button type="submit" className="rounded-2xl bg-[#05D988] text-[#ffffff] hover:bg-[#006f44] focus:bg-[#05D988] shadow-md w-50" disabled={isSubmitting}>Cập nhập</Button>
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
