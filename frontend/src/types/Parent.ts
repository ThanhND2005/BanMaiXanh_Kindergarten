import { express } from 'express';
import type { Notification, StudentBill } from "./store"
import type { Student } from './Student';
export interface Parent {
    userid: string,
    dob : Date,
    gender: string, 
    address: string,
    name: string, 
    avatarurl: string,
    createdat: Date,
}
export interface parentState {
    parent: Parent | null
    notifications : Notification[] | null
    loading: boolean
    students: Student[] | null 
    tuitionbills: StudentBill[] | null
    clearState: () => void
    refreshNotification: (parentid : string) => void
    refreshParent : (userid : string) => void
    refreshStudent : (parentid: string) => void
    refreshTuitionBill: (parentid: string) => void
}