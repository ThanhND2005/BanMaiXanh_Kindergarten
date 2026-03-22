import { useAdminStore } from "@/stores/useAdminStore";
import TeacherCard from "./TeacherCard";

const TeacherManagement = () => {
  const teachers = useAdminStore((state) => state.teachers)?.filter((t) => t.status !== null);
  
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl mb-4 mali-bold text-[#006F44]">
          Các giáo viên trong hệ thống:
        </h1>
        
      </div>
      <ul className="grid grid-cols-4 gap-8">
        {teachers?.map((teacher) => (
          <TeacherCard key={teacher.userid} teacher={teacher} />
        ))}
      </ul>
    </>
  );
};

export default TeacherManagement;
