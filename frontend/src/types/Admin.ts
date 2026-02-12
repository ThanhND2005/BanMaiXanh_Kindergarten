
import type { Class } from "./Class"
import type { Menu, StudentBill, TeacherBill } from "./store"
import type { Student } from "./Student"
import type { Teacher } from "./Teacher"

export interface Notification {
    notificationid: string, 
    receiveid: string, 
    title: string, 
    content: string, 
    createdat: Date
}
export interface adminState {
    loading : boolean,
    teachers : Teacher[] | null
    notifications: Notification[] | null
    classes : Class[] | null
    menuday : Menu[] | null
    students : Student[] | null
    studentbills: StudentBill[] | null
    teacherbills: TeacherBill[] | null
    clearState: () => void
    refreshTeachers : () => void
    refreshNotifications: () => void 
    refreshClasses : () => void
    refreshMenu : () => void
    refreshStudents : () => void
    refreshStudentBills: () => void
    refreshTeacherBills: () => void
}