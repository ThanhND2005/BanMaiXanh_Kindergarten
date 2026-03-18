
import type { Class } from "./Class"
import type { Menu, StudentBill, TeacherBill } from "./store"
import type { Student } from "./Student"
import type { Teacher } from "./Teacher"

export interface Notification {
    notificationid: string, 
    receiveid: string, 
    title: string, 
    content: string, 
    createdat: Date,
    sendername: string,
}
export interface Security{
    code: string, 
    date: Date,
    teacherid: string,
}
interface Admin{
    userid: string, 
    name: string,
    address: string, 
    dob: Date,
    gender: string, 
    avatarurl: string, 
}
export interface adminState {
    admin: Admin | null
    loading : boolean
    security : Security[] | null
    teachers : Teacher[] | null
    notifications: Notification[] | null
    classes : Class[] | null
    menuday : Menu[] | null
    students : Student[] | null
    studentbills: StudentBill[] | null
    teacherbills: TeacherBill[] | null
    setLoading: (loading: boolean) => void
    clearState: () => void
    refreshTeachers : () => void
    refreshNotifications: () => void 
    refreshClasses : () => void
    refreshMenu : () => void
    refreshStudents : () => void
    refreshStudentBills: () => void
    refreshTeacherBills: () => void
    refreshSecurity: ()=> void
    refreshAdmin: (userid : string)=> void 
}