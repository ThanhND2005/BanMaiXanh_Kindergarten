export interface Student {
    studentid: string, 
    gender: string, 
    height: number,
    weight: number,
    parentname: string, 
    avatarurl: string, 
    name: string,
    parentid:string,
    date: Date|null, 
    check_in_time: string|null,
    check_out_time: string|null,
    dob: Date,
    age : number
}
interface Class {
    classid : string ,
    name : string,
}
export interface studentState {
    classes : Class[] | null
    loading : boolean
    refreshClasses : (studentid : string) => void
    clearState : () => void
}