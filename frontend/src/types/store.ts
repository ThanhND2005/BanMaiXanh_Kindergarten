import type { Student } from "./Student"

export  interface tabAdminState {
    tabActive : string|null,
    setTabActive : (tab: string) => void
}
export interface tabTeacherState {
    tabActive: string |null,
    setTabActive: (tab: string) => void
}
export interface tabParentState {
    tabActive: string|null,
    student : Student | null,
    setStudent : (student : Student) => void
    setTabActive : (tab : string) => void
}
export interface Menu {
    day: number, 
    dish1: string, 
    dish2: string, 
    dish3: string ,
    dish4: string,
}
export interface StudentBill {
    tuitionid: string, 
    month: number,
    parentid: string,
    parentName: string, 
    studentName: string, 
    dob: Date,
    gender: string,
    attendance: number,
    tuition: number,
    status: string,
    year: number,
    classes: string,
    avatarurl: string | 'https://i.pinimg.com/1200x/24/9f/ae/249fae081d976169452038569b8de507.jpg',
    billurl: string | null,
    qrurl: string
}
export interface TeacherBill {
    salaryid : string,
    teacherid: string,
    month: number,
    teacherName: string, 
    dob : Date,
    gender: string, 
    address: string ,
    className: string, 
    timekeeping: number,
    allowance: number,
    salary : number,
    amount: number,
    status: string, 
    qrurl: string,
    avatarurl: string | 'https://i.pinimg.com/736x/e9/e0/7d/e9e07de22e3ef161bf92d1bcf241e4d0.jpg',
}
export interface Notification {
    notificationid:string, 
    senderid:string, 
    sendername: string,
    title: string,
    content: string, 
    createdat: Date,
}
export interface User {
    userid : string, 
    name : string, 
    gender: string,
    avatarurl : string | 'https://i.pinimg.com/736x/e9/e0/7d/e9e07de22e3ef161bf92d1bcf241e4d0.jpg',
    role : 'admin' | 'teacher' | 'parent',
    address : string, 
    dob: Date,
    createdat : Date
}
export interface authState {
    accessToken : string|null,
    user : User | null,
    loading : boolean,
    setLoading : (loading : boolean) => void
    setAccessToken : (accessToken : string) => void
    clearState : () => void
    signup :(name : string, address : string, dob: Date,gender: string,username: string,password:string,role: string) => Promise<void>
    signin :(username : string, password : string) => Promise<void>
    signinAdmin :(username : string, password : string) => Promise<void>
    signinTeacher: (username: string, password: string) => Promise<void>
    signout :() => Promise<void>
    getMe: () => Promise<void>
    refresh: () => Promise<void>
    
}