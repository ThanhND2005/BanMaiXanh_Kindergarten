import { useTeacherStore } from '@/stores/useTeacherStore'
import React, { useState } from 'react'
import { z} from 'zod'
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import type { Student } from '@/types/Student'
import { useAdminStore } from '@/stores/useAdminStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { teacherService } from '@/services/teacherService'
import { toast } from 'sonner'

interface StudentItemProps {
  student: Student
}
const UpdateFormSchema = z.object({
  studentid : z.string(),
  height : z.coerce.number({message :"Yêu cầu nhập đúng định dạng số"}),
  weight : z.coerce.number({message :"Yêu cầu nhập đúng định dạng số"})
})
const NotificationFormSchema = z.object({
  senderid: z.string(),
  receiverid: z.string(),
  title : z.string().min(1,"Tiêu đề không được để trống"),
  content : z.string().min(1,"Nội dung không được để trống"),
})

type UpdateFormValues = z.infer<typeof UpdateFormSchema>
type NotificationFormValues  = z.infer<typeof NotificationFormSchema>
const StudentItem = ({student} : StudentItemProps) => {
  const user = useAuthStore.getState().user
  const [open, setOpen] = useState(false)
  const teacher = useAdminStore((state) => state.teachers)?.find((t) => t.userid === user?.userid)
  const {register, handleSubmit, formState :{errors, isSubmitting}} = useForm({
      resolver : zodResolver(UpdateFormSchema),
      defaultValues :{
        studentid : student.studentid,
      }
    })
    const {register : reg ,handleSubmit :had, formState :{errors :err, isSubmitting: isSub}} = useForm<NotificationFormValues>({
      resolver : zodResolver(NotificationFormSchema),
      defaultValues : {
        senderid : teacher?.userid,
        receiverid: student.parentid,
      }
    })
    const {refreshStudents} = useTeacherStore()
    const onUpdate = async (data : UpdateFormValues) =>{
      const {studentid,height,weight} = data
      try {
        await teacherService.patchStudent(studentid,height,weight)
        await refreshStudents(teacher?.userid as string)
        toast.success("Cập nhập thông tin thành công")
        setOpen(false)
      } catch (error) {
        console.error(error)
        toast.error("Cập nhập thông tin thất bại")
      }
    }
    const onNotify = async (data : NotificationFormValues) => {
        const {senderid,receiverid,title,content} = data
        try {
          await teacherService.postNotification(senderid,receiverid,content,title)
          toast.success("Gửi thông báo thành công")
          setOpen(false)
        } catch (error) {
          console.error(error)
          toast.error("Gửi thông báo thất bại")
        }
    }
    const onDelete = async (studentid : string, classid: string) =>{
      try {
        await teacherService.deleteStudent(studentid,classid)
        await refreshStudents(teacher?.userid as string)
        toast.success("Xóa học sinh thành công")
      } catch (error) {
        console.error(error)
        toast.error("Xóa học sinh thất bại")
      }
    }
    const onCheckin = async (studentid : string) => {
      try {
        await teacherService.postCheckin(studentid,teacher?.classid as string)
        await refreshStudents(teacher?.userid as string)
        toast.success("Ckeck in thành công")
      } catch (error) {
        console.error(error)
        toast.error("Check in thất bại")
      }
    }
    const onCheckout = async (attendanceid : string) => {
      try {
        await teacherService.postCheckout(attendanceid)
        await refreshStudents(teacher?.userid as string)
        toast.success("Check out thành công")
      } catch (error) {
        console.error(error)
        toast.error("Check out thất bại")
      }
    }
  return (
    <div>
      <li className='flex p-3 bg-[#ffffff] rounded-xl shadow-md space-x-10' key={student.studentid} >
            <div className='flex justify-start w-40'>
              <div className='flex flex-wrap justify-center space-y-3 '>
                <div className='h-20 w-20 rounded-full overflow-hidden'>
                  <img src={student.avatarurl} alt="avatar" className='w-full object-cover' />
                </div>
                <div className='w-full flex justify-center'>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button variant='outline' className='bg-[#F2F20E] rounded-xl shadow-sm'>Chỉnh sửa</Button>
                    </DialogTrigger>
                    <DialogContent >
                      <form className='grid grid-cols-3 p-2' onSubmit={handleSubmit(onUpdate)}>
                        <div className='flex justify-center w-20 items-center '>
                          <div className='h-20 w-20 rounded-full overflow-hidden'>
                            <img src={student.avatarurl} alt="avatar" className='w-full h-auto object-cover'/>
                          </div>
                        </div>
                        <div>
                          <h2 className='text-xl font-bold mb-1'>{student.name}</h2>
                          <div className='items-center gap-2 mb-1'>
                            <h2 className='text-sm font-bold whitespace-nowrap' >Chiều cao:</h2>
                            <Input type='text' id='height' className='rounded-xl shadow-md' {...register("height")}/>
                            {errors.height && <p className='text-destructive text-sm'>{errors.height.message}</p>}
                          </div>
                          <div className='items-center gap-2 mb-1'>
                            <h2 className='text-sm font-bold whitespace-nowrap' >Cân nặng:</h2>
                            <Input type='text' id='weight' className='rounded-xl shadow-md' {...register("weight")}/>
                            {errors.weight && <p className='text-destructive text-sm'>{errors.weight.message}</p>}
                          </div>
                
                        </div>
                        <div className='flex justify-end items-center'>
                          <Button type='submit' className='h-20 bg-[#2E7D32] rounded-xl shadow-md' disabled={isSubmitting}>Cập nhập</Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className='w-full flex justify-center'>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button variant='outline' className='w-24 bg-[#67CFFC] rounded-xl shadow-md'>Kết nối</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <form onSubmit={had(onNotify)} className='space-y-2'>
                        <h1 className='text-xl font-bold text-center'>Các thầy cô nhập đủ thông tin nhé !</h1>
                        <div >
                          <Label htmlFor='title' className='text-sm block'>Tiêu đề</Label>
                          <Input type='text' id='title' className='rounded-xl shadow-sm' {...reg("title")}/>
                          {err.title && <p className='text-destructive text-sm'>{err.title.message}</p>}
                        </div>
                        <div >
                          <Label htmlFor='content' className='text-sm block'>Nội dung</Label>
                          <Input type='text' id='content' className='rounded-xl shadow-sm' {...reg("content")}/>
                          {err.content && <p className='text-destructive text-sm'>{err.content.message}</p>}
                        </div>
                        <div className='flex justify-center'>
                          <Button type='submit' className='rounded-xl shadow-md bg-[#2E7D32]' disabled={isSub}>Gửi</Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
            <div className='flex flex-wrap space-y-2 items-center'>
                <h1 className='text-2xl font-bold w-full'>{student.name}</h1>
                <h2 className='text-xl font-bold w-full'>Chiều cao: {student.height} m</h2>
                <h2 className='text-xl font-bold w-full'>Cân nặng: {student.weight} kg</h2>
                <h2 className='text-xl font-bold w-full'>Họ tên phụ huynh: {student.parentname}</h2>
            </div>
            <div className='flex flex-col justify-center px-4  space-y-3'>
                <Button type='button' onClick={() => onCheckin(student.studentid)} className={`${student.check_in_time === null ? 'bg-[#ffffff] text-[#828282]' : 'bg-[#2E7D32]'} rounded-xl shadow-md `}>Đã đến</Button>
                <Button type='button' onClick={() => onCheckout(student.attendanceid)} className={`${student.check_out_time === null ? 'bg-[#ffffff] text-[#828282]' : 'bg-[#2E7D32]'} rounded-xl shadow-md `}>Đã về</Button>
                <Button type='button' onClick={() => onDelete(student.studentid,teacher?.classid as string)} className={`bg-[#FB3C1A] rounded-xl shadow-md`}>Xóa</Button>
            </div>
          </li>
    </div>
  )
}

export default StudentItem
