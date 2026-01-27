export interface Student {
    studentid: string, 
    dob: Date,
    gender: string, 
    height: number,
    weight: number,
    age: number|null,
    parentid: string, 
    avatarurl: string, 
    name: string,
    classname: string|null
}
export interface StudentAttendance {
    studentid: string, 
    dob: Date,
    gender: string, 
    height: number,
    weight: number,
    age: number|null,
    parentid: string, 
    avatarurl: string, 
    name: string,
    classname: string|null 
    date: Date|null, 
    check_in_time: string|null,
    check_out_time: string|null
}