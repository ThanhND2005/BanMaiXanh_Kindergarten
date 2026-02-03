import { Button } from '../ui/button'

import { useAdminStore } from '@/stores/useAdminStore'

const TeacherFinance = () => {
  const teacherbills = useAdminStore((state)=> state.teacherbills)
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
        {teacherbills.map((teacherbill) =>(
          <li key={teacherbill.salaryid}>
            <div className='bg-[#ffffff] rounded-xl flex flex-col justify-center items-center shadow-md p-6 gap-4'>
              <div className='w-24 h-24 rounded-full overflow-hidden'>
                  <img src={teacherbill.avatarUrl} alt="w-full object-cover" />
              </div>
              <div className='space-y-2'>
                <h2 className='text-md font-bold'>Họ và tên: {teacherbill.teacherName}</h2>
                <h2 className='text-md font-bold'>Ngày sinh: {teacherbill.dob.toLocaleDateString('vi-VN')}</h2>
                <h2 className='text-md font-bold'>Giới tính: {teacherbill.gender}</h2>
                <h2 className='text-md font-bold'>Địa chỉ: {teacherbill.address}</h2>
                <h2 className='text-md font-bold'>Lớp: {teacherbill.className}</h2>
                <h2 className='text-md font-bold'>Số ngày công: {teacherbill.timekeeping}</h2>
                <h2 className='text-md font-bold'>Lương cơ bản: {teacherbill.salary} vnđ</h2>
                <h2 className='text-md font-bold'>Phụ cấp: {teacherbill.allowance} vnđ</h2>
                <h2 className='text-md font-bold'>Tổng lương: {teacherbill.amount} vnđ</h2>
                <h2 className='text-md font-bold'>Trạng thái: {teacherbill.status}</h2>
              </div>
              <div>
                <Button type='button' className='bg-[#EB5757] hover:bg-[#B22626] focus:bg-[#EB5757]' onClick={() => onDelete(teacherbill.salaryid)}>Xóa</Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default TeacherFinance
