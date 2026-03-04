import {create} from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { type tabTeacherState, type tabAdminState,type tabParentState } from '@/types/store'
export const useTabAdminStore = create<tabAdminState>()(
    persist(
    (set, get) => ({
      tabActive: 'dashboard', 
      setTabActive: (tab) => set({ tabActive: tab }),
    }),
    {
      name: 'tab-admin-storage', 
    }
  )
)
export const useTabTeacherStore = create<tabTeacherState>()(
    persist(
    (set,get) =>({
    tabActive: 'dashboard',
    setTabActive : (tab) =>{
        set({tabActive : tab})
    }
}),{
    name:'tab-teacher-storage'
}))
export const useTabParentStore = create<tabParentState>()(
    persist(

        (set) =>({
        tabActive: 'dashboard',
        student : null,
        setStudent : (student) => {
            set({student})
        },
        setTabActive :(tab) =>{
            set({tabActive : tab})
        }}),
        {
            name:'tab-student-storage'
        }
 ))
    