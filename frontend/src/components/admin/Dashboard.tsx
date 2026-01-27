import React from "react";
import { Card, CardContent } from "../ui/card";
import { Users, Baby } from "lucide-react";
import { Navigate } from "react-router-dom";
import { useTabAdminStore } from "@/stores/useTabStore";
export function Dashboard() {
  const student = [
    {
      studentid: "02222",
      name: "Bảo Hân",
    },
    {
      studentid: "02222",
      name: "Bảo Hân",
    },
    {
      studentid: "02222",
      name: "Bảo Hân",
    },
    {
      studentid: "02222",
      name: "Bảo Hân",
    },
    {
      studentid: "02222",
      name: "Bảo Hân",
    },
  ];
  const teacher = [
    {
      teacherid: "002",
      name: "Danh thanh",
    },
    {
      teacherid: "002",
      name: "Danh thanh",
    },
    {
      teacherid: "002",
      name: "Danh thanh",
    },
    {
      teacherid: "002",
      name: "Danh thanh",
    },
    {
      teacherid: "002",
      name: "Danh thanh",
    },
  ];
  const Student_attedance = 2;
  const Techer_attendance = 2;
  const { tabActive, setTabActive } = useTabAdminStore();

  return (
    <>
      <div className="space-y-6 mb-3">
        {/* Stats Grid */}
        <div className="flex gap-12">
          <Card className="w-150 h-auto">
            <CardContent className="p-6">
              <div className="flex space-x-40 justify-between">
                <div className="space-y-2">
                  <p className="text-2xl text-gray-500">Số lượng giáo viên</p>
                  <p className="text-black text-4xl font-bold">
                    {teacher.length}
                  </p>
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
                  <p className="text-black font-bold text-4xl">
                    {student.length}
                  </p>
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
                    {Techer_attendance}
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
                    {Student_attedance}
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
