import React from 'react'
import {useForm} from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'


type SalaryFormValues = {
  salaryid : string
}
const tuitions = [
  {
    salaryid : '001',
    teacherName : 'Phạm Thị Vân',
    dob: '2005-01-01',
    gender:'Nữ',
    address: 'Hà Đông',
    className: 'Mầm 1',
    timekeeping: 23,
    allowance: 200000,
    amount: 2800000,
    status:'Đang thực hiện',
    avatarUrl:'https://i.pinimg.com/736x/f1/d5/ac/f1d5ac5e5275f1c7b7e9696a10b7ebb6.jpg'
  },
  {
    salaryid : '002',
    teacherName : 'Vũ Hải Thanh',
    dob: '2005-01-01',
    gender:'Nữ',
    address: 'Hà Đông',
    className: 'Chồi 2',
    timekeeping: 27,
    allowance: 200000,
    amount: 2700000,
    status:'Đang thực hiện',
    avatarUrl: 'https://i.pinimg.com/736x/7d/78/d5/7d78d5e2016f277d6e5174d55e8395ba.jpg'
  },{
    salaryid : '003',
    teacherName : 'Nguyễn Vân Anh',
    dob: '2005-01-01',
    gender:'Nữ',
    address: 'Hà Đông',
    className: 'Âm nhạc',
    timekeeping: 4,
    allowance: 200000,
    amount: 800000,
    status:'Đã hoàn thành',
    avatarUrl: 'https://i.pinimg.com/736x/a9/ff/38/a9ff38124bec46a1b5d09cbb9bcfa94c.jpg'
  },
]
const TeacherFinance = () => {
  const {register, handleSubmit, formState :{errors, isSubmitting}} = useForm<SalaryFormValues>()
  const onUpdate = async () =>{
  }
  const onDelete = async (salaryid : string) => {
    
  }
  return (
    <>
      <div className='flex justify-between items-center mb-4'>
        <div>
          <h2 className='text-2xl itim-regular text-[#05D988]'>Hóa đơn lương giáo viên trong hệ thống:</h2>
        </div>
        <div className='flex justify-end'>
          <Button type='button' className='bg-[#05d988] hover:bg-[#00BC74] focus:bg-[#05D988]' onClick={onUpdate}>Xuất hóa đơn</Button>
        </div>
      </div>
      <ul className='grid grid-cols-4 gap-6'>
        {tuitions.map((tuition) =>(
          <li key={tuition.salaryid}>
            <div className='bg-[#ffffff] rounded-xl flex flex-col justify-center items-center shadow-md p-6 gap-4'>
              <div className='w-24 h-24 rounded-full overflow-hidden'>
                  <img src={tuition.avatarUrl} alt="w-full object-cover" />
              </div>
              <div className='space-y-2'>
                <h2 className='text-md font-bold'>Họ và tên: {tuition.teacherName}</h2>
                <h2 className='text-md font-bold'>Ngày sinh: {tuition.dob}</h2>
                <h2 className='text-md font-bold'>Giới tính: {tuition.gender}</h2>
                <h2 className='text-md font-bold'>Địa chỉ: {tuition.address}</h2>
                <h2 className='text-md font-bold'>Lớp: {tuition.className}</h2>
                <h2 className='text-md font-bold'>Số ngày công: {tuition.timekeeping}</h2>
                <h2 className='text-md font-bold'>Phụ cấp: {tuition.allowance}</h2>
                <h2 className='text-md font-bold'>Tổng lương: {tuition.amount}</h2>
              </div>
              <div>
                <Button type='button' className='bg-[#EB5757] hover:bg-[#B22626] focus:bg-[#EB5757]' onClick={() => onDelete(tuition.salaryid)}>Xóa</Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default TeacherFinance
