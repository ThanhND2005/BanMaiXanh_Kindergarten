import {create} from 'zustand'
import { type tabTeacherState, type tabAdminState,type tabParentState } from '@/types/store'
export const useTabAdminStore = create<tabAdminState>((set) =>({
    tabActive: 'dashboard',
    setTabActive : (tab) =>{
        set({tabActive : tab})
    }
}))
export const useTabTeacherStore = create<tabTeacherState>((set) =>({
    tabActive: 'dashboard',
    setTabActive : (tab) =>{
        set({tabActive : tab})
    }
}))
export const useTabParentStore = create<tabParentState>((set) =>({
    tabActive: 'dashboard',
    setTabActive :(tab) =>{
        set({tabActive : tab})
    }
}))