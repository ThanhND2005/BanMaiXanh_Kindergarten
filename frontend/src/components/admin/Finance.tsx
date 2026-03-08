import { useTabAdminStore } from '@/stores/useTabStore'
import React from 'react'
import { GraduationCap,HandCoins } from 'lucide-react';
import { useAdminStore } from '@/stores/useAdminStore';




const Finance = () => {
  const { setTabActive} = useTabAdminStore()
  const studentbills = useAdminStore((state) => state.studentbills)
  const teacherbills = useAdminStore((state) => state.teacherbills)
  return (
    <>
     
      <div className='grid grid-cols-2 gap-8 p-4'>
        <button onClick={() => setTabActive('studentfinance')}>

        <div className='bg-[#ffffff] rounded-xl shadow-md flex justify-between p-6'>
          <div className='gap-3 justify-start'>
            <h1 className='text-xl text-[#828282] mali-bold'>Số học sinh đã đóng học:</h1>
            <h1 className='text-6xl mt-4 flex justify-start mali-bold'>{studentbills?.filter(studentbill => studentbill.status !== null && studentbill.month === new Date().getMonth()).length}/{studentbills?.length}</h1>
          </div>  
          <div className='flex justify-end items-center'>
              <GraduationCap className='w-24 h-24'/>  
          </div>
        </div>
        </button>
        <button onClick={() => setTabActive('teacherfinance')}>

        <div className='bg-[#ffffff] rounded-xl shadow-md flex justify-between p-6'>
          <div className='gap-3 justify-start'>
            <h1 className='text-xl font-bold text-[#828282] mali-bold'>Số giáo viên đã nhận lương:</h1>
            <h1 className='text-6xl mali-bold mt-4 flex justify-start'>{teacherbills?.filter(teacherbill => teacherbill.status !== null && teacherbill.month === new Date().getMonth()).length}/{teacherbills?.length}</h1>
          </div>  
          <div className='flex justify-end items-center'>
              <HandCoins className='w-24 h-24'/>  
          </div>
        </div>
        </button> 

      </div>

    </>
  )
}

export default Finance
