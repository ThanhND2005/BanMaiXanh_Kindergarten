import { useTeacherStore } from '@/stores/useTeacherStore'
import React from 'react'
import {useForm} from 'react-hook-form'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Megaphone, Users } from 'lucide-react'
import { useAdminStore } from '@/stores/useAdminStore'

type TeacherForm = {
  teacherid : string,
  code : string
}
const menu = {
  day : '2',
  dish1 :'Cơm trắng',
  dish2 :'Thịt băm',
  dish3 :'Canh cà chua',
  dish4 :'Rau cải luộc'
}



const DashBoard = () => {
  const notifications = useTeacherStore((state) => state.notifications)
  const teacher = useTeacherStore((state) => state.teacher)
  const students = useAdminStore((state) => state.students).filter(student => student.classname === teacher.classname)
  
  const {register, handleSubmit, formState :{errors, isSubmitting}} = useForm<TeacherForm>()
  const onTimekeeping = async (data : TeacherForm) =>{

  }
  return (
    <div className='flex flex-wrap justify-center p-8'>
        <div className='w-full grid grid-cols-2 p-4 bg-[#ffffff] rounded-xl shadow-md'>
          <div className='space-y-2'>
            <h1 className='text-2xl itim-regular'>Chào buổi sáng, {teacher.gender ==='Nam' ? 'thầy' : 'cô'} {teacher.name} ☀️</h1>
            <h2 className='text-md itim-regular text-[#828282]'>Chúc {teacher.gender === 'Name' ? 'thầy' : 'cô'} có một buổi sáng thật nhiều năng lượng nhé !</h2>
          </div>
          <div className='w-full flex justify-end items-center'>
            {teacher.timekeeping === null ?  <Dialog>
              <DialogTrigger asChild>
                <Button variant='outline' className='bg-[#05d988] text-white hover:text-white hover:bg-[#006f44] focus:bg-[#05d988]'>Chấm Công</Button>
              </DialogTrigger>
              <DialogContent className='flex flex-wrap justify-center p-4 gap-4'>
                <h1 className='text-2xl font-bold'> Vui lòng nhập mã bảo mật</h1>
                <form className='w-full flex  flex-wrap justify-center space-y-3' onSubmit={handleSubmit(onTimekeeping)}>
                  <Input type='hidden' id='userid' value={teacher.userid} {...register("teacherid")}/>
                  <Input type='text' id='code' className='rounded-xl shadow-sm p-2' placeholder='Nhập mã bảo mật' {...register("code")}/>
                  <Button type='submit' className='rounded-xl bg-[#05d988] hover:bg-[#006f44] focus:bg-[#05d988]' disabled={isSubmitting}>Chấm công</Button>
                </form>
              </DialogContent>
            </Dialog>: <Button type='button' className='bg-[#66B2FF] rounded-xl shadow-md'>Đã chấm công</Button>}
            
          </div>
        </div>
        <div className='grid grid-cols-2 w-full mt-6 '>
          <div className='flex flex-wrap justify-start space-y-12'>
            <div className='w-90 grid grid-cols-2 p-4 bg-[#ffffff] rounded-xl shadow-md'>
              <div className='flex flex-col items-center justify-center'>
                <h2 className='text-xl text-[#828282] w-full'>Lớp {teacher.classname}</h2>
                <h2 className='text-2xl font-bold w-full'>{students.filter(student => student.checkin !== null).length}/{students.length}</h2>
              </div>
              <div className='flex justify-end'>
                <div className='h-20 w-20 rounded-full overflow-hidden bg-[#2E7D32] flex justify-center items-center opacity-60'>
                  <Users className='h-15 w-15 text-[#ffffff]'/>
                </div>
              </div>
            </div>
            <div className='w-90 grid grid-cols-2 p-4 bg-[#ffffff] rounded-xl shadow-md w-91'>
              <div className='flex flex-wrap justify-start'>
                <h2 className='text-xl text-[#828282] w-full'>Thông báo</h2>
                <h2 className='text-2xl font-bold w-full'>{notifications.length}</h2>
              </div>
              <div className='flex justify-end'>
                <div className='h-20 w-20 rounded-full overflow-hidden bg-[#F59E0B] flex justify-center items-center opacity-60'>
                  <Megaphone className='h-15 w-15 text-[#ffffff]'/>
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-end'>

            <div className='bg-[#ffffff] rounded-xl shadow-md flex flex-wrap justify-center py-4 px-8 w-80 '>
              <h1 className='text-[#276749] itim-regular text-xl opacity-60'>Thực đơn hôm nay:</h1>
              <div className='w-full space-y-4  '>
                <h2 className='text-4xl itim-regular w-full'>{menu.dish1}</h2>
                <h2 className='text-4xl itim-regular w-full'>{menu.dish2}</h2>
                <h2 className='text-4xl itim-regular w-full'>{menu.dish3}</h2>
                <h2 className='text-4xl itim-regular w-full'>{menu.dish4}</h2>
              </div>
          </div>
            
          </div>
        </div>
    </div>
  )
}

export default DashBoard
