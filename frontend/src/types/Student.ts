export interface Student {
    studentid: string, 
    gender: string, 
    height: number,
    weight: number,
    parentname: string, 
    avatarurl: string, 
    name: string,
    parentid:string,
    classid: string,
    classname: string,
    date: Date|null, 
    check_in_time: string|null,
    check_out_time: string|null,
    dob: Date,
    age : number
}
