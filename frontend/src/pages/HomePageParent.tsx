import { useTabParentStore } from '@/stores/useTabStore'
import React from 'react'
import { Leaf,Home, Users,MessageSquareDot,HandCoins,CookingPot,LogOut,User,School } from 'lucide-react'
import DashBoard from '@/components/parent/DashBoard'
import Class from '@/components/parent/Class'
import Teacher from '@/components/parent/Teacher'
import Notification from '@/components/parent/Notification'
import Tuition from '@/components/parent/Tuition'
import Menu from '@/components/teacher/Menu'
const HomePageParent = () => {
  const {tabActive, setTabActive } = useTabParentStore()
  const now = new Date();
    const dateformat = new Intl.DateTimeFormat('vi-VN',{
      weekday: 'long',
      day :'2-digit',
      month:'2-digit',
      year:'numeric',
    }).format(now)
    const final = dateformat.replace(', ',', ngày ')
  return (
    <div className="flex min-h-screen bg-[#E8F5E9]">
      <aside className="w-64 bg-[#2E7D32] text-white flex flex-col h-screen sticky top-0 left-0 shadow-xl z-30 shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <Leaf className="w-8 h-8 " />
          <span className="text-2xl font-bold itim-regular">Ban Mai Xanh</span>
        </div>
        <nav className="flex-1 mt-4 space-y-2 overflow-y-auto custom-scrollbar">
          <button
            onClick={() => setTabActive("dashboard")}
            className={`w-full rounded-2xl flex items-center px-6 py-3 justify-start gap-2 itim-regular text-2xl ${tabActive === "dashboard" ? "bg-white text-[#15803D]" : "bg-transparent"} transition-all duration-500`}
          >
            <Home className="h-6 w-6" />
            Trang chủ
          </button>
          <button
            onClick={() => setTabActive("class")}
            className={`w-full rounded-2xl flex items-center px-6 py-3 justify-start gap-2 itim-regular text-2xl ${tabActive === "class" ? "bg-white text-[#15803D]" : "bg-transparent"} transition-all duration-500`}
          >
            <School className="h-6 w-6" />
            Lớp học
          </button>
          <button
            onClick={() => setTabActive("teacher")}
            className={`w-full rounded-2xl flex items-center px-6 py-3 justify-start gap-2 itim-regular text-2xl ${tabActive === "teacher" ? "bg-white text-[#15803D]" : "border-transparent"} transition-all duration-500`}
          >
            <Users className="h-6 w-6" />
            Giáo viên
          </button>
          <button
            onClick={() => setTabActive("notification")}
            className={`w-full rounded-2xl flex items-center px-6 py-3 justify-start gap-2  itim-regular text-2xl ${tabActive === "notification" ? "bg-white text-[#15803D]" : "border-transparent"} transition-all duration-500`}
          >
            <MessageSquareDot className="h-6 w-6" />
            Thông báo
          </button>
          <button
            onClick={() => setTabActive("tuition")}
            className={`w-full rounded-2xl flex items-center px-6 py-3 justify-start gap-2  itim-regular text-2xl ${tabActive === "tuition" ? "bg-white text-[#15803D]" : "border-transparent"} transition-all duration-500`}
          >
            <HandCoins className="h-6 w-6" />
            Học phí
          </button>
          <button
            onClick={() => setTabActive("menu")}
            className={`w-full rounded-2xl flex items-center px-6 py-3 justify-start gap-2 itim-regular text-2xl ${tabActive === "menu" ? "bg-white text-[#15803D]" : "border-transparent"} transition-all duration-500`}
          >
            <CookingPot className="h-6 w-6" />
            Thực đơn
          </button>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button className="flex items-center w-full px-4 py-3 text-white/90 hover:bg-white/10 hover:text-white rounded-lg transition-colors">
            <LogOut size={20} className="mr-3" />
            <span className="font-medium">Đăng xuất</span>
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">  
        <header className="sticky top-0 z-20 w-full bg-white h-20 px-8 flex justify-between items-center shadow-sm border-b border-gray-100">
          <div>
            <h1 className='text-2xl font-bold '>Xin chào, mẹ bé Hân</h1>
            <h2 className="text-md font-bold text-[#828282]">
              {final}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="font-bold text-gray-800 text-sm">Nguyễn Thị Vân</p>
              <p className="text-xs text-gray-500">Phụ huynh</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
              <User className="w-full h-full p-2 text-gray-500 bg-gray-100" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          {tabActive === 'dashboard' && <DashBoard/>}
          {tabActive === 'class' && <Class/>}
          {tabActive === 'teacher' && <Teacher/>}
          {tabActive === 'notification' && <Notification/>}
          {tabActive === 'tuition' && <Tuition/>}
          {tabActive === 'menu' && <Menu/>}
        </main>
      </div>
    </div>
  )
}

export default HomePageParent
