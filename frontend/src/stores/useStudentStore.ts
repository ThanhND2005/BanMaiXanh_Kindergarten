import { studentService } from '@/services/studentService'
import type { Class } from '@/types/Class'
import type { studentState } from '@/types/Student'
import {create} from 'zustand'

export const useStudentStore = create<studentState>((set,get) => ({
    classes : null,
    teachers : null,
    loading: false,
    clearState : () =>{
        set({classes :null,loading:false})
    },
    refreshClasses : async (studentid) =>{
        try {
            set({loading : true})
            const classes  = await studentService.getClass(studentid)
            set({classes})
        } catch (error) {
            console.error(error)
            get().clearState()
        }
        finally
        {
            set({loading:false})
        }
    },
    refreshTeachers : async (classes : Class[]) =>{
        try {
            set({loading :false})
            const teachers = await studentService.getTeacher(classes)
            set({teachers})
        } catch (error) {
            console.error(error)
            get().clearState()
        }
        finally{
            set({loading: false})
        }
    }
}))
