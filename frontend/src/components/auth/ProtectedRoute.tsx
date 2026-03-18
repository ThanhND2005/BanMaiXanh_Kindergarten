import { getRedirectPath } from "@/lib/navigation";
import { useAdminStore } from "@/stores/useAdminStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { useParentStore } from "@/stores/useParentStore";
import { useTeacherStore } from "@/stores/useTeacherStore";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
interface Props {
  allowedRole: string;
}
const ProtectedRoute = ({ allowedRole }: Props) => {
  const { accessToken, user, loading, refresh, getMe } = useAuthStore();
  const {
    refreshSecurity,
    refreshStudents,
    refreshTeachers,
    refreshClasses,
    refreshNotifications,
    refreshMenu,
    refreshStudentBills,
    refreshTeacherBills,
    refreshAdmin
  } = useAdminStore();
  const { refreshMenu: func1Teacher, refreshNotifications: func2Teacher, refreshSalaryBills: func3Teacher, refreshStudents: func4Teacher, refreshTeacher: func5Teacher} =useTeacherStore();
  const { refreshNotification: func1Parent, refreshParent: func2Parent, refreshStudent:func3Parent, refreshTuitionBill:func4Parent} = useParentStore();
  const [starting, setStarting] = useState(true);
  const init = async () => {
    if (!accessToken) {
      await refresh();
      await getMe();
    }
    if (accessToken && !user) {
      await getMe();
    }
    const currentUser = useAuthStore.getState().user;
    if (currentUser?.role === "admin") {
      await refreshClasses()
      await refreshStudents()
      await refreshSecurity()
      await refreshTeacherBills()
      await refreshTeachers()
      await refreshNotifications()
      await refreshMenu()
      await refreshStudentBills()
      await refreshAdmin(currentUser.userid as string)
      
    }
    else if (currentUser?.role === "teacher") {
      await func1Teacher()
      await func2Teacher(currentUser.userid as string)
      await func3Teacher(currentUser.userid as string)
      await func4Teacher(currentUser.userid as string)
      await func5Teacher(currentUser.userid as string)

    }
    else if (currentUser?.role === "parent") {
      await func1Parent(currentUser.userid as string)
      await func2Parent(currentUser.userid as string)
      await func3Parent(currentUser.userid as string)
      await func4Parent(currentUser.userid as string)
      await refreshClasses()
      await func1Teacher()
    }
    setStarting(false);
  };
  useEffect(() => {
    init();
  }, []);
  if (loading || starting) {
    return (
      <div className="flex h-screen items-center justify-center">

      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
      </div>
      </div>
    );
  }
  if (!accessToken) {
    return <Navigate to="/signin" replace />;
  }

  if (accessToken && allowedRole !== user?.role) {
    const correctPath = getRedirectPath(user?.role as string);
    return <Navigate to={correctPath} replace />;
  }
  return <Outlet />;
};
export default ProtectedRoute;
