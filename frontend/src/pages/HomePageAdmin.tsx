import { useState } from 'react';
import { Dashboard } from '@/components/admin/dashboard';
import Class from "@/components/admin/Class"
import Finance from '@/components/admin/Finance';
import Menu from '@/components/admin/Menu';
import Notification from '@/components/admin/Notification';
import { Home, Bell,School,CircleDollarSign,ShieldUser,CookingPot} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
export default function HomePageAdmin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate()
  const handleClick = () =>{
    navigate('/signin')
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-b from-[#ffffff] to-[#d1fae5] rounded-xl flex items-center justify-center">
              <ShieldUser className="w-10 h-10 text-black" />
            </div>
            <div>
              <h1 className="text-gray-900 font-bold">Admin</h1>
            </div>
          </div>
          <Button type='button' onClick={handleClick} className='bg-[#05d988] hover:bg-[#006f44] focus:bg-[#05d988] transition all '>Đăng xuất</Button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'dashboard'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Home className="w-4 h-4" />
              Trang chủ
            </button>
            <button
              onClick={() => setActiveTab('notification')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'notification'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Bell className="w-4 h-4" />
              Thông báo
            </button>
            <button
              onClick={() => setActiveTab('class')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'class'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <School className="w-4 h-4" />
              Lớp học
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'menu'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <CookingPot className="w-4 h-4" />
              Thực đơn
            </button>
            <button
              onClick={() => setActiveTab('finance')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'finance'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <CircleDollarSign className="w-4 h-4" />
              Tài chính
            </button>
            
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="w-full p-12">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'notification' && <Notification />}
        {activeTab === 'class' && <Class />}
        {activeTab === 'menu' && <Menu />}
        {activeTab === 'finance' && <Finance/>}
      </main>
    </div>
  );
}