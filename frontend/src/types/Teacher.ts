import type { Menu, Notification, TeacherBill } from "./store"
import type { Student } from "./Student"

export interface Teacher {
    userid: string,
    name : string, 
    dob : Date,
    gender: string, 
    address: string,
    classname: string | null, 
    classid : string,
    createdat : Date,
    avatarurl: string | 'https://i.pinimg.com/736x/e9/e0/7d/e9e07de22e3ef161bf92d1bcf241e4d0.jpg',
    timekeeping: Date | null,
}
export interface teacherState {
    teacher : Teacher | null
    students : Student[] | null
    notifications: Notification[] |  null
    menuday: Menu[] | null
    salarybills: TeacherBill[] | null
    loading : boolean
    clearState : () => void
    refreshTeacher: (userid : string) => void
    refreshStudents : (teacherid: string) => void
    refreshMenu : ()  => void
    refreshSalaryBills : (teacherid: string) => void
    refreshNotifications: (teacherid: string) => void
}
