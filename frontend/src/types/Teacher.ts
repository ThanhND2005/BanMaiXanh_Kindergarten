import type { Notification } from "./store"
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
    students : Student[] | null
    notifications: Notification[] |  null
    loading: boolean
    clearState : () => void
    refreshStudents : (teacherid: string) => void
    refreshNotifications: (teacherid: string) => void
}
