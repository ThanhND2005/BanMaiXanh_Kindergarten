import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
interface Teacher{
    userid : string, 
    name : string, 
    exp : number,
    gender: string,
    phone : string, 
    age: number,
    classname: string,
    avatarurl: string,
}
interface ITeacherProps {
  teacher : Teacher
}
const NotificationFormSchema = z.object({
  senderid: z.string(),
  receiverid: z.string(),
  title : z.string().min(1,"Tiêu đề không được để trống"),
  content : z.string().min(1,"Nội dung không được để trống"),
})
type NotificationFormValues = z.infer<typeof NotificationFormSchema>
const parent = {
  userid : '001'
}
const TeacherCard = ({teacher} : ITeacherProps) => {
  const {register : reg ,handleSubmit :had, formState :{errors :err, isSubmitting: isSub}} = useForm<NotificationFormValues>({
        resolver : zodResolver(NotificationFormSchema),
        defaultValues : {
          senderid : parent.userid,
          receiverid: teacher.userid,
        }
      })
  const onSubmit = async (data : NotificationFormValues) =>{

  }
  return (
    <div>
      <li className='bg-white rounded-xl py-4 px-10 flex w-full shadow-md'>
          <div className='flex flex-col gap-3'>
            <h2 className='text-4xl itim-regular'>{teacher.name}</h2>
            <h2 className='text-2xl itim-regular'>Lớp: {teacher.classname}</h2>
            <h2 className='text-2xl itim-regular'>Kinh nghiệm: {teacher.exp}</h2>
            <h2 className='text-2xl itim-regular'>Số điện thoại: {teacher.phone}</h2>
            <h2 className='text-2xl itim-regular'>Tuổi: {teacher.age}</h2>
          </div>
          <div className='flex flex-col items-center justify-center ml-auto gap-3'>
            <div className='h-30 w-30 rounded-full overflow-hidden'>
              <img src={teacher.avatarurl} alt="avtar" />
            </div>
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant='outline' className='rounded-2xl bg-[#1271BF] text-[#ffffff] hover:bg-[#0A5694] focus:bg-[#1271BF]'>Kết nối</Button>
                </DialogTrigger>
                <DialogContent>
                  <h2 className='text-2xl itim-regular '>Phụ huynh nhớ nhập đầy đủ nội dung nhé !</h2>
                  <form className='flex flex-col justify-center p-4 gap-3'onSubmit={had(onSubmit)} >
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
      </li>
    </div>
  )
}

export default TeacherCard
