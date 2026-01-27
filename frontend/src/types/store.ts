import type { Student,StudentAttendance } from "./Student"
export  interface tabAdminState {
    tabActive : string|null,
    setTabActive : (tab: string) => void
}
export interface studentsState{
    students : Student[] | null,

}