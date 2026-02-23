import React from "react";

import { useAdminStore } from "@/stores/useAdminStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { Check } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useTabParentStore } from "@/stores/useTabStore";
import type { Student } from "@/types/Student";
import { useStudentStore } from "@/stores/useStudentStore";
import StudentCard2 from "./StudentCard2";

const Teacher = () => {
  const parent = useAuthStore((state) => state.user);
  const students = useAdminStore((state) => state?.students)?.filter(
    (student) => student.parentid === parent?.userid,
  );
  
  return (
    <div>
      <ul className="space-y-4 p-4">
        {students?.map((student) => (
          <StudentCard2 key={student.studentid} student={student}/>
        ))}
      </ul>
    </div>
  );
};

export default Teacher;
