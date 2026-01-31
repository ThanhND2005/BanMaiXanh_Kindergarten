import React from 'react'
import { Button } from '../ui/button'
import {useForm} from 'react-hook-form'
import { Input } from '../ui/input'
const studentbills = [
  {
    tuitionid: '001',
    parentName :'Nguyễn Thị Thắm',
    studentName :'Nguyễn Gia Hân',
    dob :'2021-01-01',
    gender:'Nữ',
    className: 'Mầm 1',
    attendance: 23,
    tuition: 3000000,
    status: 'Đã hoàn thành',
    avatarUrl :'https://i.pinimg.com/1200x/af/6b/13/af6b1344fc3a40799fcff65832f53af4.jpg',
    billUrl: 'https://res.cloudinary.com/dhylrhxsa/image/upload/v1769681751/526e6a2c-0d51-44db-8465-75610de7ebc6_xipwh6.jpg',
  },
  {
    tuitionid: '002',
    parentName :'Nguyễn Hồng Vân',
    studentName :'Phạm Yến Nhi',
    dob :'2021-01-01',
    gender:'Nữ',
    className: 'Chồi 2',
    attendance: 23,
    tuition: 4000000,
    status: 'Đang thực hiện',
    avatarUrl:'https://i.pinimg.com/736x/55/98/6c/55986c6b13f28e0a87085243d5bc5b57.jpg',
    billUrl :null
  },

]
type BillFormValues = {
  tuitionid: string,
}

const StudentFinance = () => {
  const onSubmit = async () => {

  }
  const onDelete = async () => {

  }
  const onVerify = async () => {

  }
  const {register, handleSubmit, formState : {errors, isSubmitting}} = useForm<BillFormValues>()
  return (
    <>
      <div className='flex justify-between items-center mb-3'>
        <div className='flex justify-start items-center'>
          <h1 className='text-2xl itim-regular text-[#05D988]'>Hóa đơn tiền học các học sinh trong hệ thống:</h1>
        </div>
        <div className='flex justify-start items-center'>
          <Button type='button' onClick={onSubmit} className='bg-[#05D988] rounded-xl shadow-sm hover:bg-[#00BC74] focus:bg-[#05D988]'>Xuất hóa đơn</Button>
        </div>
      </div>
      <ul className='grid grid-cols-2 gap-8 '>
        {studentbills.map((studentbill) =>(
          <li className='grid grid-cols-2 bg-[#ffffff] rounded-xl shadow-md p-8'>
            <div className='flex flex-wrap gap-6 justify-center'>
              <div className='h-24 w-24 rounded-full overflow-hidden'>
                  <img src={studentbill.avatarUrl} alt="Chưa có bill" className='w-full h-auto object-cover' />
              </div>
              <div className='flex flex-wrap justify-start space-y-2'>
                <h2 className='text-md font-bold w-full'>Họ tên phụ huynh: {studentbill.parentName}</h2>
                <h2 className='text-md font-bold w-full'>Họ tên học sinh: {studentbill.studentName}</h2>
                <h2 className='text-md font-bold w-full'>Ngày sinh: {studentbill.dob}</h2>
                <h2 className='text-md font-bold w-full'>Giới tính: {studentbill.gender}</h2>
                <h2 className='text-md font-bold w-full'>Lớp học: {studentbill.className}</h2>
                <h2 className='text-md font-bold w-full'>Số ngày đi học: {studentbill.attendance}</h2>
                <h2 className='text-md font-bold w-full'>Học phí: {studentbill.tuition} vnđ</h2>
                <h2 className='text-md font-bold w-full'>Trạng thái: {studentbill.status}</h2>
              </div>
              <div className='flex justify-between w-full'>
                <div>

                <form onSubmit={handleSubmit(onVerify)}>
                  <Input type='hidden' id='tuitionid' value={studentbill.tuitionid} {...register("tuitionid")}/>
                  <Button type='submit' className='w-20 bg-[#05D988] rounded-2xl hover:bg-[#00BC74] focus:bg-[#05D988]' disabled={isSubmitting}>Xác nhận</Button>
                </form>
                </div>
                <div>

                <form onSubmit={handleSubmit(onDelete)}>
                  <Input type='hidden' id='tuitionid' value={studentbill.tuitionid} {...register("tuitionid")}/>
                  <Button type='submit' className='w-20 bg-[#EB5757] rounded-2xl hover:bg-[#B22626] focus:bg-[#EB5757]' disabled={isSubmitting}>xóa</Button>
                </form>
                </div>
              </div>
            </div>
            <div className='flex flex-wrap justify-center gap-3 p-4'>
              <h1 className='text-2xl font-bold'>Ảnh hóa đơn</h1>
              <div className='w-full h-auto overflow-hidden'>
                {studentbill.billUrl === null ? <h2 className='text-2xl font-bold text-center text-[#828282]'>Phụ huynh chưa gửi ảnh</h2> : <img src={studentbill.billUrl} alt="Không có hóa đơn" className='w-full h-auto'/>}
                
              </div>
            </div>

          </li>
        ))}
      </ul>
    </>
  )
}

export default StudentFinance
