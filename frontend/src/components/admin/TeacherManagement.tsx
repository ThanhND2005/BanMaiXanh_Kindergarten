
import { useAdminStore } from "@/stores/useAdminStore";
import TeacherCard from "./TeacherCard";

const TeacherManagement = () => {
  
  const teachers = useAdminStore((state) => state.teachers)
  
  return (
    <>
      <h1 className="text-4xl itim-regular mb-4">
        Các giáo viên trong hệ thống:
      </h1>
      <ul className="grid grid-cols-4 gap-8">
        {teachers.map((teacher) => (
          <TeacherCard key={teacher.userid} teacher={teacher}/>
        ))}
      </ul>
    </>
  );
};

export default TeacherManagement;
