
import type { Class } from "./Class"
import type { Menu, StudentBill, TeacherBill } from "./store"
import type { Student } from "./Student"
import type { Teacher } from "./Teacher"

export interface Admin {
    userid: string, 
    name: string, 
    email: string
}
export interface Notification {
    notificationid: string, 
    receiver: string, 
    title: string, 
    content: string, 
    createdat: Date
}
export interface adminState {
    admin: Admin
    teachers : Teacher[]
    notifications: Notification[]
    classes : Class[]
    menuday : Menu[]
    students : Student[]
    studentbills: StudentBill[]
    teacherbills: TeacherBill[]
    setAdmin : (admin : Admin) => void
    refreshTeachers : (teachers : Teacher[]) => void
    refreshNotifications: (notifications : Notification[]) => void 
    refreshClasses : (classes : Class[]) => void
    refreshMenu : (menuday : Menu[]) => void
    refreshStudents : (students : Student[]) => void
    refreshStudentBills: (studentbills: StudentBill[]) => void
    refreshTeacherBills: (teacherbills : TeacherBill[]) => void
}