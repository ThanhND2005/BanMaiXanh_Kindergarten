import React from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
const NotificationFormSchema = z.object({
    title: z.string().min(1,"Tiêu đề không được để trống"),
    content: z.string().min(1,"Nội dung không được để trống"),
    receiver: z.string()
})
type NotificationFormValues = z.infer<typeof NotificationFormSchema>
type NotificationCard = {
  notificationid : string,
  receiver: string, 
  title: string, 
  content: string,
  createdat: Date,
}
const Notification = () => {
  const notifications = [
    {
      notificationid : '001',
      receiver: 'phụ huynh',
      title: 'Đóng tiền học',
      content:'Hiện đã đến kì đóng tiền học, yêu cầu phụ huynh nhanh chóng đóng tiền cho con về phía nhà trường a',
      createat:'2026-01-01'
    },
    {
      notificationid : '002',
      receiver: 'phụ huynh',
      title: 'Đóng tiền học',
      content:'Hiện đã đến kì đóng tiền học, yêu cầu phụ huynh nhanh chóng đóng tiền cho con về phía nhà trường a',
      createat:'2026-01-01'
    },
    {
      notificationid : '003',
      receiver: 'phụ huynh',
      title: 'Đóng tiền học',
      content:'Hiện đã đến kì đóng tiền học, yêu cầu phụ huynh nhanh chóng đóng tiền cho con về phía nhà trường a',
      createat:'2026-01-01'
    },
    {
      notificationid : '004',
      receiver: 'phụ huynh',
      title: 'Đóng tiền học',
      content:'Hiện đã đến kì đóng tiền học, yêu cầu phụ huynh nhanh chóng đóng tiền cho con về phía nhà trường a',
      createat:'2026-01-01'
    },
  ]
  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<NotificationFormValues>({
    resolver : zodResolver(NotificationFormSchema)
  })
  const {register: reg, handleSubmit: had, formState: {errors :err, isSubmitting: isSub}} = useForm<NotificationCard>()
  const onSubmit1 = async (data : NotificationCard) =>{

  }
  const onSubmit2 = async (data: NotificationFormValues) =>{
      const {title,content,receiver} = data;
      console.log(title + ' ' + content +' ' +receiver)
  }

  return (
    <>
      <div className='flex justify-between flex-wrap'>
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
        <li className='mb-4'>
          <form className='grid grid-cols-2 justify-between gap-6 rounded-2xl w-full shadow-md bg-[#ffffff] px-4 py-2' onSubmit={had(onSubmit1)}>
            <div>
              <Input type='hidden' id='notificationid' value={notification.notificationid} {...reg("notificationid")}/>
              <Input type='hidden' id='title' value={notification.title} {...reg("title")}/>
              <Input type='hidden' id='content' value={notification.content} {...reg("content")}/>
              <Input type='hidden' id='createdat' value={notification.createat} {...reg("createdat")}/>
              <Input type='hidden' id='receiver' value={notification.receiver} {...reg("receiver")}/>
              <h1 className='text-xl font-medium block'>Người nhận: {notification.receiver}</h1>
              <h1 className='text-xl font-medium block'>Tiêu đề: {notification.title}</h1>
              <h1 className='text-xl font-medium block'>Nội dung: {notification.content}</h1>
              <h1 className='text-xl font-medium block'>ngày gửi: {notification.createat}</h1>
            </div>
            <div className='flex justify-end items-center'>
              <Button type='submit' className='w-20 bg-[#f52121] rounded-2xl shadow-sm hover:bg-[#9E0C0C] focus:bg-[#f52121] transition all' disabled={isSub} >Xóa</Button>
            </div>
            
          </form>
        </li>
      ))}
    </ul>
    </>
  )
}

export default Notification
