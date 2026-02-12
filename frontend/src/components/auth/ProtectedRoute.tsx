import { getRedirectPath } from "@/lib/navigation";
import { useAdminStore } from "@/stores/useAdminStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
interface Props {
  allowedRole: string;
}
const ProtectedRoute = ({ allowedRole }: Props) => {
  const { accessToken, user, loading, refresh, getMe } = useAuthStore();
  const { refreshStudents,refreshTeachers,refreshClasses,refreshNotifications,refreshMenu,refreshStudentBills,refreshTeacherBills} =useAdminStore()
  const [starting, setStarting] = useState(true)
  const init = async () =>{
    if(!accessToken)
    {
        await refresh()
        await getMe()
        await refreshStudents()
        await refreshTeachers()
        await refreshClasses()
        await refreshNotifications()
        await refreshMenu()
        await refreshStudentBills()
        await refreshTeacherBills() 
    }
    if(accessToken && !user)
    {
        await getMe()
    }
    setStarting(false)
  }
  useEffect(()=>{
      init()
  },[])
  if(loading || starting){
    return (
        <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    )
  }
  if(!accessToken)
  {
    return <Navigate to='/signin' replace/>
  }
  if(accessToken && allowedRole !== user?.role){
    const correctPath = getRedirectPath(user?.role as string)
    return <Navigate to={correctPath} replace/>
  }
  return <Outlet/>
};
export default ProtectedRoute