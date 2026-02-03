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
    parentName: string, 
    studentName: string, 
    dob: Date,
    gender: string,
    className: string, 
    attendance: number,
    tuition: number,
    status: string,
    avatarUrl: string | 'https://i.pinimg.com/1200x/24/9f/ae/249fae081d976169452038569b8de507.jpg',
    billUrl: string | null
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
    avatarUrl: string | 'https://i.pinimg.com/736x/e9/e0/7d/e9e07de22e3ef161bf92d1bcf241e4d0.jpg',
}
export interface Notification {
    notificationid:string, 
    senderName:string, 
    title: string,
    content: string, 
    createdat: Date,
}