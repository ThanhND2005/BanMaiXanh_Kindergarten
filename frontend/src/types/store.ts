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
export interface Teacher {
    userid : string, 
    name :string, 
    dob: Date,
    gender: string, 
    address: string, 
    avatarurl: string | null,
    classid: string
}
export interface teacherState {
    teacher : Teacher
}