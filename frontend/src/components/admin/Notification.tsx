import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import {z} from 'zod'
import {Controller, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import NotificationItem from './NotificationItem'
import { useAdminStore } from '@/stores/useAdminStore'
import { adminService } from '@/services/adminService'
import {toast} from 'sonner'
import { Plus } from 'lucide-react'
const NotificationFormSchema = z.object({
    title: z.string().min(1,"Tiêu đề không được để trống"),
    content: z.string().min(1,"Nội dung không được để trống"),
    receiver: z.string()
})
type NotificationFormValues = z.infer<typeof NotificationFormSchema>

const Notification = () => {
  const {reset,control,register, handleSubmit, formState: {errors, isSubmitting}} = useForm<NotificationFormValues>({
    resolver : zodResolver(NotificationFormSchema)
  })
  const {refreshNotifications} = useAdminStore()
  const [open, setOpen] = useState(false)
  const onSubmit2 = async (data: NotificationFormValues) =>{
      const {title,content,receiver} = data;
      try {
        await adminService.postNotification(title,content,receiver)
        await refreshNotifications()
        toast.success("Gửi thông báo thành công !")
      } catch (error) {
        console.error(error)
        toast.error("Xảy ra lỗi khi tạo thông báo !")
      }
      finally
      {
        reset()
        setOpen(false)
      }
      
  }
  const notifications =  useAdminStore((state) => state.notifications)
  console.log(notifications)
  return (
    <>
      <div className='flex justify-between '>
      <h1 className='text-2xl text-[#006f44] mali-bold'>Các thông báo đã gửi:</h1>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='outline' className='rounded-2xl bg-[#05D988] text-[#ffffff] hover:bg-[#006f44] hover:text-white focus:bg-[#05D988]  transition all'><div className='flex justify-between gap-1 items-center'>
            <Plus/>
            <h1 className='text-md'>Tạo thông báo</h1>
            </div> </Button>
        </DialogTrigger>
        <DialogContent className='flex flex-wrap justify-center gap-3 p-3'>
          <h1 className='text-2xl mali-bold'>Tạo thông báo</h1>
          <form className='w-full gap-6 flex flex-wrap ' onSubmit={handleSubmit(onSubmit2)}>

            <h2 className='text-lg mali-semibold  '>Người nhận:</h2>
            <Controller
            name='receiver'
            control={control}
            defaultValue="Giáo viên"
            render={({field}) =>(

            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className='flex gap-3' {...register("receiver")}>
              <div className='flex items-center gap-2'>
                <RadioGroupItem id='teacher' value='Giáo viên'/>
                <Label htmlFor='teacher' className='text-base'>Giáo viên</Label>
              </div>
              <div className='flex items-center gap-2'>
                <RadioGroupItem id='parent' value='Phụ huynh'/>
                <Label htmlFor='parent' className='text-base'>Phụ huynh</Label>
              </div><div className='flex items-center gap-2'>
                <RadioGroupItem id='all' value='Tất cả'/>
                <Label htmlFor='all' className='text-base'>Mọi người</Label>
              </div>
            </RadioGroup>
            )}
            />
         
            <div className='w-full'>
              <Label htmlFor='title' className='text-md block mali-semibold'>Tiêu đề</Label>
              <Input type='text' id='title' placeholder='Nhập tiêu đề' className='shadow-sm' {...register("title")}/>
              {errors.title && <p className='text-destructive text-sm'>{errors.title?.message}</p>}
            </div>
            <div className='w-full'>
              <Label htmlFor='content' className='text-md block mali-semibold'>Nội dung</Label>
              <Input type='text' id='title' placeholder='Nhập nội dung' className='shadow-sm h-20' {...register("content")}/>
              {errors.content && <p className='text-destructive text-sm'>{errors.content?.message}</p>}
            </div>
            <div className='flex justify-center w-full'>
              <Button type='submit' className='rounded-2xl bg-[#05D988] hover:bg-[#006f44] focus:bg-[#05D988]  transition all' disabled={isSubmitting}>Tạo thông báo</Button>

            </div>
          </form>

        </DialogContent>
      </Dialog>
          
      
    </div>
    <ul className='mt-4'>
      {notifications?.map(notification => (
        <NotificationItem key={`${notification.notificationid}-${notification.receiveid}`} notification={notification}/>
      ))}
    </ul>
    </>
  )
}

export default Notification
