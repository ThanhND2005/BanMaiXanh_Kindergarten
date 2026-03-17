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
  } = useAdminStore();
  const { refreshNotifications: rnt, refreshStudents: rstu } =
    useTeacherStore();
  const { refreshNotification: refreshNotificationParent } = useParentStore();
  const [starting, setStarting] = useState(true);
  const init = async () => {
    if (!accessToken) {
      await refresh();
      await getMe();
      await refreshStudents();
      await refreshTeachers();
      await refreshClasses();
      await refreshNotifications();
      await refreshMenu();
      await refreshStudentBills();
      await refreshTeacherBills();
      await refreshSecurity();
    }
    const currentUser = useAuthStore.getState().user;
    if (currentUser?.role === "admin") {
    }
    if (currentUser?.role === "teacher") {
      await rstu(currentUser.userid);
      await rnt(currentUser.userid);
    }
    if (currentUser?.role === "parent") {
      await refreshNotificationParent(currentUser.userid);
    }
    if (accessToken && !user) {
      await getMe();
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
