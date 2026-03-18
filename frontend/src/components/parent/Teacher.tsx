import React from "react";

import StudentCard2 from "./StudentCard2";
import { useParentStore } from "@/stores/useParentStore";

const Teacher = () => {
  const students = useParentStore((state) => state.students)
  
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
