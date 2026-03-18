import type { Class } from "./Class"
import type { Teacher } from "./Teacher"

export interface Student {
    studentid: string, 
    gender: string, 
    height: number,
    weight: number,
    parentname: string, 
    avatarurl: string |'https://i.pinimg.com/736x/e9/e0/7d/e9e07de22e3ef161bf92d1bcf241e4d0.jpg', 
    name: string,
    parentid:string,
    date: Date|null, 
    check_in_time: string|null,
    check_out_time: string|null,
    dob: Date,
    age : number,
    attendanceid: string,
    heightChange: number,
    weightChange:number
}

export interface studentState {
    classes : Class[] | null
    teachers : Teacher[] | null
    loading : boolean
    refreshClasses : (studentid : string) => void
    clearState : () => void
    refreshTeachers :(classes : Class[]) => void
}