import { Megaphone } from 'lucide-react'
import React from 'react'
const notifications = [
  {
    notificaitionid : '001',
    senderName:'Admin',
    title:'Lịch nghỉ tết',
    content: "Kính gửi các giáo viên, lịch nghỉ tết của chúng ta sẽ bắt đầu tự ngày 31/12 cho tới 2/1 nhé.",
    createdat: '30/12/2025'
  },
  {
    notificaitionid : '002',
    senderName:'Phụ huynh bé Bảo Hân',
    title:'Lưu ý',
    content: "Cô ơi, bé hôm qua vừa ngã đang bị đau chân nên cô hạn chế cho bé vẫn động giúp em ạ.",
    createdat: '30/12/2025'
  },
  
]
const Notification = () => {
  return (
    <div>
      <ul className='space-y-4'>
        {notifications.map((notification) =>(
          <li key={notification.notificaitionid} className='w-full flex justify-between items-center bg-[#ffffff] rounded-xl shadow-md py-4 px-6'>
            <div className='flex flex-col space-y-2'>
              <h2 className='text-md text-[#828282]'>Người gửi: {notification.senderName}</h2>
              <div className='flex space-x-3'>
                <h2 className='text-xl font-bold text-[#15803D]'>Tiêu đề:</h2>
                <h2 className='text-xl font-bold'>{notification.title}</h2>
              </div>
              <div className='flex space-x-3 w-150'>
                <h2 className='text-xl font-bold text-[#15803D] whitespace-nowrap'>Nội dung:</h2>
                <h2 className='text-xl font-bold'>{notification.content}</h2>
              </div>
              <h2 className='text-md text-[#828282]'>Ngày gửi: {notification.createdat}</h2>
            </div>
            <div className='h-30 w-30 rounded-full overflow-hidden flex justify-center items-center bg-[#FB3C1A] opacity-80'>
              <Megaphone className='w-25 h-25 text-white'/>  
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Notification
