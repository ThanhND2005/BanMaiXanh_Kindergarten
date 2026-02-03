import React from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import NotificationItem from './NotificationItem'
import { useAdminStore } from '@/stores/useAdminStore'
const NotificationFormSchema = z.object({
    title: z.string().min(1,"Tiêu đề không được để trống"),
    content: z.string().min(1,"Nội dung không được để trống"),
    receiver: z.string()
})
type NotificationFormValues = z.infer<typeof NotificationFormSchema>

const Notification = () => {
  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<NotificationFormValues>({
    resolver : zodResolver(NotificationFormSchema)
  })
  
  const onSubmit2 = async (data: NotificationFormValues) =>{
      const {title,content,receiver} = data;
      console.log(title + ' ' + content +' ' +receiver)
  }
  const notifications =  useAdminStore((state) => state.notifications)
  return (
    <>
      <div className='flex justify-between '>
      <h1 className='text-2xl font-bold itim-regular'>Các thông báo đã gửi:</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline' className='rounded-2xl bg-[#05D988] text-[#ffffff] hover:bg-[#02B671] focus:bg-[#05D988]  transition all'>Tạo thông báo</Button>
        </DialogTrigger>
        <DialogContent className='flex flex-wrap justify-center gap-3 p-3'>
          <h1 className='text-2xl font-bold'>Tạo thông báo</h1>
          <form className='w-full gap-6 flex flex-wrap ' onSubmit={handleSubmit(onSubmit2)}>

            <h2 className='text-lg font-medium'>Người nhận:</h2>
            <RadioGroup defaultValue='Giáo viên' id='receiver' className='flex gap-3' {...register("receiver")}>
              <div className='flex items-center gap-2'>
                <RadioGroupItem id='teacher' value='Giáo viên'/>
                <Label htmlFor='teacher' className='text-base'>Giáo viên</Label>
              </div>
              <div className='flex items-center gap-2'>
                <RadioGroupItem id='parent' value='Phụ huynh'/>
                <Label htmlFor='parent' className='text-base'>Phụ huynh</Label>
              </div>
            </RadioGroup>
         
            <div className='w-full'>
              <Label htmlFor='title' className='text-sm block font-bold'>Tiêu đề</Label>
              <Input type='text' id='title' placeholder='Nhập tiêu đề' className='shadow-sm' {...register("title")}/>
              {errors.title && <p className='text-destructive text-sm'>{errors.title?.message}</p>}
            </div>
            <div className='w-full'>
              <Label htmlFor='content' className='text-sm block font-bold'>Nội dung</Label>
              <Input type='text' id='title' placeholder='Nhập tiêu đề' className='shadow-sm' {...register("content")}/>
              {errors.content && <p className='text-destructive text-sm'>{errors.content?.message}</p>}
            </div>
            <div className='flex justify-center w-full'>
              <Button type='submit' className='rounded-2xl bg-[#05D988] hover:bg-[#02B671] focus:bg-[#05D988]  transition all' disabled={isSubmitting}>Tạo thông báo</Button>

            </div>
          </form>

        </DialogContent>
      </Dialog>
          
      
    </div>
    <ul className='mt-4'>
      {notifications.map(notification => (
        <NotificationItem key={notification.notificationid} notification={notification}/>
      ))}
    </ul>
    </>
  )
}

export default Notification
