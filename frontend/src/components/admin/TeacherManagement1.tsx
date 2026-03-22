import { useAdminStore } from '@/stores/useAdminStore'
import { useTabAdminStore } from '@/stores/useTabStore'
import { Users } from 'lucide-react'
import React from 'react'
import { Card, CardContent } from '../ui/card'

const TeacherManagement1 = () => {
  const {setTabActive} = useTabAdminStore()
  const teachers = useAdminStore((state) => state.teachers)
  return (
    <div>
        <div className='flex gap-12'>
            <Card className="w-150 h-auto shadow-md rounded-2xl">
            <CardContent className="p-6">
              <div className="flex space-x-40 justify-between">
                <div className="space-y-2">
                  <h1 className="text-2xl text-gray-500 mali-regular">Số lượng giáo viên đợi duyệt</h1>
                  <h1 className="text-6xl mali-bold">
                    {teachers?.filter((t) => t.status === null).length || 0}
                  </h1>
                </div>  
                <button onClick={() => setTabActive("teacherwaiting")}>
                  <div className=" bg-blue-500 w-24 h-24 rounded-full flex items-center justify-center hover:shadow-xl">
                    <Users className=" w-12 h-12 text-white" />
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>
          <Card className="w-150 h-auto shadow-md rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-2xl text-gray-500 mali-regular">Số lượng giáo viên</p>
                  <h1 className="text-6xl mali-bold">
                    {teachers?.filter((t) => t.status !== null ).length || 0}
                  </h1>
                </div>
                <button onClick={() => setTabActive("teachermanagement")}>
                  <div className=" bg-red-500 w-24 h-24 rounded-full flex items-center justify-center hover:shadow-xl">
                    <Users className=" w-12 h-12 text-white" />
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
        

    </div>
  )
}

export default TeacherManagement1
