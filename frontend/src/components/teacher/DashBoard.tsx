import { useTeacherStore } from '@/stores/useTeacherStore'
import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Beef, CookingPot, IceCreamBowl, Megaphone, Soup, Users } from 'lucide-react'
import { teacherService } from '@/services/teacherService'
import {toast} from 'sonner'

type TeacherForm = {
  teacherid : string,
  code : string
}

const DashBoard = () => {
  const day = new Date().getDay()
  const menu = useTeacherStore((state) => state.menuday)?.find((t) => t.day === day )
  const notifications = useTeacherStore((state) => state.notifications)
  const teacher = useTeacherStore((state) => state.teacher)
  
  
  const students = useTeacherStore((state) => state.students)
  const {refreshTeacher} = useTeacherStore()
  const {register, handleSubmit, formState :{errors, isSubmitting}} = useForm<TeacherForm>()
  const [open,setOpen]= useState(false)
  const onTimekeeping = async (data : TeacherForm) =>{
        const {teacherid,code} = data
        try {
          await teacherService.postTimeKeeping(teacherid,code)
          await refreshTeacher(teacherid)
          const currentteacher = useTeacherStore.getState().teacher
          if(currentteacher?.timekeeping === null)
          {
            toast.error("Chấm công thất bại !")
          }
          else
          {
            toast.success("Chấm công thành công !")
          }

        } catch (error) {
          console.error(error)
          toast.error("Điểm danh thất bại")
        }
        finally{
          setOpen(false)
        }

  }
  return (
    <div className='flex flex-wrap justify-center p-8'>
        <div className='w-full grid grid-cols-2 p-4 bg-[#ffffff] rounded-xl shadow-md'>
          <div className='space-y-2'>
            <h1 className='text-2xl mali-semibold text-nowrap'>Chào buổi sáng, {teacher?.gender ==='Nam' ? 'thầy' : 'cô'} {teacher?.name} ☀️</h1>
            <h2 className='text-md mali-semibold text-[#828282]'>Chúc {teacher?.gender === 'Nam' ? 'thầy' : 'cô'} có một buổi sáng thật nhiều năng lượng nhé !</h2>
          </div>
          <div className='w-full flex justify-end items-center'>
            {teacher?.timekeeping === null ?  <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant='outline' className='rounded-2xl bg-[#05d988] text-white hover:text-white hover:bg-[#006f44] focus:bg-[#05d988]'>Chấm Công</Button>
              </DialogTrigger>
              <DialogContent className='flex flex-wrap justify-center p-4 gap-4'>
                <h1 className='text-2xl mali-bold'> Vui lòng nhập mã bảo mật</h1>
                <form className='w-full flex  flex-wrap justify-center space-y-3' onSubmit={handleSubmit(onTimekeeping)}>
                  <Input type='hidden' id='userid' value={teacher.userid} {...register("teacherid")}/>
                  <Input type='text' id='code' className='rounded-xl shadow-sm p-2' placeholder='Nhập mã bảo mật' {...register("code")}/>
                  <Button type='submit' className='rounded-2xl bg-[#05d988] hover:bg-[#006f44] focus:bg-[#05d988]' disabled={isSubmitting}>Chấm công</Button>
                </form>
              </DialogContent>
            </Dialog>: <Button type='button' className='bg-[#66B2FF] rounded-2xl shadow-md hover:bg-[#66B2FF]'>Đã chấm công</Button>}
            
          </div>
        </div>
        <div className='grid grid-cols-2 w-full mt-6 '>
          <div className='flex flex-wrap justify-start space-y-12'>
            <div className='w-90 grid grid-cols-2 p-4 bg-[#ffffff] rounded-xl shadow-md'>
              <div className='flex flex-col items-center justify-center'>
                <h2 className='text-xl text-[#828282] w-full mali-medium'>Lớp {teacher?.classname}</h2>
                <h2 className='text-4xl mali-bold w-full'>{students?.filter(student => student.check_in_time !== null).length}/{students?.length}</h2>
              </div>
              <div className='flex justify-end'>
                <div className='h-20 w-20 rounded-full overflow-hidden bg-[#2E7D32] flex justify-center items-center opacity-60'>
                  <Users className='h-15 w-15 text-[#ffffff]'/>
                </div>
              </div>
            </div>
            <div className='w-90 grid grid-cols-2 p-4 bg-[#ffffff] rounded-xl shadow-md w-91'>
              <div className='flex flex-col justify-start mali-medium'>
                <h2 className='text-xl text-[#828282] w-full'>Thông báo</h2>
                <h2 className='text-4xl mali-bold w-full'>{notifications?.length}</h2>
              </div>
              <div className='flex justify-end'>
                <div className='h-20 w-20 rounded-full overflow-hidden bg-[#F59E0B] flex justify-center items-center opacity-60'>
                  <Megaphone className='h-15 w-15 text-[#ffffff]'/>
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-end'>

            <div className='rounded-xl shadow-md flex flex-wrap justify-center py-4 px-8 w-80' style={{backgroundColor : menu?.color}}>
              <h1 className='text-[#276749] mali-bold text-xl opacity-60'>Thực đơn hôm nay:</h1>
              <div className='w-full space-y-4  '>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl mali-semibold">{menu?.dish1}</h2>
                  <CookingPot className="h-6 w-6 text-gray-500" />
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl mali-semibold">{menu?.dish2}</h2>
                  <Soup className="h-6 w-6 text-gray-500" />
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl mali-semibold">{menu?.dish3}</h2>
                  <IceCreamBowl className="h-6 w-6 text-gray-500" />
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl mali-semibold">{menu?.dish4}</h2>
                  <Beef className="h-6 w-6 text-gray-500" />
                </div>
              </div>
          </div>
            
          </div>
        </div>
    </div>
  )
}

export default DashBoard
