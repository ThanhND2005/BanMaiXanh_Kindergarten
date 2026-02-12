import React from "react";
import { Button } from "../ui/button";
import { useAdminStore } from "@/stores/useAdminStore";
import StudentCard from "./StudentCard";

export function StudentManagement() {
  const students= useAdminStore((state)=>state.students)
  
  return (
    <>
      <h1 className="text-2xl font-bold text-[#006F44] itim-regular mb-8">
        Các học sinh trong hệ thống:
      </h1>
      <ul className="grid grid-cols-3 gap-6">
        {students?.map((student) => (
          <StudentCard key={student.studentid} student={student}/>
        ))}
      </ul>
    </>
  );
}
