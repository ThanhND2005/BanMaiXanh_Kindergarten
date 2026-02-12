import React from "react";
import { Card, CardContent } from "../ui/card";
import { Users, Baby } from "lucide-react";
import { useTabAdminStore } from "@/stores/useTabStore";
import { useAdminStore } from "@/stores/useAdminStore";
export function Dashboard() {
  const students = useAdminStore((state) => state.students)
  const teachers = useAdminStore((state)  => state.teachers)

  const {setTabActive } = useTabAdminStore();

  return (
    <>
      <div className="space-y-6 mb-3 bg-[#f0fdf4]">
        {/* Stats Grid */}
        <div className="flex gap-12">
          <Card className="w-150 h-auto">
            <CardContent className="p-6">
              <div className="flex space-x-40 justify-between">
                <div className="space-y-2">
                  <h1 className="text-2xl text-gray-500">Số lượng giáo viên</h1>
                  <h1 className="text-black text-4xl font-bold">
                    {teachers?.length || 0}
                  </h1>
                </div>  
                <button onClick={() => setTabActive("teachermanagement")}>
                  <div className=" bg-blue-500 w-24 h-24 rounded-lg flex items-center justify-center">
                    <Users className=" w-12 h-12 text-white" />
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>
          <Card className="w-150 h-auto">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-2xl text-gray-500">Số lượng học sinh</p>
                  <h1 className="text-black font-bold text-4xl">
                    {students?.length || 0}
                  </h1>
                </div>
                <button onClick={() => setTabActive("studentmanagement")}>
                  <div className=" bg-red-500 w-24 h-24 rounded-lg flex items-center justify-center">
                    <Baby className=" w-12 h-12 text-white" />
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="space-y-6 mb-3">
        {/* Stats Grid */}
        <div className="flex gap-12">
          <Card className="w-150 h-auto">
            <CardContent className="p-6">
              <div className="flex space-x-40 justify-between">
                <div className="space-y-2">
                  <p className="text-2xl text-gray-500">
                    Số lượng giáo viên đã đến
                  </p>
                  <p className="text-black text-4xl font-bold">
                    {teachers?.filter(teacher => teacher.timekeeping !== null).length}
                  </p>
                </div>
                <div className=" bg-blue-500 w-24 h-24 rounded-lg flex items-center justify-center">
                  <Users className=" w-12 h-12 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="w-150 h-auto">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-2xl text-gray-500">
                    Số lượng học sinh đã đến
                  </p>
                  <p className="text-black font-bold text-4xl">
                    {students?.filter(student => student.check_in_time !== null).length}
                  </p>
                </div>
                <div className=" bg-red-500 w-24 h-24 rounded-lg flex items-center justify-center">
                  <Baby className=" w-12 h-12 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
