import type { Teacher } from "./Teacher"

export interface Parent{
    userid: string, 
    name:string,
    dob: Date,
    gender: string,
    address: string,
    avatarurl: string,
}

export interface parentState {
    parent : Parent
    teachers : Teacher[]
    setParent : (parent: Parent) => void
    refreshTeacher : (teachers : Teacher[]) => void
}